import React, { useEffect } from "react";
import { EActionType } from "../../../redux/EActionType";
import { ReducerAction } from "../../../redux/ReducerAction";
import { CircularSliderConstants as Constants } from "../../Helpers/CircularSliderConstants";
import { CircularSliderHelpers as Helpers } from "../../Helpers/CircularSliderHelpers";
import { CircularSliderState } from "../../Helpers/CircularSliderState";

export function SetInitialKnobPosition(
    state: CircularSliderState,
    dataIndex: number,
    dispatch: React.Dispatch<ReducerAction>,
    knobPosition: string,
    direction: number,
    AdjustKnobPosition: (radians: any) => void
) {
    useEffect(() => {
        const dataArrayLength = state.data.length;

        const knobPositionIndex =
            dataIndex > dataArrayLength - 1 ? dataArrayLength - 1 : dataIndex;

        if (!!dataArrayLength) {
            const pointsInCircle = Constants.spreadDegrees / dataArrayLength;
            const offset = Helpers.GetRadiansFromDegrees(pointsInCircle) / 2;

            DispatchSetInitialKnobPosition(dispatch, knobPosition, offset);

            if (knobPositionIndex) {
                const degrees =
                    Helpers.GetSliderRotation(direction) *
                    knobPositionIndex *
                    pointsInCircle;

                const radians =
                    Helpers.GetRadiansFromDegrees(degrees) -
                    Constants.knobOffset[state.knobInputPosition];

                return AdjustKnobPosition(
                    radians + offset * Helpers.GetSliderRotation(direction)
                );
            }

            const radians =
                -(
                    Constants.knobOffset[state.knobInputPosition] *
                    Helpers.GetSliderRotation(direction)
                ) +
                offset * Helpers.GetSliderRotation(direction);

            AdjustKnobPosition(radians);
        }

        // eslint-disable-next-line
    }, [
        state.dashFullArray,
        state.knobInputPosition,
        state.data.length,
        dataIndex,
        direction,
    ]);
}

function DispatchSetInitialKnobPosition(
    dispatch: React.Dispatch<ReducerAction>,
    knobPosition: string,
    offset: number
) {
    dispatch({
        type: EActionType.setInitialKnobPosition,
        payload: {
            radians: Helpers.GetInitialRadians(knobPosition),
            offset,
        },
    });
}
