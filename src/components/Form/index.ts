import BaseComponent from '../../modules/BaseComponent';
import { IFormContext } from './types';
import VirtualDom from '../../modules/VirtualDom';
import template from './template';
import { templator } from '../../modules/Templator';

const vdom = new VirtualDom();

export default class Form extends BaseComponent<IFormContext> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
