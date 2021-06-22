import { templator } from '../../modules/Templator';
import BaseComponent from '../../modules/BaseComponent';
import VirtualDom from '../../modules/VirtualDom';
import { IFormRowContext } from './types';
import template from './template';

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
