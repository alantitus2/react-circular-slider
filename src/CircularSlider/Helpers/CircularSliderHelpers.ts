import { CircularSliderConstants as Constants } from "./CircularSliderConstants";
import { CircularSliderState } from "./CircularSliderState";
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

    public static GetDegrees(radians: any, knobPosition: string) {
        const offsetRadians = radians + this.GetKnobOffset(knobPosition);

        let degrees =
            (offsetRadians > 0 ? offsetRadians : 2 * Math.PI + offsetRadians) *
            (Constants.spreadDegrees / (2 * Math.PI));

        return degrees;
    }

    public static GetInitialState(
        width: number,
        data: never[],
        knobPosition: string,
        direction: number,
        trackSize: number,
        knobDraggable: boolean
    ): CircularSliderState {
        return {
            degrees: 0,
            direction,
            mounted: false,
            isDragging: false,
            width: width,
            radius: width / 2,
            label: 0,
            data: data,
            radians: 0,
            offset: 0,
            knobPosition: knobPosition,
            knob_x: 0,
            knob_y: 0,
            dashFullArray: 0,
            dashFullOffset: 0,
            trackSize,
            knobDraggable,
        };
    }

    public static GetInitialRadians(knobPosition: string) {
        return Math.PI / 2 - this.GetKnobOffset(knobPosition);
    }

    public static GetOffsetRelativeToDocument(ref, isServer) {
        const rect = ref.current.getBoundingClientRect();

        const scrollLeft =
            !isServer &&
            ((window?.pageXOffset ?? 0) ||
                (document?.documentElement?.scrollLeft ?? 0));

        const scrollTop =
            !isServer &&
            ((window?.pageYOffset ?? 0) ||
                (document?.documentElement?.scrollTop ?? 0));

        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
        };
    }

    public static GetKnobOffset(knobPosition: string) {
        if (knobPosition === "top") {
            const degrees = 90;
            return CircularSliderHelpers.GetRadiansFromDegrees(degrees);
        }
        if (knobPosition === "right") {
            const degrees = 0;
            return CircularSliderHelpers.GetRadiansFromDegrees(degrees);
        }
        if (knobPosition === "bottom") {
            const degrees = -90;
            return CircularSliderHelpers.GetRadiansFromDegrees(degrees);
        }

        const degrees = -180;
        return CircularSliderHelpers.GetRadiansFromDegrees(degrees);
    }
}
