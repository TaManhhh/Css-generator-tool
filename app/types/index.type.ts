export interface BoxShadowI {
  shiftRight: number;
  shiftDown: number;
  spread: number;
  blur: number;
  color: any;
  inset: boolean;
  id: any;
}
export interface Template {
  template: BoxShadowI[];
  id: number;
  shadow:string;
}
export interface TextShadow {
  shiftRight: number;
  shiftDown: number;
  blur: number;
  color: any;
  id: any;
}
