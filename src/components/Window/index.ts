import { templator } from '../../modules/Templator';
import template from './template';
import BaseComponent from '../../modules/BaseComponent';
import { IWindowContext } from './types';
import VirtualDom from '../../modules/VirtualDom';

const vdom = new VirtualDom();

export default class Window extends BaseComponent<IWindowContext> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
