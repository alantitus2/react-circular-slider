import React from "react";
import { EActionType } from "../../../redux/EActionType";
import { ICircularSliderState } from "../../Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "../../Helpers/CircularSliderHelpers";
import { ReducerAction } from "../../../redux/ReducerAction";
import { CircularSliderConstants as Constants } from "../../Helpers/CircularSliderConstants";

export function AdjustKnobPosition(
    state: ICircularSliderState,
    radians: any,
    onChange: (value: any) => void,
    dispatch: React.Dispatch<ReducerAction>
) {
    const adjustedRadius = state.radius - state.trackSize / 2;

    let degrees = Helpers.GetDegrees(
        radians,
        state.knobPosition,
        state.knobOffset
    );

    if (state.lockDashOffset !== undefined && degrees > state.lockDashOffset) {
        return;
    }

    // change direction
    const dashOffset =
        (degrees / Constants.spreadDegrees) * state.dashFullArray;

    degrees =
        Helpers.GetSliderRotation(state.direction) === -1
            ? Constants.spreadDegrees - degrees
            : degrees;

    const pointsInCircle = (state.data.length - 1) / Constants.spreadDegrees;

    const currentPoint = Math.round(degrees * pointsInCircle);

    if (state.data[currentPoint] !== state.label) {
        // props callback for parent
        onChange(state.data[currentPoint]);
    }

    DispatchSetKnobPosition(
        dispatch,
        degrees,
        dashOffset,
        state,
        currentPoint,
        adjustedRadius,
        radians
    );
}

function DispatchSetKnobPosition(
    dispatch: React.Dispatch<ReducerAction>,
    degrees: number,
    dashOffset: number,
    state: ICircularSliderState,
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
            knobPosition: state.knobPosition,
            knob_x: adjustedRadius * Math.cos(radians) + adjustedRadius,
            knob_y: adjustedRadius * Math.sin(radians) + adjustedRadius,
        },
    });
}
