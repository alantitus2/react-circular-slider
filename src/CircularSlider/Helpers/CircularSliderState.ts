export interface ICircularSliderState {
    degrees: number;
    mounted: boolean;
    isDragging: boolean;
    radius: number;
    label: number;
    adjustedData: any[]; 
    radians: number;
    offset: number;
    knobPosition: string;
    knobOffset: number;
    knob_x: number;
    knob_y: number;
    dashFullArray: number;
    dashFullOffset: number;
    trackSize: number;
    knobDraggable: boolean;
    lockDashOffset: number | undefined;
}
