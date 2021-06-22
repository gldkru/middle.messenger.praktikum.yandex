import { templator } from '../modules/Templator';
import Aside from '../components/Aside';
import Window from '../components/Window';
import Chat from '../components/Chat';

// todo: научиться писть дженерики без пропсов
const aside = new Aside({});

const chat = new Chat({});

const page = new Window({
  asideContent: aside.getContent(),
  content: chat.getContent(),
});

templator.render(page.getContent(), '#app');
