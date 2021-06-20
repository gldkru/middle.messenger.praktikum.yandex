import { templator } from '../modules/Templator';
import Aside from '../components/Aside';
import Window from '../components/Window';
import ChatEmpty from '../components/ChatEmpty';

// todo: научиться писть дженерики без пропсов
const aside = new Aside({});

const chatEmpty = new ChatEmpty({
  text: 'Выберите чат чтобы отправить сообщение',
});

const page = new Window({
  asideContent: aside.getContent(),
  content: chatEmpty.getContent(),
});

templator.render(page.getContent(), '#app');
