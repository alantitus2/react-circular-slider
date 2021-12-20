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
            <Knob {...{ state, props, onMouseDown }}>{props.children}</Knob>
        </span>
    );
}
