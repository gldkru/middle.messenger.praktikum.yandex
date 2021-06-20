const template = `
<li class="props-list__li">
  <label for="{{ name }}" class="props-list__edit-label">{{ label }}</label>
  <input id="{{ name }}" name="{{ name }}" type="{{ type }}" class="props-list__edit" value="{{ value }}" placeholder="{{ placeholder }}" onblur="{{ onBlur }}" onfocus="{{ onFocus }}" oninput="{{ onInput }}" />
</li>
`;

export default template;
