import { templator } from '../../modules/Templator';
import VirtualDom from '../../modules/VirtualDom';
import template from './template';
import BaseComponent from '../../modules/BaseComponent';
import { IProfileEditContext } from './types';

const vdom = new VirtualDom();

export default class ProfileEdit extends BaseComponent<IProfileEditContext> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
