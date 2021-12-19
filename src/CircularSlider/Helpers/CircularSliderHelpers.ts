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
        const offsetRadians = radians + Constants.knobOffset[knobPosition];

        let degrees =
            (offsetRadians > 0 ? offsetRadians : 2 * Math.PI + offsetRadians) *
            (Constants.spreadDegrees / (2 * Math.PI));

        return degrees;
    }

    public static GetInitialState(
        width: number,
        data: never[],
        knobPosition: string,
        direction: number
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
            knobInputPosition: knobPosition,
            knob_x: 0,
            knob_y: 0,
            dashFullArray: 0,
            dashFullOffset: 0,
        };
    }

    public static GetInitialRadians(inputPosition: string) {
        return Math.PI / 2 - Constants.knobOffset[inputPosition];
    }
}
