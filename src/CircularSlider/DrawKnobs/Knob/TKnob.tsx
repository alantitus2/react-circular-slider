import { ICircularSliderState } from "../../Helpers/CircularSliderState";

export interface TKnob {
    name: string;
    state: ICircularSliderState;
    knobSize: number;
    knobColor: string;
    trackSize: number;
    hideKnob: boolean;
    knobDraggable: boolean;
    onMouseDown: () => void;
    children: JSX.Element | null;
}
