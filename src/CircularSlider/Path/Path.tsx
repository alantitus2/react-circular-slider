import React from "react";
import Svg from "../../Svg";
import { CircularSliderState } from "../Helpers/CircularSliderState";

export function Path(
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
        <Svg
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
