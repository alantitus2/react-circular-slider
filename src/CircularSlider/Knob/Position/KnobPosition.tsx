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

    let knobDegreesFromArcStart = Helpers.GetDegrees(
        radians,
        props.segment.arcStartOffsetDegrees
    );

    const isKnobOutOfBounds =
        props.segment.arcLengthDegrees !== undefined &&
        (knobDegreesFromArcStart < 0 ||
            knobDegreesFromArcStart > props.segment.arcLengthDegrees);

    if (isKnobOutOfBounds) {
        return;
    }

    // change direction
    const dashOffset =
        (knobDegreesFromArcStart / Constants.spreadDegrees) * state.trackLength;

    knobDegreesFromArcStart =
        Helpers.GetSliderRotationDirection(props.direction) === -1
            ? Constants.spreadDegrees - knobDegreesFromArcStart
            : knobDegreesFromArcStart;

    const maxRotationInDegrees =
        props.segment.arcLengthDegrees ?? Constants.spreadDegrees;

    const pointsInCircle =
        (state.adjustedSegmentData.length - 1) / maxRotationInDegrees;

    const currentPoint = Math.round(knobDegreesFromArcStart * pointsInCircle);
    const newLabelValue = state.adjustedSegmentData[currentPoint];

    if (newLabelValue !== state.labelValue) {
        // props callback for parent
        props.segment.knobOnChange(state.adjustedSegmentData[currentPoint]);
    }

    DispatchSetKnobPosition(
        dispatch,
        knobDegreesFromArcStart,
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
    knobDegreesFromArcStart: number,
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
            knobDegreesFromArcStart,
            arcOffsetFromTrack:
                Helpers.GetSliderRotationDirection(props.direction) === -1
                    ? dashOffset
                    : state.trackLength - dashOffset,
            labelValue: state.adjustedSegmentData[currentPoint],
            knob_x: adjustedRadius * Math.cos(radians) + adjustedRadius,
            knob_y: adjustedRadius * Math.sin(radians) + adjustedRadius,
        },
    });
}
