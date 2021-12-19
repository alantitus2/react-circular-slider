import { CircularSliderState } from "../CircularSlider/CircularSliderState";
import { EActionType } from "./EActionType";

export interface ReducerAction {
    type: EActionType;
    payload: Partial<CircularSliderState>;
}
