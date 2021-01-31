export const enum PatchType {
  APPEND,
  REPLACE,
  REMOVE,
  PROPS,
  TEXT
}

export enum NodeTypes {
  TAG,
  TEXT
}

export type TemplatePropsContext = {
  [key: string]: string | undefined | number | boolean | Function | ElementNode | TextElementNode;
};

export type ElementNode = {
  type: NodeTypes;
  parent?: ElementNode | null;
  name: string;
  attributes?: ElementAttributes;
  children: (ElementNode | TextElementNode)[];
};

export type TextElementNode = {
  type: NodeTypes;
  parent?: ElementNode | null;
  content: string;
};

export type VNode = ElementNode | TextElementNode;

export type ElementAttributes = {
  [key: string]: string;
};

export interface IAppendPatch {
  type: PatchType.APPEND;
  node: ElementNode | TextElementNode;
  domNode: HTMLElement | SVGElement;
}
export interface IReplacePatch {
  type: PatchType.REPLACE;
  node: ElementNode | TextElementNode;
  domNode: HTMLElement | Text | SVGElement;
}
export interface IRemovePatch {
  type: PatchType.REMOVE;
  domNode: HTMLElement | Text | SVGElement;
}
export interface IPropsPatch {
  type: PatchType.PROPS;
  attributes: ElementAttributes;
  domNode: HTMLElement;
}
export interface ITextPatch {
  type: PatchType.TEXT;
  value: string;
  domNode: Text;
}

export type Patch = IAppendPatch | IReplacePatch | IRemovePatch | IPropsPatch | ITextPatch;
