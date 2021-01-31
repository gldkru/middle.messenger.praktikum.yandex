import { NodeTypes } from "../types/index.js";
import VirtualDom from "./VirtualDom.js";
import * as Helpers from "../utils/templateHelpers.js";
export default class Templator {
    constructor() {
        this.nodeCache = new WeakMap();
    }
    createElement(element) {
        if (element.type === NodeTypes.TEXT) {
            const text = element.content ? element.content : "";
            const dom = document.createTextNode(text);
            this.setCache(element, dom);
            return dom;
        }
        else {
            const tagName = element.name;
            const dom = !Helpers.isSvgTag(tagName)
                ? document.createElement(tagName ? tagName : "div")
                : document.createElementNS("http://www.w3.org/2000/svg", tagName);
            const children = element.children;
            if (children && children.length) {
                children.forEach(child => {
                    const childElement = this.createElement(child);
                    dom.appendChild(childElement);
                });
            }
            const attrs = element.attributes;
            if (attrs) {
                this.applyAttributes(dom, attrs);
            }
            this.setCache(element, dom);
            return dom;
        }
    }
    diff(oldTree, newTree) {
        let patches = [];
        this.runDiff(oldTree, newTree, patches);
        return patches;
    }
    patch(patches) {
        for (const patch of patches) {
            this.applyPatch(patch);
        }
    }
    applyAttributes(element, attrs) {
        for (const key in attrs) {
            const value = attrs[key];
            if (Helpers.isEventProp(key)) {
                const eventName = Helpers.extractEventName(key);
                this.addEventListener(element, eventName, value);
            }
            else if (value === undefined) {
                element.removeAttribute(key);
            }
            else {
                element.setAttribute(key, value);
            }
        }
    }
    diffChildren(oldParent, newParent, parentNode, patches) {
        // todo: if not children
        const oldChildren = oldParent.children;
        const newChildren = newParent.children;
        const length = Math.max(oldChildren.length, newChildren.length);
        for (let i = 0; i < length; i++) {
            const oldChild = oldChildren[i];
            const newChild = newChildren[i];
            // APPEND NEW
            if (oldChild === undefined) {
                patches.push({
                    type: 0 /* APPEND */,
                    node: newChild,
                    domNode: parentNode
                });
                // REMOVE OLD
            }
            else if (newChild === undefined) {
                patches.push({
                    type: 2 /* REMOVE */,
                    domNode: this.nodeCache.get(oldChild)
                });
                // DIFF THE REST
            }
            else {
                this.runDiff(oldChild, newChild, patches);
            }
        }
    }
    runDiff(oldNode, newNode, patches = []) {
        if ((!oldNode && !newNode) || oldNode === newNode)
            return;
        const domNode = this.replaceCache(oldNode, newNode);
        if (oldNode.type !== newNode.type) {
            // Different node types
            patches.push({
                type: 1 /* REPLACE */,
                node: newNode,
                domNode
            });
        }
        else {
            switch (oldNode.type) {
                case NodeTypes.TAG:
                    if (oldNode.name !== newNode.name) {
                        patches.push({
                            type: 1 /* REPLACE */,
                            node: newNode,
                            domNode
                        });
                    }
                    else {
                        const propsDiff = this.diffAttributes(oldNode.attributes, newNode.attributes);
                        // todo: && domNode - hotfix от потери родителя
                        // скорее всего верным паттерном будет следить за родительской нодой
                        // не успел переписать
                        if (propsDiff !== undefined && domNode) {
                            patches.push({
                                type: 3 /* PROPS */,
                                attributes: propsDiff,
                                domNode: domNode
                            });
                        }
                        this.diffChildren(oldNode, newNode, domNode, patches);
                    }
                    break;
                case NodeTypes.TEXT:
                    if (oldNode.content !== newNode.content) {
                        patches.push({
                            type: 4 /* TEXT */,
                            value: newNode.content || "",
                            domNode: domNode
                        });
                    }
                    break;
            }
        }
    }
    diffAttributes(oldAttrs, newAttrs) {
        if (oldAttrs === undefined || newAttrs === undefined)
            return;
        let diff = Helpers.diff(newAttrs, oldAttrs);
        return diff;
    }
    applyPatch(patch) {
        switch (patch.type) {
            case 4 /* TEXT */:
                patch.domNode.textContent = patch.value;
                break;
            case 3 /* PROPS */:
                this.applyAttributes(patch.domNode, patch.attributes);
                break;
            case 2 /* REMOVE */:
                const parentNode = patch.domNode.parentNode;
                if (parentNode !== null) {
                    parentNode.removeChild(patch.domNode);
                }
                break;
            case 1 /* REPLACE */:
                const toReplace = patch.domNode;
                const replacement = this.createElement(patch.node);
                this.replaceElement(replacement, toReplace);
                break;
            case 0 /* APPEND */:
                const element = this.createElement(patch.node);
                patch.domNode.appendChild(element);
                break;
        }
    }
    replaceElement(replacement, toReplace) {
        const parentNode = toReplace.parentNode;
        if (parentNode !== null) {
            parentNode.replaceChild(replacement, toReplace);
        }
    }
    addEventListener(element, eventName, event) {
        if (event !== undefined) {
            element.addEventListener(eventName, event);
        }
        else {
            // не знаю как удалить event через removeEventListener
            // так как в новом объекте может не быть event
            if (element.parentNode) {
                element.parentNode.replaceChild(element.cloneNode(true), element);
            }
        }
    }
    setCache(oldNode, element) {
        this.nodeCache.set(oldNode, element);
    }
    replaceCache(oldKey, newKey) {
        const value = this.nodeCache.get(oldKey);
        // todo: есть проблема с потерей родителя у дочерних компонентов
        // описывал в todo выше
        if (newKey) {
            this.nodeCache.delete(oldKey);
            this.nodeCache.set(newKey, value);
        }
        return value;
    }
    render(virtualDom, containerName) {
        const container = document.querySelector(containerName);
        if (!container)
            throw new Error("--> Container not found");
        const result = this.createElement(virtualDom);
        // todo: нужно ли очищать контейнер до рендера?
        container.appendChild(result);
        return container;
    }
}
export const templator = new Templator();
export const vdom = new VirtualDom();
//# sourceMappingURL=Templator.js.map