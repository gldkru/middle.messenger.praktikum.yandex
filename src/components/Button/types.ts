export interface IButtonState {
  className?: string | string[];
  type?: string;
  name?: string;
  block?: boolean;
  children: string | HTMLElement | Text;
  onClick?: Function;
}
