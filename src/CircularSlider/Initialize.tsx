import React, { useEffect } from "react";
import { EActionType } from "../redux/EActionType";
import { CircularSliderState } from "./Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "./Helpers/CircularSliderHelpers";
import { ReducerAction } from "../redux/ReducerAction";

export function Initialize(
    dispatch: React.Dispatch<ReducerAction>,
    state: CircularSliderState,
    min: number,
    max: number,
    svgFullPath: React.MutableRefObject<SVGPathElement | null>
) {
    useEffect(() => {
        dispatch({
            type: EActionType.initialize,
            payload: {
                mounted: true,
                data: state.data.length
                    ? [...state.data]
                    : [...Helpers.GenerateRange(min, max)],
                dashFullArray: svgFullPath?.current?.getTotalLength
                    ? svgFullPath.current.getTotalLength()
                    : 0,
            },
        });
        // eslint-disable-next-line
    }, [max, min]);
}
