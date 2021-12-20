import { ICircularSliderState } from "../CircularSlider/Helpers/CircularSliderState";
import { EActionType } from "./EActionType";
import { ReducerAction } from "./ReducerAction";

function reducer(
    state: ICircularSliderState,
    action: ReducerAction
): ICircularSliderState {
    // console.log(EActionType[action.type]);

    switch (action.type) {
        case EActionType.initialize:
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


