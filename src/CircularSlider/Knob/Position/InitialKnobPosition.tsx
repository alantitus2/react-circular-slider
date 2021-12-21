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

        const knobOffsetIndex =
            props.knobOffsetIndex > dataArrayLength - 1
                ? dataArrayLength - 1
                : props.knobOffsetIndex;

        if (!!dataArrayLength) {
            const singlePointLengthDegrees =
                Constants.spreadDegrees / dataArrayLength;

            const initialOffsetRadians =
                Helpers.GetRadiansFromDegrees(singlePointLengthDegrees) / 2;

            DispatchSetInitialKnobPosition(
                dispatch,
                props.knob.position,
                props.knob.arcOffset
            );

            if (knobOffsetIndex) {
                const degrees =
                    Helpers.GetSliderRotation(props.direction) *
                    knobOffsetIndex *
                    singlePointLengthDegrees;

                const radians =
                    Helpers.GetRadiansFromDegrees(degrees) -
                    Helpers.GetKnobOffsetInRadians(
                        props.knob.position,
                        props.knob.arcOffset
                    );

                AdjustKnobPosition(
                    radians +
                        initialOffsetRadians *
                            Helpers.GetSliderRotation(props.direction)
                );

                return;
            } else {
                const radians =
                    -(
                        Helpers.GetKnobOffsetInRadians(
                            props.knob.position,
                            props.knob.arcOffset
                        ) * Helpers.GetSliderRotation(props.direction)
                    ) +
                    initialOffsetRadians *
                        Helpers.GetSliderRotation(props.direction);

                AdjustKnobPosition(radians);
                return;
            }
        }

        // eslint-disable-next-line
    }, [
        state.knobDashFullArray,
        props.knob.position,
        state.adjustedData.length,
        props.knobOffsetIndex,
        props.direction,
    ]);
}

function DispatchSetInitialKnobPosition(
    dispatch: React.Dispatch<ReducerAction>,
    knobPosition: string,
    knobOffset: number
) {
    dispatch({
        type: EActionType.setInitialKnobPosition,
        payload: {
            arcOffsetInRadians: Helpers.GetInitialRadians(
                knobPosition,
                knobOffset
            ),
        },
    });
}
