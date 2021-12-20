import React, { useEffect } from "react";
import { EActionType } from "../../../redux/EActionType";
import { ReducerAction } from "../../../redux/ReducerAction";
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
        const dataArrayLength = state.adjustedData.length;

        const knobPositionIndex =
            props.dataIndex > dataArrayLength - 1 ? dataArrayLength - 1 : props.dataIndex;

        if (!!dataArrayLength) {
            const pointsInCircle = Constants.spreadDegrees / dataArrayLength;
            const offset = Helpers.GetRadiansFromDegrees(pointsInCircle) / 2;

            DispatchSetInitialKnobPosition(dispatch, props.knobPosition, props.knobOffset, offset);

            if (knobPositionIndex) {
                const degrees =
                    Helpers.GetSliderRotation(props.direction) *
                    knobPositionIndex *
                    pointsInCircle;

                const radians =
                    Helpers.GetRadiansFromDegrees(degrees) -
                    Helpers.GetKnobOffsetInRadians(props.knobPosition, props.knobOffset);

                return AdjustKnobPosition(
                    radians + offset * Helpers.GetSliderRotation(props.direction)
                );
            }

            const radians =
                -(
                    Helpers.GetKnobOffsetInRadians(state.knobPosition, state.knobOffset) *
                    Helpers.GetSliderRotation(props.direction)
                ) +
                offset * Helpers.GetSliderRotation(props.direction);

            AdjustKnobPosition(radians);
        }

        // eslint-disable-next-line
    }, [
        state.dashFullArray,
        state.knobPosition,
        state.adjustedData.length,
        props.dataIndex,
        props.direction,
    ]);
}

function DispatchSetInitialKnobPosition(
    dispatch: React.Dispatch<ReducerAction>,
    knobPosition: string,
    knobOffset: number,
    offset: number,
) {
    dispatch({
        type: EActionType.setInitialKnobPosition,
        payload: {
            radians: Helpers.GetInitialRadians(knobPosition, knobOffset),
            offset,
        },
    });
}
