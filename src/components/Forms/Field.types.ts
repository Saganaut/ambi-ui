import type { BtnFill, BtnShape, BtnSize } from "../Buttons/Btn.types";

export type FieldFill = BtnFill;
export type FieldShape = Exclude<BtnShape, "avatar">;
export type FieldSize = BtnSize;

export interface FieldStyleProps {
  fill?: FieldFill;
  shape?: FieldShape;
  size?: FieldSize;
}
