export interface ICircularSliderState {
    knobDegrees: number;
    mounted: boolean;
    isDragging: boolean;
    labelValue: number;
    adjustedSegmentData: any[]; 
    arcOffsetInRadians: number;
    knob_x: number;
    knob_y: number;
    knobDashFullArray: number;
    knobDashFullOffset: number;
}
