import { CircularSliderState } from "../CircularSlider/Helpers/CircularSliderState";
import { EActionType } from "./EActionType";

export interface ReducerAction {
    type: EActionType;
    payload: Partial<CircularSliderState>;
}
