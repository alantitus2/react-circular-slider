import { CircularSliderState } from "../../Helpers/CircularSliderState";

export interface TKnob {
    name: string;
    state: CircularSliderState;
    knobSize: number;
    knobColor: string;
    trackSize: number;
    hideKnob: boolean;
    knobDraggable: boolean;
    onMouseDown: () => void;
    children: JSX.Element | null;
}
