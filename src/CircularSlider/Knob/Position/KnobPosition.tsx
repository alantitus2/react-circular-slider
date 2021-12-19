import React from "react";
import { EActionType } from "../../../redux/EActionType";
import { CircularSliderState } from "../../Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "../../Helpers/CircularSliderHelpers";
import { ReducerAction } from "../../../redux/ReducerAction";

export function DispatchSetKnobPosition(
    dispatch: React.Dispatch<ReducerAction>,
    degrees: number,
    dashOffset: number,
    state: CircularSliderState,
    currentPoint: number,
    adjustedRadius: number,
    radians: any
) {
    dispatch({
        type: EActionType.setKnobPosition,
        payload: {
            degrees,
            dashFullOffset:
                Helpers.GetSliderRotation(state.direction) === -1
                    ? dashOffset
                    : state.dashFullArray - dashOffset,
            label: state.data[currentPoint],
            knobInputPosition: state.knobInputPosition,
            knob_x: adjustedRadius * Math.cos(radians) + adjustedRadius,
            knob_y: adjustedRadius * Math.sin(radians) + adjustedRadius,
        },
    });
}
