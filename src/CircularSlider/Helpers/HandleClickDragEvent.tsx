import React from "react";
import { ICircularSliderState } from "./CircularSliderState";
import { CircularSliderHelpers as Helpers } from "./CircularSliderHelpers";

export function HandleClickDragEvent(
    event: any,
    containerRef: React.MutableRefObject<HTMLDivElement | null>,
    isServer: boolean,
    state: ICircularSliderState,
    AdjustKnobPositionMemoized: (radians: any) => void) {
    event.preventDefault();
    let touch;

    if (event.type === "touchmove") {
        touch = event.changedTouches[0];
    }

    const mouseXFromCenter = (event.type === "touchmove" ? touch.pageX : event.pageX) -
        (Helpers.GetOffsetRelativeToDocument(containerRef, isServer).left +
            state.radius);

    const mouseYFromCenter = (event.type === "touchmove" ? touch.pageY : event.pageY) -
        (Helpers.GetOffsetRelativeToDocument(containerRef, isServer).top +
            state.radius);

    const radians = Math.atan2(mouseYFromCenter, mouseXFromCenter);
    AdjustKnobPositionMemoized(radians);
}
