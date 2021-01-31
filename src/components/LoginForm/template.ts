export const template = `
<div class="auth-form">
  <header class="auth-form__header">
    <h1>{{ title }}</h1>
  </header>
  {{ form }}
  {{ footer }}
</div>
`;

// `<form action="#" method="POST" name="asyncForm">
//     <ul class="props-list">
//       <li class="props-list__li">
//         <label for="email" class="text-danger props-list__edit-label">Почта</label>
//         <input id="email" name="email" type="email" class="props-list__edit" value="" placeholder="a@gldk.ru" />
//       </li>
//       <li class="props-list__error text-danger text-sm">Такого пользователя не существует</li>
//       <li class="props-list__li">
//         <label for="password" class="props-list__edit-label">Пароль</label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           class="props-list__edit"
//           value=""
//           placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
//         />
//       </li>
//     </ul>
//
//     <button type="submit" id="submit-form" class="btn btn_block btn_lg btn_padding">Авторизоваться</button>
//     <br />
//     <a href="/registration.html" class="btn btn_link">Нет аккаунта?</a>
//   </form>`
