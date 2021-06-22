import { templator } from '../modules/Templator';
import ErrorPage from '../components/ErrorPage';

const page = new ErrorPage({
  code: 500,
  text: 'Мы уже фиксим',
});

templator.render(page.getContent(), '#app');
