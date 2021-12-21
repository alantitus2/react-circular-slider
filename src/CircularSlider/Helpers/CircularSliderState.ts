export interface ICircularSliderState {
    knobDegreesFromArcStart: number;
    mounted: boolean;
    isDragging: boolean; // TODO: move to segment
    labelValue: number;
    adjustedSegmentData: any[]; 
    arcLengthInRadians: number;
    knob_x: number;
    knob_y: number;
    trackLength: number;
    arcOffsetFromTrack: number;
}
