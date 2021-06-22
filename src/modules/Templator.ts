import {
  NodeTypes, ElementNode, TextElementNode, VNode, ElementAttributes, Patch, PatchType,
} from '../types';
import VirtualDom from './VirtualDom';
import {
  isSvgTag, isEventProp, extractEventName, diff,
} from '../utils/templateHelpers';

export default class Templator {
  private nodeCache: WeakMap<VNode, HTMLElement | Text | SVGElement>;

  private diffHelper;

  constructor() {
    this.nodeCache = new WeakMap();
    this.diffHelper = diff;
  }

  createElement(element: VNode): HTMLElement | Text | SVGElement {
    if (element.type === NodeTypes.TEXT) {
      const text = (element as TextElementNode).content ? (element as TextElementNode).content : '';
      const dom = document.createTextNode(text);

      this.setCache(element, dom);

      return dom;
    }
    const tagName = (element as ElementNode).name;
    const dom: HTMLElement | SVGElement = !isSvgTag(tagName)
      ? document.createElement(tagName || 'div')
      : document.createElementNS('http://www.w3.org/2000/svg', tagName);
    const { children } = element as ElementNode;

    if (children && children.length) {
      children.forEach((child) => {
        const childElement = this.createElement(child);
        dom.appendChild(childElement);
      });
    }

    const attrs = (element as ElementNode).attributes;
    if (attrs) {
      this.applyAttributes(dom, attrs);
    }

    this.setCache(element, dom);

    return dom;
  }

  diff(oldTree: VNode, newTree: VNode): Patch[] {
    const patches: Patch[] = [];

    this.runDiff(oldTree, newTree, patches);

    return patches;
  }

  patch(patches: Patch[]): void {
    patches.forEach((patch) => this.applyPatch(patch));
  }

  private applyAttributes(element: HTMLElement | SVGElement, attrs: ElementAttributes): void {
    Object.keys(attrs).forEach((key) => {
      const value: string | undefined = attrs[key];

      if (isEventProp(key)) {
        const eventName = extractEventName(key);

        this.addEventListener(element, eventName, value);
      } else if (value === undefined) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, value);
      }
    });
  }

  private diffChildren(
    oldParent: ElementNode,
    newParent: ElementNode,
    parentNode: HTMLElement,
    patches: Patch[],
  ) {
    // todo: if not children
    const oldChildren: VNode[] = oldParent.children;
    const newChildren: VNode[] = newParent.children;
    const length: number = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < length; i += 1) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];

      // APPEND NEW
      if (oldChild === undefined) {
        patches.push({
          type: PatchType.APPEND,
          node: newChild,
          domNode: parentNode,
        });

        // REMOVE OLD
      } else if (newChild === undefined) {
        patches.push({
          type: PatchType.REMOVE,
          domNode: this.nodeCache.get(oldChild)!,
        });
        // DIFF THE REST
      } else {
        this.runDiff(oldChild, newChild, patches);
      }
    }
  }

  private runDiff(oldNode: VNode, newNode: VNode, patches: Patch[] = []): void {
    if ((!oldNode && !newNode) || oldNode === newNode) return;

    const domNode = this.replaceCache(oldNode, newNode);

    if (oldNode.type !== newNode.type) {
      // Different node types
      patches.push({
        type: PatchType.REPLACE,
        node: newNode,
        domNode,
      });
    } else {
      switch (oldNode.type) {
        case NodeTypes.TAG: {
          if ((oldNode as ElementNode).name !== (newNode as ElementNode).name) {
            patches.push({
              type: PatchType.REPLACE,
              node: newNode,
              domNode,
            });
          } else {
            const propsDiff: ElementAttributes | undefined = this.diffAttributes(
              (oldNode as ElementNode).attributes,
              (newNode as ElementNode).attributes,
            );

            // todo: && domNode - hotfix от потери родителя
            // скорее всего верным паттерном будет следить за родительской нодой
            // не успел переписать
            if (propsDiff !== undefined && domNode) {
              patches.push({
                type: PatchType.PROPS,
                attributes: propsDiff,
                domNode: domNode as HTMLElement,
              });
            }

            this.diffChildren(
              oldNode as ElementNode,
              newNode as ElementNode,
              domNode as HTMLElement,
              patches,
            );
          }

          break;
        }
        case NodeTypes.TEXT: {
          if ((oldNode as TextElementNode).content !== (newNode as TextElementNode).content) {
            patches.push({
              type: PatchType.TEXT,
              value: (newNode as TextElementNode).content || '',
              domNode: domNode as Text,
            });
          }

          break;
        }
        default: {
          break;
        }
      }
    }
  }

  private diffAttributes(
    oldAttrs?: ElementAttributes,
    newAttrs?: ElementAttributes,
  ): ElementAttributes | undefined {
    if (oldAttrs === undefined || newAttrs === undefined) return;

    // eslint-disable-next-line consistent-return
    return this.diffHelper(newAttrs, oldAttrs);
  }

  private applyPatch(patch: Patch): void {
    switch (patch.type) {
      case PatchType.TEXT: {
        patch.domNode.textContent = patch.value; // eslint-disable-line no-param-reassign
        break;
      }
      case PatchType.PROPS: {
        this.applyAttributes(patch.domNode, patch.attributes);
        break;
      }
      case PatchType.REMOVE: {
        const { parentNode } = patch.domNode;

        if (parentNode !== null) {
          parentNode.removeChild(patch.domNode);
        }

        break;
      }
      case PatchType.REPLACE: {
        const toReplace: Node = patch.domNode;
        const replacement: Node = this.createElement(patch.node);

        this.replaceElement(replacement, toReplace);

        break;
      }
      case PatchType.APPEND: {
        const element = this.createElement(patch.node);
        patch.domNode.appendChild(element);
        break;
      }
      default: {
        break;
      }
    }
  }

  private replaceElement(replacement: Node, toReplace: Node): void {
    const { parentNode } = toReplace;

    if (parentNode !== null) {
      parentNode.replaceChild(replacement, toReplace);
    }
  }

  private addEventListener(element: HTMLElement | SVGElement, eventName: string, event: any) {
    if (event !== undefined) {
      element.addEventListener(eventName, event);
    } else if (element.parentNode) {
      // не знаю как удалить event через removeEventListener
      // так как в новом объекте может не быть event

      element.parentNode.replaceChild(element.cloneNode(true), element);
    }
  }

  private setCache(oldNode: VNode, element: HTMLElement | Text | SVGElement) {
    this.nodeCache.set(oldNode, element);
  }

  private replaceCache(oldKey: VNode, newKey?: VNode): HTMLElement | Text {
    const value: HTMLElement | Text = this.nodeCache.get(oldKey) as HTMLElement | Text;

    // todo: есть проблема с потерей родителя у дочерних компонентов
    // описывал в todo выше

    if (newKey) {
      this.nodeCache.delete(oldKey);
      this.nodeCache.set(newKey, value);
    }

    return value;
  }

  render(virtualDom: VNode, containerName: string): HTMLElement {
    const container = document.querySelector(containerName) as HTMLElement;

    if (!container) throw new Error('--> Container not found');

    const result: HTMLElement | Text | SVGElement = this.createElement(virtualDom);

    // todo: нужно ли очищать контейнер до рендера?
    container.appendChild(result);

    return container;
  }
}

export const templator = new Templator();
export const vdom = new VirtualDom();
