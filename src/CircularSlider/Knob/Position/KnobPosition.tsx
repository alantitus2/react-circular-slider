import React from "react";
import { EActionType } from "../../../redux/EActionType";
import { CircularSliderState } from "../../Helpers/CircularSliderState";
import {
    CircularSliderHelpers as Helpers,
    CircularSliderHelpers,
} from "../../Helpers/CircularSliderHelpers";
import { ReducerAction } from "../../../redux/ReducerAction";

export function DispatchSetKnobPosition(
    dispatch: React.Dispatch<ReducerAction>,
    degrees: number,
    direction: number,
    dashOffset: number,
    state: CircularSliderState,
    currentPoint: number,
    radius: number,
    radians: any
) {
    dispatch({
        type: EActionType.setKnobPosition,
        payload: {
            degrees,
            dashFullOffset:
                Helpers.GetSliderRotation(direction) === -1
                    ? dashOffset
                    : state.dashFullArray - dashOffset,
            label: state.data[currentPoint],
            knobInputPosition: state.knobInputPosition,
            knob_x: radius * Math.cos(radians) + radius,
            knob_y: radius * Math.sin(radians) + radius,
        },
    });
}
