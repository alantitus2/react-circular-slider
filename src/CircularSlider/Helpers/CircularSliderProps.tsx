export interface ICircularSliderProps {
    label: string;
    width: number;
    direction: number;
    min: number;
    max: number;
    segment: ISegmentProps;
    labelColor: string;
    labelBottom: boolean;
    labelFontSize: string;
    valueFontSize: string;
    appendToValue: string;
    prependToValue: string;
    verticalOffset: string;
    hideLabelValue: boolean;
    hideKnob: boolean;
    knobDraggable: boolean;
    progressColorFrom: string;
    progressColorTo: string;
    progressSize: number;
    trackColor: string;
    trackSize: number;
    data: never[];
    knobOffsetIndex: number;
    progressLineCap: string;
    renderLabelValue: null | JSX.Element;
    children: JSX.Element | null;
    onChange: (value: any) => void;
    arcLengthDegrees: number | undefined;
}

export interface ISegmentProps {
    knobColor: string;
    knobSize: number;
    knobPosition: string;
    arcStartOffsetDegrees: number;
}

export function GetInitializedProps(
    options: Partial<ICircularSliderProps>,
    knob?: Partial<ISegmentProps>
): ICircularSliderProps {
    return {
        label: options.label ?? "ANGLE",
        width: options.width ?? 300,
        direction: options.direction ?? 1,
        min: options.min ?? 0,
        max: options.max ?? 360,
        segment: {
            knobColor: knob?.knobColor ?? "#4e63ea",
            knobSize: knob?.knobSize ?? 48,
            knobPosition: knob?.knobPosition ?? "top",
            arcStartOffsetDegrees: knob?.arcStartOffsetDegrees ?? 0,
        },
        labelColor: options.labelColor ?? "#272b77",
        labelBottom: options.labelBottom ?? false,
        labelFontSize: options.labelFontSize ?? "1rem",
        valueFontSize: options.valueFontSize ?? "3rem",
        appendToValue: options.appendToValue ?? "",
        prependToValue: options.prependToValue ?? "",
        verticalOffset: options.verticalOffset ?? "1.5rem",
        hideLabelValue: options.hideLabelValue ?? true,
        hideKnob: options.hideKnob ?? false,
        knobDraggable: options.knobDraggable ?? true,
        progressColorFrom: options.progressColorFrom ?? "#80C3F3",
        progressColorTo: options.progressColorTo ?? "#4990E2",
        progressSize: options.progressSize ?? 24,
        trackColor: options.trackColor ?? "#DDDEFB",
        trackSize: options.trackSize ?? 24,
        data: options.data ?? [],
        knobOffsetIndex: options.knobOffsetIndex ?? 0,
        progressLineCap: options.progressLineCap ?? "round",
        renderLabelValue: options.renderLabelValue ?? null,
        children: options.children ?? null,
        onChange: options.onChange ?? ((value) => {}),
        arcLengthDegrees: options.arcLengthDegrees ?? undefined,
    };
}
