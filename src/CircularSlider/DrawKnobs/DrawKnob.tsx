import React from "react";
import { ICircularSliderProps } from "../Helpers/CircularSliderProps";
import { ICircularSliderState } from "../Helpers/CircularSliderState";
import Knob from "./Knob/Knob";

export function DrawKnobs({
    state,
    props,
    onMouseDown,
}: {
    state: ICircularSliderState;
    props: ICircularSliderProps;
    onMouseDown: () => void;
}) {
    return (
        <span>
            <Knob
                isDragging={state.isDragging}
                knobCoordinates={{
                    x: state.knob_x,
                    y: state.knob_y,
                }}
                knobSize={props.knobSize}
                knobColor={props.knobColor}
                trackSize={props.trackSize}
                hideKnob={props.hideKnob}
                knobDraggable={props.knobDraggable}
                onMouseDown={onMouseDown}
            >
                {props.children}
            </Knob>
        </span>
    );
}
