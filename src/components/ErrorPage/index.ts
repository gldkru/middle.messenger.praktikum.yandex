import { vdom, templator } from '../../modules/Templator';
import template from './template';
import BaseComponent from '../../modules/BaseComponent';
import { IErrorPageContext } from './types';

export default class Window extends BaseComponent<IErrorPageContext> {
  rerender() {
    const newTree = vdom.createTree(template, this.props);
    const patches = templator.diff(this.element, newTree);

    templator.patch(patches);
  }

  render() {
    return vdom.createTree(template, this.props);
  }
}
