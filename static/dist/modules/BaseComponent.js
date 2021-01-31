import EventBus from "./EventBus.js";
export default class BaseComponent {
    constructor(props) {
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        this.registerEvents = (eventBus) => {
            eventBus.subscribe("init" /* INIT */, this.init.bind(this));
            eventBus.subscribe("flow:component-did-mount" /* FLOW_CDM */, this._componentDidMount.bind(this));
            eventBus.subscribe("flow:component-did-update" /* FLOW_CDU */, this._componentDidUpdate.bind(this));
            eventBus.subscribe("flow:render" /* FLOW_RENDER */, this._render.bind(this));
            eventBus.subscribe("flow:component-will-unmount" /* FLOW_CWU */, this._componentWillUnmount.bind(this));
        };
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;
        this.props = this.makePropsProxy(props);
        this.registerEvents(eventBus);
        eventBus.emit("init" /* INIT */);
    }
    get element() {
        return this._element;
    }
    getContent() {
        this.eventBus().emit("flow:component-did-mount" /* FLOW_CDM */);
        return this._element;
    }
    init() {
        this._render();
    }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount() { }
    _componentDidUpdate() {
        this.componentDidUpdate();
        this._rerender();
    }
    componentDidUpdate() { }
    makePropsProxy(props) {
        const eventBus = this.eventBus();
        const handler = {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                // Запускаем обновление компоненты
                eventBus.emit("flow:component-did-update" /* FLOW_CDU */);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        };
        return new Proxy(props, handler);
    }
    _render() {
        const component = this.render();
        this._element = component;
    }
    render() { }
    _rerender() {
        this.rerender();
    }
    rerender() { }
    forceUpdate() {
        this.eventBus().emit("flow:render" /* FLOW_RENDER */);
    }
    _componentWillUnmount() {
        this.componentWillUnmount();
    }
    componentWillUnmount() { }
}
//# sourceMappingURL=BaseComponent.js.map