import { CircularSliderConstants as Constants } from "./CircularSliderConstants";
export abstract class CircularSliderHelpers {
    public static getRadians = (degrees) => {
        return (degrees * Math.PI) / 180;
    };

    public static getSliderRotation = (number) => {
        if (number < 0) return -1;
        return 1;
    };

    public static generateRange = (min, max) => {
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
}
