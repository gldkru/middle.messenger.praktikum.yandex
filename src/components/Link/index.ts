import { vdom, templator } from '../../modules/Templator';
import template from './template';
import BaseComponent from '../../modules/BaseComponent';
import { ILinkState } from './types';

export default class Link extends BaseComponent<ILinkState> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
