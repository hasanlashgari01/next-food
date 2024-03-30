import { Dispatch, SetStateAction } from "react";

export interface IPositionItemProps {
  step: number;
  setStep?: Dispatch<SetStateAction<number>>;
  action?: () => void;
}
