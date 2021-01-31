import { vdom, templator } from "../../modules/Templator.js";
import { template } from "./template.js";
import BaseComponent from "../../modules/BaseComponent.js";
import { IChatEmptyContext } from "./types.js";

export default class ChatEmpty extends BaseComponent<IChatEmptyContext> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
