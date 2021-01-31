import { vdom, templator } from "../../modules/Templator.js";
import { template } from "./template.js";
import BaseComponent from "../../modules/BaseComponent.js";
export default class Button extends BaseComponent {
    rerender() {
        const newTree = vdom.createTree(template, this.props);
        const patches = templator.diff(this.element, newTree);
        templator.patch(patches);
    }
    render() {
        return vdom.createTree(template, this.props);
    }
}
//# sourceMappingURL=index.js.map