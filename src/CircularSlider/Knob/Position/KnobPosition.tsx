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
    const radius = props.width / 2;
    const adjustedRadius = radius - props.trackSize / 2;

    let degrees = Helpers.GetDegrees(
        radians,
        props.segment.knobPosition,
        props.segment.arcStartOffsetDegrees
    );

    if (
        props.segment.arcLengthDegrees !== undefined &&
        degrees > props.segment.arcLengthDegrees
    ) {
        return;
    }

    // change direction
    const dashOffset =
        (degrees / Constants.spreadDegrees) * state.knobDashFullArray;

    degrees =
        Helpers.GetSliderRotation(props.direction) === -1
            ? Constants.spreadDegrees - degrees
            : degrees;

    const pointsInCircle =
        (state.adjustedData.length - 1) / Constants.spreadDegrees;

    const currentPoint = Math.round(degrees * pointsInCircle);

    if (state.adjustedData[currentPoint] !== state.labelValue) {
        // props callback for parent
        props.segment.knobOnChange(state.adjustedData[currentPoint]);
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
    knobDegrees: number,
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
            knobDegrees,
            knobDashFullOffset:
                Helpers.GetSliderRotation(props.direction) === -1
                    ? dashOffset
                    : state.knobDashFullArray - dashOffset,
            labelValue: state.adjustedData[currentPoint],
            knob_x: adjustedRadius * Math.cos(radians) + adjustedRadius,
            knob_y: adjustedRadius * Math.sin(radians) + adjustedRadius,
        },
    });
}
