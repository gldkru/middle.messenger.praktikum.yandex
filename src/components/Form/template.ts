const template = `
<form action="#" method="POST" name="{{ name }}" onsubmit="{{ onSubmit }}">
  <ul class="props-list">
    {{ content }}
  </ul>
  {{ button }}
  <br />
</form>
`;

export default template;
