import { templator } from '../modules/Templator';
import AsideBack from '../components/AsideBack';
import Window from '../components/Window';
import FormRow from '../components/FormRow';
import { InputTypes } from '../components/FormRow/types';
import { validate, Validators } from '../utils/validators';
import Button from '../components/Button';
import Form from '../components/Form';
import Link from '../components/Link';
import LoginForm from '../components/LoginForm';

// todo: объеденить Aside и AsideBack в 1 компонент с условиями
const aside = new AsideBack({});

// не обновляю ноду из-за проблемы потери родителя
// которая описана в Templator.ts
// todo: вынести логику работы с данными в utils
const model = {
  firstname: '',
  lastname: '',
  phone: '',
  username: '',
  email: '',
  password: '',
};

const firstname = new FormRow({
  name: 'firstname',
  type: InputTypes.TEXT,
  label: 'Имя',
  placeholder: 'Введите',
  value: '',
  onFocus(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains('props-list__error')) {
      event.target.parentElement.querySelector('.props-list__edit-label').classList.remove('text-danger');
      el.remove();
    }
  },
  onBlur(event) {
    model.firstname = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [Validators.REQUIRED, Validators.ALPHABET]);

    if (error) {
      const span = document.createElement('li');
      span.setAttribute('class', 'props-list__error text-danger text-sm');
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector('.props-list__edit-label').classList.add('text-danger');
    }
  },
});

const lastname = new FormRow({
  name: 'lastname',
  type: InputTypes.TEXT,
  label: 'Фамилия',
  placeholder: 'Введите',
  value: '',
  onFocus(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains('props-list__error')) {
      event.target.parentElement.querySelector('.props-list__edit-label').classList.remove('text-danger');
      el.remove();
    }
  },
  onBlur(event) {
    model.lastname = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [Validators.REQUIRED, Validators.ALPHABET]);

    if (error) {
      const span = document.createElement('li');
      span.setAttribute('class', 'props-list__error text-danger text-sm');
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector('.props-list__edit-label').classList.add('text-danger');
    }
  },
});

const phone = new FormRow({
  name: 'phone',
  type: InputTypes.TEXT,
  label: 'Телефон',
  placeholder: 'Введите',
  value: '',
  onFocus(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains('props-list__error')) {
      event.target.parentElement.querySelector('.props-list__edit-label').classList.remove('text-danger');
      el.remove();
    }
  },
  onBlur(event) {
    model.phone = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [Validators.REQUIRED, Validators.PHONE]);

    if (error) {
      const span = document.createElement('li');
      span.setAttribute('class', 'props-list__error text-danger text-sm');
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector('.props-list__edit-label').classList.add('text-danger');
    }
  },
});

const username = new FormRow({
  name: 'username',
  type: InputTypes.TEXT,
  label: 'Логин',
  placeholder: 'Введите',
  value: '',
  onFocus(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains('props-list__error')) {
      event.target.parentElement.querySelector('.props-list__edit-label').classList.remove('text-danger');
      el.remove();
    }
  },
  onBlur(event) {
    model.username = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [Validators.REQUIRED]);

    if (error) {
      const span = document.createElement('li');
      span.setAttribute('class', 'props-list__error text-danger text-sm');
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector('.props-list__edit-label').classList.add('text-danger');
    }
  },
});

const email = new FormRow({
  name: 'email',
  type: InputTypes.EMAIL,
  label: 'Почта',
  placeholder: 'Введите',
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
    const error = validate(event.target.value, [Validators.REQUIRED, Validators.EMAIL]);

    if (error) {
      const span = document.createElement('li');
      span.setAttribute('class', 'props-list__error text-danger text-sm');
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector('.props-list__edit-label').classList.add('text-danger');
    }
  },
});

const password = new FormRow({
  name: 'password',
  type: InputTypes.PASSWORD,
  label: 'Пароль',
  placeholder: 'Введите',
  value: '',
  onFocus(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains('props-list__error')) {
      event.target.parentElement.querySelector('.props-list__edit-label').classList.remove('text-danger');
      el.remove();
    }
  },
  onBlur(event) {
    model.password = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [Validators.REQUIRED]);

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
  children: 'Зарегистрироваться',
  className: 'btn_block btn_lg btn_padding',
});

const form = new Form({
  content: [
    firstname.getContent(),
    lastname.getContent(),
    phone.getContent(),
    username.getContent(),
    email.getContent(),
    password.getContent(),
  ],
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
  link: '/',
  children: 'Войти',
});

const registrationForm = new LoginForm({
  title: 'Регистрация',
  form: form.getContent(),
  footer: link.getContent(),
});

const page = new Window({
  asideContent: aside.getContent(),
  content: registrationForm.getContent(),
});

templator.render(page.getContent(), '#app');
