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
}
