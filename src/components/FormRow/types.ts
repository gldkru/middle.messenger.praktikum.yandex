export enum InputTypes {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password"
}

export interface IFormRowContext {
  name: string;
  type: InputTypes;
  label: string;
  value: string;
  placeholder?: string;
  onInput?: Function;
  onBlur?: Function;
  onFocus?: Function;
}
