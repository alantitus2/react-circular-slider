import React, { useEffect } from "react";
import { EActionType } from "./redux/EActionType";
import { ReducerAction } from "./redux/ReducerAction";
import { CircularSliderHelpers as Helpers } from "./CircularSliderHelpers";
import { ICircularSliderProps } from "./CircularSliderProps";

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
