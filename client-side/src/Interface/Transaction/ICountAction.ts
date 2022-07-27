import { CountActionKind } from "../../Enum/CountActionKind";
export  interface ICountAction {
    type: CountActionKind;
    payload: number;
  }
  