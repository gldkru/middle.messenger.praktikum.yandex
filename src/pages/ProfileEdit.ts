import { templator } from '../modules/Templator';
import AsideBack from '../components/AsideBack';
import Window from '../components/Window';
import ProfileEdit from '../components/ProfileEdit';
import FormRow from '../components/FormRow';
import { InputTypes } from '../components/FormRow/types';
import { validate, Validators } from '../utils/validators';
import Button from '../components/Button';

const model = {
  firstname: 'Кирилл',
  lastname: 'Гладких',
  displayName: 'Кирилл',
  phone: '79082554180',
  username: 'gldk.ru',
  email: 'a@gldk.ru',
  oldPassword: '',
  newPassword: '',
};

const firstname = new FormRow({
  name: 'firstname',
  type: InputTypes.TEXT,
  label: 'Имя',
  placeholder: 'Введите',
  value: model.firstname,
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
  value: model.lastname,
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

const displayName = new FormRow({
  name: 'display_name',
  type: InputTypes.TEXT,
  label: 'Отображаемое имя',
  placeholder: 'Введите',
  value: model.displayName,
  onFocus(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains('props-list__error')) {
      event.target.parentElement.querySelector('.props-list__edit-label').classList.remove('text-danger');
      el.remove();
    }
  },
  onBlur(event) {
    model.displayName = event.target.value;

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
  value: model.phone,
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
  value: model.username,
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
  value: model.email,
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

const oldPassword = new FormRow({
  name: 'oldPassword',
  type: InputTypes.PASSWORD,
  label: 'Старый пароль',
  placeholder: 'Изменить пароль',
  value: '',
});

const newPassword = new FormRow({
  name: 'newPassword',
  type: InputTypes.PASSWORD,
  label: 'Новый пароль',
  placeholder: 'Изменить пароль',
  value: '',
  onFocus(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains('props-list__error')) {
      event.target.parentElement.querySelector('.props-list__edit-label').classList.remove('text-danger');
      el.remove();
    }
  },
  onBlur(event) {
    model.newPassword = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [Validators.PASSWORD_REPEAT]);

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
  children: 'Сохранить',
  className: 'btn_block btn_lg btn_padding',
});

// todo: объеденить Aside и AsideBack в 1 компонент с условиями
const aside = new AsideBack({});

const profileEdit = new ProfileEdit({
  name: 'Кирилл',
  button: button.getContent(),
  content: [
    firstname.getContent(),
    lastname.getContent(),
    displayName.getContent(),
    phone.getContent(),
    username.getContent(),
    email.getContent(),

    newPassword.getContent(),
    oldPassword.getContent(),
  ],
  onSubmit(event) {
    event.preventDefault();
    console.log(model);

    // todo validators
    // не придумал пока как дергать за ошибки
    // возможно нужна другая реализация для валидации
  },
});

const page = new Window({
  asideContent: aside.getContent(),
  content: profileEdit.getContent(),
});

templator.render(page.getContent(), '#app');
