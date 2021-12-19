import React from "react";
import { CircularSliderState } from "../Helpers/CircularSliderState";
import Path from "./Path/Path";

export function DrawPath(
    width: number,
    sanitizedLabel: string,
    direction: number,
    state: CircularSliderState,
    svgFullPath: React.MutableRefObject<any>,
    progressSize: number,
    progressColorFrom: string,
    progressColorTo: string,
    progressLineCap: string,
    trackColor: string,
    trackSize: number) {
    return (
        <Path
            width={width}
            label={sanitizedLabel}
            direction={direction}
            strokeDasharray={state.dashFullArray}
            strokeDashoffset={state.dashFullOffset}
            svgFullPath={svgFullPath}
            progressSize={progressSize}
            progressColorFrom={progressColorFrom}
            progressColorTo={progressColorTo}
            progressLineCap={progressLineCap}
            trackColor={trackColor}
            trackSize={trackSize}
            radiansOffset={state.radians} />
    );
}
