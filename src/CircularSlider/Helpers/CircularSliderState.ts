export interface CircularSliderState {
    mounted: boolean;
    isDragging: boolean;
    width: number;
    radius: number;
    label: number;
    data: any[];
    radians: number;
    offset: number;
    knob: {
        inputPosition: string;
        coordinates: {
            x: number;
            y: number;
        },
        maxDegrees: number;
    };
    dashFullArray: number;
    dashFullOffset: number;
}
