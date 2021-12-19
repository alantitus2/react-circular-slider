export interface CircularSliderState {
    mounted: boolean;
    isDragging: boolean;
    width: number;
    radius: number;
    knobPosition: string;
    label: number;
    data: never[];
    radians: number;
    offset: number;
    knob: {
        x: number;
        y: number;
    };
    dashFullArray: number;
    dashFullOffset: number;
}
