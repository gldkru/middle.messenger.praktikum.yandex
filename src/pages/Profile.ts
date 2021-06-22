import { templator } from '../modules/Templator';
import AsideBack from '../components/AsideBack';
import Window from '../components/Window';
import Profile from '../components/Profile';

// todo: объеденить Aside и AsideBack в 1 компонент с условиями
const aside = new AsideBack({});

const profile = new Profile({});

const page = new Window({
  asideContent: aside.getContent(),
  content: profile.getContent(),
});

templator.render(page.getContent(), '#app');
