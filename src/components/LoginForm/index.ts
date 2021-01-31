import { templator } from "../../modules/Templator.js";
import VirtualDom from "../../modules/VirtualDom.js";
import { template } from "./template.js";
import BaseComponent from "../../modules/BaseComponent.js";
import { ILoginFormContext } from "./types.js";

const vdom = new VirtualDom();

export default class LoginForm extends BaseComponent<ILoginFormContext> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
