import { templator } from '../modules/Templator';
import ErrorPage from '../components/ErrorPage';

const page = new ErrorPage({
  code: 400,
  text: 'Плохой запрос',
});

templator.render(page.getContent(), '#app');
