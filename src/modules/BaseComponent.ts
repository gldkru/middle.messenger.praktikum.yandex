import EventBus from './EventBus';

const enum ComponentEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_CWU = 'flow:component-will-unmount',
  FLOW_RENDER = 'flow:render',
}

export default abstract class BaseComponent<TProps extends object> {
  protected readonly props?: TProps;

  private readonly eventBus: () => EventBus;

  private _element: any;

  constructor(props: TProps) {
    const eventBus = new EventBus();

    this.eventBus = () => eventBus;

    this.props = this.makePropsProxy(props);
    this.registerEvents(eventBus);

    eventBus.emit(ComponentEvents.INIT);
  }

  get element() {
    return this._element;
  }

  getContent() {
    this.eventBus().emit(ComponentEvents.FLOW_CDM);

    return this._element;
  }

  setProps = (nextProps: Partial<TProps>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private registerEvents = (eventBus: EventBus): void => {
    eventBus.subscribe(ComponentEvents.INIT, this.init.bind(this));
    eventBus.subscribe(ComponentEvents.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.subscribe(ComponentEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.subscribe(ComponentEvents.FLOW_RENDER, this._render.bind(this));
    eventBus.subscribe(ComponentEvents.FLOW_CWU, this._componentWillUnmount.bind(this));
  };

  private init() {
    this._render();
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  private _componentDidUpdate() {
    this.componentDidUpdate();

    this._rerender();
  }

  componentDidUpdate() {}

  private makePropsProxy(props: TProps): TProps {
    const eventBus = this.eventBus();

    const handler = {
      get(target: TProps, prop: keyof TProps) {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: TProps, prop: keyof TProps, value: any) {
        target[prop] = value; // eslint-disable-line no-param-reassign

        // Запускаем обновление компоненты
        eventBus.emit(ComponentEvents.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    };

    return new Proxy(props, handler);
  }

  private _render() {
    const component = this.render();

    this._element = component;
  }

  render() {}

  private _rerender() {
    this.rerender();
  }

  rerender() {}

  forceUpdate() {
    this.eventBus().emit(ComponentEvents.FLOW_RENDER);
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
  }

  componentWillUnmount() {}
}
