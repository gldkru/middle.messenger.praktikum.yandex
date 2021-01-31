import { templator } from "../modules/Templator.js";
import Aside from "../components/Aside/index.js";
import Window from "../components/Window/index.js";
import Chat from "../components/Chat/index.js";
// todo: научиться писть дженерики без пропсов
const aside = new Aside({});
const chat = new Chat({});
const page = new Window({
    asideContent: aside.getContent(),
    content: chat.getContent()
});
templator.render(page.getContent(), "#app");
//# sourceMappingURL=Messenger.js.map