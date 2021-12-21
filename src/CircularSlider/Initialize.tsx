import React, { useEffect } from "react";
import { EActionType } from "./Helpers/redux/EActionType";
import { ReducerAction } from "./Helpers/redux/ReducerAction";
import { CircularSliderHelpers as Helpers } from "./Helpers/CircularSliderHelpers";
import { ICircularSliderProps } from "./Helpers/CircularSliderProps";

export function InitializeCircularSlider(
    dispatch: React.Dispatch<ReducerAction>,
    props: ICircularSliderProps,
    svgFullPath: React.MutableRefObject<SVGPathElement | null>
) {
    useEffect(() => {
        dispatch({
            type: EActionType.initialize,
            payload: {
                mounted: true,
                adjustedSegmentData: props.segment.segmentData.length
                    ? [...props.segment.segmentData]
                    : [...Helpers.GenerateRange(0, 360)],
                trackLength: svgFullPath?.current?.getTotalLength
                    ? svgFullPath.current.getTotalLength()
                    : 0,
            },
        });
        // eslint-disable-next-line
    }, []);
}
