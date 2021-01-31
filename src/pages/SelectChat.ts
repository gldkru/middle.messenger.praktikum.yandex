import { templator } from "../modules/Templator.js";
import Aside from "../components/Aside/index.js";
import Window from "../components/Window/index.js";
import ChatEmpty from "../components/ChatEmpty/index.js";

// todo: научиться писть дженерики без пропсов
const aside = new Aside({});

const chatEmpty = new ChatEmpty({
  text: "Выберите чат чтобы отправить сообщение"
});

const page = new Window({
  asideContent: aside.getContent(),
  content: chatEmpty.getContent()
});

templator.render(page.getContent(), "#app");
