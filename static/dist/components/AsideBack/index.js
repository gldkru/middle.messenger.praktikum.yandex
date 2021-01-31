import { templator } from "../../modules/Templator.js";
import VirtualDom from "../../modules/VirtualDom.js";
import { template } from "./template.js";
import BaseComponent from "../../modules/BaseComponent.js";
const vdom = new VirtualDom();
export default class AsideBack extends BaseComponent {
    rerender() {
        const newTree = vdom.createTree(template, this.props);
        const patches = templator.diff(this.element, newTree);
        templator.patch(patches);
    }
    render() {
        return vdom.createTree(template, this.props);
    }
}
// todo: этот компонент удалю и заменю его Aside
//# sourceMappingURL=index.js.map