import { CSSProperties } from "react";


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
