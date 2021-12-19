import { CircularSliderState } from "../CircularSlider/Helpers/CircularSliderState";
import { EActionType } from "./EActionType";
import { ReducerAction } from "./ReducerAction";

function reducer(
    state: CircularSliderState,
    action: ReducerAction
): CircularSliderState {
    switch (action.type) {
        case EActionType.init:
            return {
                ...state,
                ...action.payload,
            };
        case EActionType.setKnobPosition:
            return {
                ...state,
                ...action.payload,
            };
        case EActionType.onMouseDown:
        case EActionType.onMouseUp:
            return {
                ...state,
                ...action.payload,
            };
        case EActionType.setInitialKnobPosition:
            return {
                ...state,
                ...action.payload,
            };
        default:
            throw new Error();
    }
}

export default reducer;


