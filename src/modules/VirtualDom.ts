import { ElementAttributes, ElementNode, NodeTypes, TemplatePropsContext, TextElementNode } from "../types/index.js";
import * as Helpers from "../utils/templateHelpers.js";

export default class VirtualDom {
  template: string;
  current: ElementNode | null;
  tree: ElementNode | TextElementNode;

  constructor() {
    this.current = null;
  }

  createTree(
    template: string,
    props?: any // todo: TemplatePropsContext
  ): ElementNode | TextElementNode {
    const templates = this._parseTemplate(template);
    templates.map(res => this._createTree(res, props));

    return this.tree;
  }

  private _parseTemplate(htmlString: string): string[] {
    return (htmlString.replace(/(\r\n|\n|\r)/gm, "").match(/(<.*?>)|([^<]+)/gi) as string[])
      .map(res => res.trim())
      .filter(res => res !== "");
  }

  private _createTree(element: string, props?: TemplatePropsContext): ElementNode | TextElementNode {
    // TODO: #IF
    // TODO: #EACH

    if (Helpers.isOpenTag(element) || Helpers.isSelfClosedTag(element)) {
      const node: ElementNode = {
        type: NodeTypes.TAG,
        parent: this.current,
        name: Helpers.getTag(element),
        attributes: undefined,
        children: []
      };

      this.createAttrs(node, element, props);

      if (this.current && this.current.children) {
        this.current.children.push(node);
      } else {
        this.tree = node;
      }

      if (!Helpers.isSelfClosedTag(element)) {
        this.current = node;
      }
    } else if (Helpers.isCloseTag(element)) {
      this.current = this.current && this.current.parent ? this.current.parent : null;
    } else if (Helpers.isProp(element)) {
      const nodeList = this.createNodeList(element, props);

      if (this.current && this.current.children) {
        nodeList.forEach(node => (this.current as ElementNode).children.push(node));
      } else {
        this.tree = this.createNode();
        nodeList.forEach(node => (this.tree as ElementNode).children.push(node));
      }
    } else if (Helpers.isTextNode(element)) {
      const node = this.createTextNode(element, this.current);

      if (this.current && this.current.children) {
        this.current.children.push(node);
      } else {
        this.tree = node;
      }
    }

    // todo?: обрабатывать события без объявления свойства в шаблоне

    return this.tree;
  }

  private createNodeList(element: string, props?: TemplatePropsContext): (ElementNode | TextElementNode)[] {
    const nodeList: (ElementNode | TextElementNode)[] = [];
    const multiple: string[] = Helpers.parseProps(element);

    multiple.forEach(prop => {
      const key = Helpers.clearProp(prop);

      if (props && props[key]) {
        if (!Helpers.isTextNode(props[key])) {
          const element = props[key] as ElementNode | ElementNode[];

          if (Array.isArray(element)) {
            element.forEach(el => {
              el.parent = this.current;
              nodeList.push(el);
            });
          } else {
            element.parent = this.current;
            nodeList.push(element);
          }
        } else {
          nodeList.push(this.createTextNode(props[key] as string, this.current));
        }
      } else {
        nodeList.push(this.createTextNode(Helpers.isProp(prop) ? "" : (prop as string), this.current));
      }
    });

    return nodeList;
  }

  private createAttrs(node, element, props) {
    const attrs = Helpers.getAttributes(element);

    if (attrs) {
      // todo: описать дженерик для ts
      let entriesAttrs: any[] = [];

      for (const key in attrs) {
        const value: string | undefined = attrs[key];

        if (value && Helpers.isProp(value)) {
          const parseAttrs = Helpers.parseProps(value);

          const attrProps = parseAttrs.filter(name => Helpers.isProp(name));

          const events = attrProps
            .map(name => Helpers.clearProp(name))
            .filter(name => Helpers.isEventProp(name))
            .map(name => (props as TemplatePropsContext)[name])
            .filter(Boolean);

          const properties = parseAttrs
            .filter(name => !Helpers.isEventProp(Helpers.clearProp(name)))
            .map(name => {
              const propName = Helpers.clearProp(name);
              const prop = (props as TemplatePropsContext)[propName];

              return prop ? prop : !Helpers.isProp(name) ? name : undefined;
            })
            .filter(Boolean);

          if (events && events.length) {
            // todo: 1 события хватит?
            entriesAttrs.push([key, events[0]]);
          }

          if (properties && properties.length) {
            // todo: join через пробел
            // сделал для className, возможно стоит учесть другие варианты
            entriesAttrs.push([key, properties.join("")]);
          }
        } else {
          entriesAttrs.push([key, value]);
        }
      }

      node.attributes = Object.fromEntries(entriesAttrs);
    }
  }

  private createTextNode(text: string, parent: ElementNode | null): TextElementNode {
    return {
      type: NodeTypes.TEXT,
      parent: parent,
      content: text
    };
  }

  private createNode(
    name: string = "div",
    parent: ElementNode | null = null,
    attributes?: ElementAttributes
  ): ElementNode {
    return {
      type: NodeTypes.TAG,
      parent,
      name,
      attributes,
      children: []
    };
  }
}
