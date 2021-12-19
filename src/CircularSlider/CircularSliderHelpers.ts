import { CSSProperties } from "react";

export const CircularSliderConstants = {
    spreadDegrees: 360,
    knobOffset: {
        top: Math.PI / 2,
        right: 0,
        bottom: -Math.PI / 2,
        left: -Math.PI,
    },
};

export const CircularSliderStyles = {
    circularSlider: {
        position: "relative",
        display: "inline-block",
        opacity: 0,
        transition: "opacity 1s ease-in",
    } as CSSProperties,

    mounted: {
        opacity: 1,
    },
};
