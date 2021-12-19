export interface CircularSliderState {
    mounted: boolean;
    isDragging: boolean;
    width: number;
    radius: number;
    knobPosition: string;
    label: number;
    data: any[];
    radians: number;
    offset: number;
    coordinates: {
        x: number;
        y: number;
    };
    dashFullArray: number;
    dashFullOffset: number;
}
