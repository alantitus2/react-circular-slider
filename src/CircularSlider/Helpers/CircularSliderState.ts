export interface ICircularSliderState {
    degrees: number;
    mounted: boolean;
    isDragging: boolean;
    radius: number;
    labelValue: number;
    adjustedData: any[]; 
    radians: number;
    offset: number;
    knob_x: number;
    knob_y: number;
    dashFullArray: number;
    dashFullOffset: number;
    knobDraggable: boolean;
    lockDashOffset: number | undefined;
}
