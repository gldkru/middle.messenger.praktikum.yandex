import { templator } from '../../modules/Templator';
import VirtualDom from '../../modules/VirtualDom';
import template from './template';
import BaseComponent from '../../modules/BaseComponent';
import { IProfileContext } from './types';

const vdom = new VirtualDom();

export default class Profile extends BaseComponent<IProfileContext> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
