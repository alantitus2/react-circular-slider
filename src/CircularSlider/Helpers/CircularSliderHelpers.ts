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
        restrictKnob: boolean,
        knobMinDegrees: number,
        knobMaxDegrees: number
    ): CircularSliderState {
        return {
            degrees: 0,
            mounted: false,
            isDragging: false,
            width: width,
            radius: width / 2,
            label: 0,
            data: data,
            radians: 0,
            offset: 0,
            knob: {
                inputPosition: knobPosition,
                coordinates: {
                    x: 0,
                    y: 0,
                },
                restrictKnob,
                minDegrees: knobMinDegrees,
                maxDegrees: knobMaxDegrees,
            },
            dashFullArray: 0,
            dashFullOffset: 0,
        };
    }

    public static GetInitialRadians(inputPosition: string) {
        return Math.PI / 2 - Constants.knobOffset[inputPosition];
    }
}
