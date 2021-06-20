import { templator } from '../modules/Templator';
import ErrorPage from '../components/ErrorPage';

const page = new ErrorPage({
  code: 404,
  text: 'Не туда попали',
});

templator.render(page.getContent(), '#app');
