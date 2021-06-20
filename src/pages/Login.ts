import { templator } from '../modules/Templator';
import Window from '../components/Window';
import LoginForm from '../components/LoginForm';

import Form from '../components/Form';
import FormRow from '../components/FormRow';
import { InputTypes } from '../components/FormRow/types';
import { validate, Validators } from '../utils/validators';
import Link from '../components/Link';
import Button from '../components/Button';

// не обновляю ноду из-за проблемы потери родителя
// которая описана в Templator.ts
// todo: вынести логику работы с данными в utils
const model = {
  email: '',
  password: '',
};

const email = new FormRow({
  name: 'email',
  type: InputTypes.EMAIL,
  label: 'Почта',
  placeholder: 'a@gldk.ru',
  value: '',
  onFocus(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains('props-list__error')) {
      event.target.parentElement.querySelector('.props-list__edit-label').classList.remove('text-danger');
      el.remove();
    }
  },
  onBlur(event) {
    model.email = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [Validators.EMAIL]);

    if (error) {
      const span = document.createElement('li');
      span.setAttribute('class', 'props-list__error text-danger text-sm');
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector('.props-list__edit-label').classList.add('text-danger');
    }
  },
});

const button = new Button({
  type: 'submit',
  children: 'Вход',
  className: 'btn_block btn_lg btn_padding',
});

const password = new FormRow({
  name: 'password',
  type: InputTypes.PASSWORD,
  label: 'Пароль',
  placeholder: '●●●●●●●●●',
  value: '',
});

const form = new Form({
  content: [email.getContent(), password.getContent()],
  button: button.getContent(),
  onSubmit(event) {
    event.preventDefault();
    console.log(model);

    // todo validators
    // не придумал пока как дергать за ошибки
    // возможно нужна другая реализация для валидации
  },
});

const link = new Link({
  link: '/registration.html',
  children: 'Нет аккаунта?',
});

const loginForm = new LoginForm({
  title: 'Вход',
  form: form.getContent(),
  footer: link.getContent(),
});

const page = new Window({
  content: loginForm.getContent(),
});

templator.render(page.getContent(), '#app');
