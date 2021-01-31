export const template = `
<div class="main-area">
  <div class="main-area__scroll">
    <form class="container" action="#" method="POST" name="asyncForm" onsubmit="{{ onSubmit }}">
      <span class="user-detail">
        <span class="user-detail__avatar">
          <label for="avatar" class="user-avatar-label"></label>
          <input type="file" id="avatar" class="user-avatar-input" />
        </span>
        <span class="user-detail__display-name">
          <h1>{{ name }}</h1>
        </span>
      </span>

      <ul class="props-list">
        {{ content }}
      </ul>

      {{ button }}
    </form>
  </div>
</div>
`;
