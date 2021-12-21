import React from "react";
import { CircularSliderHelpers as Helpers } from "./CircularSliderHelpers";
import { ICircularSliderProps } from "./CircularSliderProps";

export function HandleClickDragEvent(
    event: any,
    containerRef: React.MutableRefObject<HTMLDivElement | null>,
    isServer: boolean,
    props: ICircularSliderProps,
    AdjustKnobPositionMemoized: (radians: any) => void) {
    event.preventDefault();
    let touch;

    if (event.type === "touchmove") {
        touch = event.changedTouches[0];
    }
    
    const radius = props.width / 2;

    const mouseXFromCenter = (event.type === "touchmove" ? touch.pageX : event.pageX) -
        (Helpers.GetOffsetRelativeToDocument(containerRef, isServer).left +
            radius);

    const mouseYFromCenter = (event.type === "touchmove" ? touch.pageY : event.pageY) -
        (Helpers.GetOffsetRelativeToDocument(containerRef, isServer).top +
            radius);

    const radians = Math.atan2(mouseYFromCenter, mouseXFromCenter);
    AdjustKnobPositionMemoized(radians);
}
