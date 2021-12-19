import React from "react";
import Knob from "./Knob/Knob";
import { CircularSliderState } from "../Helpers/CircularSliderState";

export function DrawKnob(
    state: CircularSliderState,
    knobSize: number,
    knobColor: string,
    trackSize: number,
    hideKnob: boolean,
    knobDraggable: boolean,
    onMouseDown: () => void,
    children: null) {
    return (
        <Knob
            isDragging={state.isDragging}
            knobPosition={{
                x: state.knob.coordinates.x,
                y: state.knob.coordinates.y,
            }}
            knobSize={knobSize}
            knobColor={knobColor}
            trackSize={trackSize}
            hideKnob={hideKnob}
            knobDraggable={knobDraggable}
            onMouseDown={onMouseDown}
        >
            {children}
        </Knob>
    );
}
