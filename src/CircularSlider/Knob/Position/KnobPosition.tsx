import React from "react";
import { EActionType } from "../../../redux/EActionType";
import { ICircularSliderState } from "../../Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "../../Helpers/CircularSliderHelpers";
import { ReducerAction } from "../../../redux/ReducerAction";
import { CircularSliderConstants as Constants } from "../../Helpers/CircularSliderConstants";
import { ICircularSliderProps } from "../../Helpers/CircularSliderProps";

export function AdjustKnobPosition(
    state: ICircularSliderState,
    props: ICircularSliderProps,
    radians: any,
    dispatch: React.Dispatch<ReducerAction>
) {
    const adjustedRadius = state.radius - props.trackSize / 2;

    let degrees = Helpers.GetDegrees(
        radians,
        props.knob.position,
        props.knobOffset
    );

    if (props.lockDashOffset !== undefined && degrees > props.lockDashOffset) {
        return;
    }

    // change direction
    const dashOffset =
        (degrees / Constants.spreadDegrees) * state.dashFullArray;

    degrees =
        Helpers.GetSliderRotation(props.direction) === -1
            ? Constants.spreadDegrees - degrees
            : degrees;

    const pointsInCircle = (state.adjustedData.length - 1) / Constants.spreadDegrees;

    const currentPoint = Math.round(degrees * pointsInCircle);

    if (state.adjustedData[currentPoint] !== state.labelValue) {
        // props callback for parent
        props.onChange(state.adjustedData[currentPoint]);
    }

    DispatchSetKnobPosition(
        dispatch,
        degrees,
        dashOffset,
        state,
        currentPoint,
        adjustedRadius,
        radians,
        props
    );
}

function DispatchSetKnobPosition(
    dispatch: React.Dispatch<ReducerAction>,
    degrees: number,
    dashOffset: number,
    state: ICircularSliderState,
    currentPoint: number,
    adjustedRadius: number,
    radians: any,
    props: ICircularSliderProps
) {
    dispatch({
        type: EActionType.setKnobPosition,
        payload: {
            degrees,
            dashFullOffset:
                Helpers.GetSliderRotation(props.direction) === -1
                    ? dashOffset
                    : state.dashFullArray - dashOffset,
            labelValue: state.adjustedData[currentPoint],
            knob_x: adjustedRadius * Math.cos(radians) + adjustedRadius,
            knob_y: adjustedRadius * Math.sin(radians) + adjustedRadius,
        },
    });
}
