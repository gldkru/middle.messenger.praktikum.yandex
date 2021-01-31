export const template = `
<div class="main-area">
  <header class="main-area__header">
    <div class="dialog">
      <div class="dialog__avatar">
        <img class="dialog__avatar-image" src="https://randomuser.me/api/portraits/women/63.jpg" width="47px" height="47px" alt="Василиса"/>
      </div>
      <div class="dialog__information">
        <div class="dialog__name">
          <div class="dialog__author">Василиса</div>
        </div>
        <div class="dialog__preview">
          <div class="text-muted">Была в сети 2 часа назад</div>
        </div>
      </div>
    </div>

    <button class="btn btn_icon">
      <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="2" r="1.5" fill="currentColor"/><circle cx="1.5" cy="8" r="1.5" fill="currentColor"/><circle cx="1.5" cy="14" r="1.5" fill="currentColor"/></svg>
    </button>
  </header>
  <div class="main-area__scroll" id="history">
    <div class="main-area__scroll-inner">
      <div class="message message_system">
        19 июня
      </div>
      <div class="message message_get">
        <div class="message__inner">
          <div class="message__text">
            Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br /><br />
            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
          </div>
          <div class="message__meta">
            <time class="message__time">11:56</time>
          </div>
        </div>
      </div>
      <div class="message message_get message_type-image">
        <div class="message__inner">
          <img class="message__image" src="/images/cat.jpeg" alt=""/>
          <div class="message__meta">
            <time class="message__time">11:58</time>
          </div>
        </div>
      </div>
      <div class="message message_send">
        <div class="message__inner">
          <div class="message__text">
            Котики это волшебно! 🔮
          </div>
          <div class="message__meta">
            <span class="message__status">
              <svg width="11" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path transform="scale(.99834 1.00166) rotate(45 -2.46 2.011)" stroke="currentColor" d="M0-.5h3.765"/><path transform="matrix(.70593 -.70828 .70593 .70828 3.358 5)" stroke="#3369F3" d="M0-.5h5.647"/><path transform="matrix(.70593 -.70828 .70593 .70828 6.016 5)" stroke="currentColor" d="M0-.5h5.647"/></svg>
            </span>
            <time class="message__time">12:02</time>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="main-area__footer">
    <form action="#" method="POST" class="message-form">
      <span class="message-form__inner">
        <button class="btn btn_icon">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.187 12.5l7.576-7.576.943.943-7.577 7.576-.942-.943zM8.7 15.014l7.577-7.576.943.943-7.576 7.576-.943-.943zM14.043 20.357l7.577-7.576.942.942-7.576 7.576-.943-.942zM16.557 22.87l7.576-7.576.943.943-7.576 7.576-.943-.942z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.557 22.87c-2.615 2.616-6.845 2.625-9.449.022-2.603-2.604-2.594-6.834.021-9.45l-.942-.942c-3.139 3.138-3.15 8.215-.026 11.339 3.124 3.124 8.201 3.113 11.34-.025l-.944-.943zM21.62 12.78l.942.943c2.441-2.44 2.45-6.389.02-8.819-2.43-2.43-6.379-2.421-8.82.02l.944.943c1.917-1.918 5.02-1.925 6.929-.016 1.91 1.91 1.902 5.012-.016 6.93z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.7 15.014c-1.743 1.744-1.749 4.564-.013 6.3 1.735 1.735 4.556 1.73 6.3-.014l-.944-.943a3.118 3.118 0 01-4.41.01 3.118 3.118 0 01.01-4.41l-.942-.943z" fill="currentColor"/></svg>
        </button>
      </span>
      <span class="message-form__inner message-form__inner_wide">
        <textarea type="text" rows="1" class="input-gray" placeholder="Сообщение"></textarea>
      </span>
      <span class="message-form__inner">
        <button type="submit" class="btn">
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 5.2h11v1.6H0z"/><path d="M7 1l4 5-4 5" stroke="currentColor" stroke-width="1.6"/></svg>
        </button>
      </span>
    </form>
  </footer>
</div>
`;
//# sourceMappingURL=template.js.map