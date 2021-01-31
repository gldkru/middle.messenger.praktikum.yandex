import { templator } from "../modules/Templator.js";
import AsideBack from "../components/AsideBack/index.js";
import Window from "../components/Window/index.js";
import FormRow from "../components/FormRow/index.js";
import { InputTypes } from "../components/FormRow/types.js";
import { validate, validators } from "../utils/validators.js";
import Button from "../components/Button/index.js";
import Form from "../components/Form/index.js";
import Link from "../components/Link/index.js";
import LoginForm from "../components/LoginForm/index.js";

// todo: объеденить Aside и AsideBack в 1 компонент с условиями
const aside = new AsideBack({});

// не обновляю ноду из-за проблемы потери родителя
// которая описана в Templator.ts
// todo: вынести логику работы с данными в utils
const model = {
  firstname: "",
  lastname: "",
  phone: "",
  username: "",
  email: "",
  password: ""
};

const firstname = new FormRow({
  name: "firstname",
  type: InputTypes.TEXT,
  label: "Имя",
  placeholder: "Введите",
  value: "",
  onFocus: function(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains("props-list__error")) {
      event.target.parentElement.querySelector(".props-list__edit-label").classList.remove("text-danger");
      el.remove();
    }
  },
  onBlur: function(event) {
    model.firstname = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [validators.REQUIRED, validators.ALPHABET]);

    if (error) {
      const span = document.createElement("li");
      span.setAttribute("class", "props-list__error text-danger text-sm");
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector(".props-list__edit-label").classList.add("text-danger");
    }
  }
});

const lastname = new FormRow({
  name: "lastname",
  type: InputTypes.TEXT,
  label: "Фамилия",
  placeholder: "Введите",
  value: "",
  onFocus: function(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains("props-list__error")) {
      event.target.parentElement.querySelector(".props-list__edit-label").classList.remove("text-danger");
      el.remove();
    }
  },
  onBlur: function(event) {
    model.lastname = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [validators.REQUIRED, validators.ALPHABET]);

    if (error) {
      const span = document.createElement("li");
      span.setAttribute("class", "props-list__error text-danger text-sm");
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector(".props-list__edit-label").classList.add("text-danger");
    }
  }
});

const phone = new FormRow({
  name: "phone",
  type: InputTypes.TEXT,
  label: "Телефон",
  placeholder: "Введите",
  value: "",
  onFocus: function(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains("props-list__error")) {
      event.target.parentElement.querySelector(".props-list__edit-label").classList.remove("text-danger");
      el.remove();
    }
  },
  onBlur: function(event) {
    model.phone = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [validators.REQUIRED, validators.PHONE]);

    if (error) {
      const span = document.createElement("li");
      span.setAttribute("class", "props-list__error text-danger text-sm");
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector(".props-list__edit-label").classList.add("text-danger");
    }
  }
});

const username = new FormRow({
  name: "username",
  type: InputTypes.TEXT,
  label: "Логин",
  placeholder: "Введите",
  value: "",
  onFocus: function(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains("props-list__error")) {
      event.target.parentElement.querySelector(".props-list__edit-label").classList.remove("text-danger");
      el.remove();
    }
  },
  onBlur: function(event) {
    model.username = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [validators.REQUIRED]);

    if (error) {
      const span = document.createElement("li");
      span.setAttribute("class", "props-list__error text-danger text-sm");
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector(".props-list__edit-label").classList.add("text-danger");
    }
  }
});

const email = new FormRow({
  name: "email",
  type: InputTypes.EMAIL,
  label: "Почта",
  placeholder: "Введите",
  value: "",
  onFocus: function(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains("props-list__error")) {
      event.target.parentElement.querySelector(".props-list__edit-label").classList.remove("text-danger");
      el.remove();
    }
  },
  onBlur: function(event) {
    model.email = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [validators.REQUIRED, validators.EMAIL]);

    if (error) {
      const span = document.createElement("li");
      span.setAttribute("class", "props-list__error text-danger text-sm");
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector(".props-list__edit-label").classList.add("text-danger");
    }
  }
});

const password = new FormRow({
  name: "password",
  type: InputTypes.PASSWORD,
  label: "Пароль",
  placeholder: "Введите",
  value: "",
  onFocus: function(event) {
    const el = event.target.parentElement.nextSibling;
    if (el.classList.contains("props-list__error")) {
      event.target.parentElement.querySelector(".props-list__edit-label").classList.remove("text-danger");
      el.remove();
    }
  },
  onBlur: function(event) {
    model.password = event.target.value;

    // todo: унести в компонент ошибки
    const error = validate(event.target.value, [validators.REQUIRED]);

    if (error) {
      const span = document.createElement("li");
      span.setAttribute("class", "props-list__error text-danger text-sm");
      span.textContent = error.message;
      event.target.parentElement.after(span);
      event.target.parentElement.querySelector(".props-list__edit-label").classList.add("text-danger");
    }
  }
});

const button = new Button({
  type: "submit",
  children: "Зарегистрироваться",
  className: "btn_block btn_lg btn_padding"
});

const form = new Form({
  content: [
    firstname.getContent(),
    lastname.getContent(),
    phone.getContent(),
    username.getContent(),
    email.getContent(),
    password.getContent()
  ],
  button: button.getContent(),
  onSubmit: function(event) {
    event.preventDefault();
    console.log(model);

    // todo validators
    // не придумал пока как дергать за ошибки
    // возможно нужна другая реализация для валидации
  }
});

const link = new Link({
  link: "/",
  children: "Войти"
});

const registrationForm = new LoginForm({
  title: "Регистрация",
  form: form.getContent(),
  footer: link.getContent()
});

const page = new Window({
  asideContent: aside.getContent(),
  content: registrationForm.getContent()
});

templator.render(page.getContent(), "#app");
