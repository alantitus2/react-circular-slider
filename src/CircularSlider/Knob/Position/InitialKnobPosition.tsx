import React, { useEffect } from "react";
import { EActionType } from "../../Helpers/redux/EActionType";
import { ReducerAction } from "../../Helpers/redux/ReducerAction";
import { CircularSliderConstants as Constants } from "../../Helpers/CircularSliderConstants";
import { CircularSliderHelpers as Helpers } from "../../Helpers/CircularSliderHelpers";
import { ICircularSliderProps } from "../../Helpers/CircularSliderProps";
import { ICircularSliderState } from "../../Helpers/CircularSliderState";

export function SetInitialKnobPosition(
    state: ICircularSliderState,
    props: ICircularSliderProps,
    dispatch: React.Dispatch<ReducerAction>,
    AdjustKnobPosition: (radians: any) => void
) {
    useEffect(() => {
        const dataArrayLength = state.adjustedSegmentData.length;

        const knobOffsetIndex =
            props.segment.knobOffsetIndex > dataArrayLength - 1
                ? dataArrayLength - 1
                : props.segment.knobOffsetIndex;

        if (!!dataArrayLength) {
            const singlePointLengthDegrees = props.segment.arcLengthDegrees
                ? props.segment.arcLengthDegrees / dataArrayLength
                : Constants.spreadDegrees / dataArrayLength;

            const initialOffsetRadians =
                Helpers.GetRadiansFromDegrees(singlePointLengthDegrees) / 2;

            DispatchSetInitialKnobPosition(
                dispatch,
                props.segment.arcStartOffsetDegrees
            );

            if (knobOffsetIndex) {
                const degrees =
                    Helpers.GetSliderRotationDirection(props.direction) *
                    knobOffsetIndex *
                    singlePointLengthDegrees;

                const radians =
                    Helpers.GetRadiansFromDegrees(degrees) -
                    Helpers.GetKnobOffsetInRadians(
                        props.segment.arcStartOffsetDegrees
                    );

                AdjustKnobPosition(
                    radians +
                        initialOffsetRadians *
                            Helpers.GetSliderRotationDirection(props.direction)
                );

                return;
            } else {
                const radians =
                    -(
                        Helpers.GetKnobOffsetInRadians(
                            props.segment.arcStartOffsetDegrees
                        ) * Helpers.GetSliderRotationDirection(props.direction)
                    ) +
                    initialOffsetRadians *
                        Helpers.GetSliderRotationDirection(props.direction);

                AdjustKnobPosition(radians);
                return;
            }
        }

        // eslint-disable-next-line
    }, [
        state.trackLength,
        state.adjustedSegmentData.length,
        props.segment.knobOffsetIndex,
        props.direction,
    ]);
}

function DispatchSetInitialKnobPosition(
    dispatch: React.Dispatch<ReducerAction>,
    knobOffset: number
) {
    dispatch({
        type: EActionType.setInitialKnobPosition,
        payload: {
            arcLengthInRadians: Helpers.GetInitialRadians(knobOffset),
        },
    });
}
