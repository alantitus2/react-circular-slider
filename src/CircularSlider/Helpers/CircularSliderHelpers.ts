import { CircularSliderConstants as Constants } from "./CircularSliderConstants";
import { ICircularSliderProps } from "./CircularSliderProps";
import { ICircularSliderState } from "./CircularSliderState";
export abstract class CircularSliderHelpers {
    public static GetRadiansFromDegrees = (degrees) => {
        return (degrees * Math.PI) / 180;
    };

    public static GetSliderRotation = (number) => {
        if (number < 0) return -1;
        return 1;
    };

    public static GenerateRange = (min, max) => {
        let rangeOfNumbers: number[] = [];

        for (let i = min; i <= max; i++) {
            rangeOfNumbers.push(i);
        }

        return rangeOfNumbers;
    };

    public static GetDegrees(
        radians: any,
        knobPosition: string,
        knobOffset: number
    ) {
        const offsetRadians =
            radians + this.GetKnobOffsetInRadians(knobPosition, knobOffset);

        let degrees =
            (offsetRadians > 0 ? offsetRadians : 2 * Math.PI + offsetRadians) *
            (Constants.spreadDegrees / (2 * Math.PI));

        return degrees;
    }

    public static GetSliderEvents(isServer: boolean) {
        const touchSupported = !isServer && "ontouchstart" in window;

        return {
            up: touchSupported ? "touchend" : "mouseup",
            move: touchSupported ? "touchmove" : "mousemove",
        };
    }

    public static GetInitialState(
        props: ICircularSliderProps
    ): ICircularSliderState {
        return {
            mounted: false,
            isDragging: false,
            radius: props.width / 2,
            labelValue: 0,
            adjustedData: props.data,
            radians: 0,
            knobDegrees: 0,
            knob_x: 0,
            knob_y: 0,
            knobDashFullArray: 0,
            knobDashFullOffset: 0,
        };
    }

    public static GetInitialRadians(knobPosition: string, knobOffset: number) {
        return (
            Math.PI / 2 - this.GetKnobOffsetInRadians(knobPosition, knobOffset)
        );
    }

    public static GetOffsetRelativeToDocument(
        containerRef: React.MutableRefObject<HTMLDivElement | null>,
        isServer: boolean
    ) {
        const rect = containerRef?.current?.getBoundingClientRect();

        const scrollLeft = isServer
            ? 0
            : !isServer &&
            ((window?.pageXOffset ?? 0) ||
                (document?.documentElement?.scrollLeft ?? 0));

        const scrollTop = isServer
            ? 0
            : !isServer &&
            ((window?.pageYOffset ?? 0) ||
                (document?.documentElement?.scrollTop ?? 0));

        return {
            top: rect!.top + scrollTop,
            left: rect!.left + scrollLeft,
        };
    }

    public static GetKnobOffsetInRadians(
        knobPosition: string,
        knobOffset: number
    ) {
        let result = 0;

        if (knobPosition === "top") {
            result = CircularSliderHelpers.GetRadiansFromDegrees(
                90 - knobOffset
            );
        }
        if (knobPosition === "right") {
            result = CircularSliderHelpers.GetRadiansFromDegrees(
                0 - knobOffset
            );
        }
        if (knobPosition === "bottom") {
            result = CircularSliderHelpers.GetRadiansFromDegrees(
                -90 - knobOffset
            );
        }
        if (knobPosition === "left") {
            result = CircularSliderHelpers.GetRadiansFromDegrees(
                180 - knobOffset
            );
        }

        return result;
    }
}
