const template = `
  <aside class="main-window__aside">
    <form action="#" method="POST" class="dialogs-search">
      <span class="dialogs-search__icon">
        <img src="icons/search.svg" alt="Поиск" />
      </span>
      <input type="text" name="dialog-search" class="dialogs-search__input input-gray" placeholder="Поиск"/>
    </form>
    <ul class="dialogs">
      <li class="dialog dialog_list">
        <span class="dialog__avatar">
          <img class="dialog__avatar-image" src="https://randomuser.me/api/portraits/men/93.jpg" width="47px" height="47px" alt="Андрей"/>
        </span>
        <span class="dialog__information">
          <span class="dialog__name">
            <h2 class="dialog__author">Андрей</h2>
            <time class="dialog__time">10:49</time>
          </span>
          <span class="dialog__preview">
            <span class="dialog__short-message">Изображение</span>
            <span class="dialog__counter">3</span>
          </span>
        </span>
      </li>
      <li class="dialog dialog_list dialog_active">
        <span class="dialog__avatar">
          <img class="dialog__avatar-image" src="https://randomuser.me/api/portraits/women/63.jpg" width="47px" height="47px" alt="Василиса"/>
        </span>
        <span class="dialog__information">
          <span class="dialog__name">
            <h2 class="dialog__author">Василиса</h2>
            <time class="dialog__time">Вт</time>
          </span>
          <span class="dialog__preview">
            <span class="dialog__short-message">Изображение и текст в 2 строки как результат...</span>
          </span>
        </span>
      </li>
      <li class="dialog dialog_list">
        <span class="dialog__avatar">
          <img class="dialog__avatar-image" src="https://randomuser.me/api/portraits/men/41.jpg" width="47px" height="47px" alt="Виталик"/>
        </span>
        <span class="dialog__information">
          <span class="dialog__name">
            <h2 class="dialog__author">Виталик</h2>
            <time class="dialog__time">10:49</time>
          </span>
          <span class="dialog__preview">
            <span class="dialog__short-message"><span class="dialog__sender">Вы:</span><span>Изображение</span></span>
            <span class="dialog__counter">1</span>
          </span>
        </span>
      </li>
      <li class="dialog dialog_list">
        <span class="dialog__avatar">ВН</span>
        <span class="dialog__information">
          <span class="dialog__name">
            <h2 class="dialog__author">Валерий Николаев</h2>
            <time class="dialog__time">11.05.2020</time>
          </span>
          <span class="dialog__preview">
            <span class="dialog__short-message">Изображение и текст в 2 строки как результат</span>
            <span class="dialog__counter">1</span>
          </span>
        </span>
      </li>
    </ul>
    <a href="/profile.html" class="user-profile">
      <span>Профиль</span>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9l4-4-4-4" stroke="currentColor"/></svg>
    </a>
  </aside>
`;

export default template;
