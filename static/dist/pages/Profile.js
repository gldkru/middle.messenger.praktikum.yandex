import { templator } from "../modules/Templator.js";
import AsideBack from "../components/AsideBack/index.js";
import Window from "../components/Window/index.js";
import Profile from "../components/Profile/index.js";
// todo: объеденить Aside и AsideBack в 1 компонент с условиями
const aside = new AsideBack({});
const profile = new Profile({});
const page = new Window({
    asideContent: aside.getContent(),
    content: profile.getContent()
});
templator.render(page.getContent(), "#app");
//# sourceMappingURL=Profile.js.map