import { CircularSliderState } from '../CircularSlider/CircularSliderState';

function reducer(state: CircularSliderState, action): CircularSliderState {
    switch (action.type) {
        case "init":
            return {
                ...state,
                ...action.payload,
            };
        case "setKnobPosition":
            return {
                ...state,
                ...action.payload,
            };
        case "onMouseDown":
        case "onMouseUp":
            return {
                ...state,
                ...action.payload,
            };
        case "setInitialKnobPosition":
            return {
                ...state,
                ...action.payload,
            };
        default:
            throw new Error();
    }
}

export default reducer;
