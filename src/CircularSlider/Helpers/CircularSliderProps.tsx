export interface ICircularSliderProps {
    width: number;
    direction: number;
    segment: ISegmentProps;
    labelColor: string;
    labelBottom: boolean;
    labelFontSize: string;
    valueFontSize: string;
    appendToValue: string;
    prependToValue: string;
    verticalOffset: string;
    hideLabelValue: boolean;
    knobDraggable: boolean; // TODO: Move to segment
    progressColorFrom: string;
    progressColorTo: string;
    progressSize: number;
    trackColor: string;
    trackSize: number;
    progressLineCap: string;
    renderLabelValue: null | JSX.Element;
    children: JSX.Element | null;
}

export interface ISegmentProps {
    arcStartOffsetDegrees: number;
    arcLengthDegrees: number | undefined;
    knobColor: string;
    knobSize: number;
    knobOffsetIndex: number;
    knobHidden: boolean;
    knobOnChange: (value: any) => void;
    segmentName: string;
    segmentData: any[];
}

export function GetInitializedProps(
    options: Partial<ICircularSliderProps>,
    segment?: Partial<ISegmentProps>
): ICircularSliderProps {
    return {
        width: options.width ?? 300,
        direction: options.direction ?? 1,
        segment: {
            arcStartOffsetDegrees: segment?.arcStartOffsetDegrees ?? 0,
            arcLengthDegrees: segment?.arcLengthDegrees ?? undefined,
            knobColor: segment?.knobColor ?? "#4e63ea",
            knobSize: segment?.knobSize ?? 76,
            knobOffsetIndex: segment?.knobOffsetIndex ?? 0,
            knobHidden: segment?.knobHidden ?? false,
            knobOnChange: segment?.knobOnChange ?? ((value) => {}),
            segmentName: segment?.segmentName ?? "segmentName unknown",
            segmentData: segment?.segmentData ?? [],
        },
        labelColor: options.labelColor ?? "#272b77",
        labelBottom: options.labelBottom ?? false,
        labelFontSize: options.labelFontSize ?? "1rem",
        valueFontSize: options.valueFontSize ?? "3rem",
        appendToValue: options.appendToValue ?? "",
        prependToValue: options.prependToValue ?? "",
        verticalOffset: options.verticalOffset ?? "1.5rem",
        hideLabelValue: options.hideLabelValue ?? false,
        knobDraggable: options.knobDraggable ?? true,
        progressColorFrom: options.progressColorFrom ?? "#80C3F3",
        progressColorTo: options.progressColorTo ?? "#4990E2",
        progressSize: options.progressSize ?? 24,
        trackColor: options.trackColor ?? "#DDDEFB",
        trackSize: options.trackSize ?? 24,
        progressLineCap: options.progressLineCap ?? "round",
        renderLabelValue: options.renderLabelValue ?? null,
        children: options.children ?? null,
    };
}
