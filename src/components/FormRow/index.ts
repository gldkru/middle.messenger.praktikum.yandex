import { templator } from "../../modules/Templator.js";
import BaseComponent from "../../modules/BaseComponent.js";
import VirtualDom from "../../modules/VirtualDom.js";
import { IFormRowContext } from "./types.js";
import { template } from "./template.js";

const vdom = new VirtualDom();

export default class FormRow extends BaseComponent<IFormRowContext> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
