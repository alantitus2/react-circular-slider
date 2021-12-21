import { ICircularSliderState } from "../CircularSliderState";
import { EActionType } from "./EActionType";

export interface ReducerAction {
    type: EActionType;
    payload: Partial<ICircularSliderState>;
}
