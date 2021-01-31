import { NodeTypes } from "../types/index.js";
import * as Helpers from "../utils/templateHelpers.js";
export default class VirtualDom {
    constructor() {
        this.current = null;
    }
    createTree(template, props // todo: TemplatePropsContext
    ) {
        const templates = this._parseTemplate(template);
        templates.map(res => this._createTree(res, props));
        return this.tree;
    }
    _parseTemplate(htmlString) {
        return htmlString.replace(/(\r\n|\n|\r)/gm, "").match(/(<.*?>)|([^<]+)/gi)
            .map(res => res.trim())
            .filter(res => res !== "");
    }
    _createTree(element, props) {
        // TODO: #IF
        // TODO: #EACH
        if (Helpers.isOpenTag(element) || Helpers.isSelfClosedTag(element)) {
            const node = {
                type: NodeTypes.TAG,
                parent: this.current,
                name: Helpers.getTag(element),
                attributes: undefined,
                children: []
            };
            this.createAttrs(node, element, props);
            if (this.current && this.current.children) {
                this.current.children.push(node);
            }
            else {
                this.tree = node;
            }
            if (!Helpers.isSelfClosedTag(element)) {
                this.current = node;
            }
        }
        else if (Helpers.isCloseTag(element)) {
            this.current = this.current && this.current.parent ? this.current.parent : null;
        }
        else if (Helpers.isProp(element)) {
            const nodeList = this.createNodeList(element, props);
            if (this.current && this.current.children) {
                nodeList.forEach(node => this.current.children.push(node));
            }
            else {
                this.tree = this.createNode();
                nodeList.forEach(node => this.tree.children.push(node));
            }
        }
        else if (Helpers.isTextNode(element)) {
            const node = this.createTextNode(element, this.current);
            if (this.current && this.current.children) {
                this.current.children.push(node);
            }
            else {
                this.tree = node;
            }
        }
        // todo?: обрабатывать события без объявления свойства в шаблоне
        return this.tree;
    }
    createNodeList(element, props) {
        const nodeList = [];
        const multiple = Helpers.parseProps(element);
        multiple.forEach(prop => {
            const key = Helpers.clearProp(prop);
            if (props && props[key]) {
                if (!Helpers.isTextNode(props[key])) {
                    const element = props[key];
                    if (Array.isArray(element)) {
                        element.forEach(el => {
                            el.parent = this.current;
                            nodeList.push(el);
                        });
                    }
                    else {
                        element.parent = this.current;
                        nodeList.push(element);
                    }
                }
                else {
                    nodeList.push(this.createTextNode(props[key], this.current));
                }
            }
            else {
                nodeList.push(this.createTextNode(Helpers.isProp(prop) ? "" : prop, this.current));
            }
        });
        return nodeList;
    }
    createAttrs(node, element, props) {
        const attrs = Helpers.getAttributes(element);
        if (attrs) {
            // todo: описать дженерик для ts
            let entriesAttrs = [];
            for (const key in attrs) {
                const value = attrs[key];
                if (value && Helpers.isProp(value)) {
                    const parseAttrs = Helpers.parseProps(value);
                    const attrProps = parseAttrs.filter(name => Helpers.isProp(name));
                    const events = attrProps
                        .map(name => Helpers.clearProp(name))
                        .filter(name => Helpers.isEventProp(name))
                        .map(name => props[name])
                        .filter(Boolean);
                    const properties = parseAttrs
                        .filter(name => !Helpers.isEventProp(Helpers.clearProp(name)))
                        .map(name => {
                        const propName = Helpers.clearProp(name);
                        const prop = props[propName];
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
                }
                else {
                    entriesAttrs.push([key, value]);
                }
            }
            node.attributes = Object.fromEntries(entriesAttrs);
        }
    }
    createTextNode(text, parent) {
        return {
            type: NodeTypes.TEXT,
            parent: parent,
            content: text
        };
    }
    createNode(name = "div", parent = null, attributes) {
        return {
            type: NodeTypes.TAG,
            parent,
            name,
            attributes,
            children: []
        };
    }
}
//# sourceMappingURL=VirtualDom.js.map