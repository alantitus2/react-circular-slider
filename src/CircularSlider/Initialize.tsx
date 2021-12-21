import React, { useEffect } from "react";
import { EActionType } from "../redux/EActionType";
import { ReducerAction } from "../redux/ReducerAction";
import { CircularSliderHelpers as Helpers } from "./Helpers/CircularSliderHelpers";
import { ICircularSliderProps } from "./Helpers/CircularSliderProps";

export function Initialize(
    dispatch: React.Dispatch<ReducerAction>,
    props: ICircularSliderProps,
    min: number,
    max: number,
    svgFullPath: React.MutableRefObject<SVGPathElement | null>
) {
    useEffect(() => {
        dispatch({
            type: EActionType.initialize,
            payload: {
                mounted: true,
                adjustedData: props.data.length
                    ? [...props.data]
                    : [...Helpers.GenerateRange(min, max)],
                knobDashFullArray: svgFullPath?.current?.getTotalLength
                    ? svgFullPath.current.getTotalLength()
                    : 0,
            },
        });
        // eslint-disable-next-line
    }, [max, min]);
}
