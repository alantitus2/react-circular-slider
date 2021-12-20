export interface CircularSliderProps {
    label?: string | undefined;
    width?: number | undefined;
    direction?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
    knobColor?: string | undefined;
    knobSize?: number | undefined;
    knobPosition?: string | undefined;
    knobOffset?: number | undefined;
    labelColor?: string | undefined;
    labelBottom?: boolean | undefined;
    labelFontSize?: string | undefined;
    valueFontSize?: string | undefined;
    appendToValue?: string | undefined;
    prependToValue?: string | undefined;
    verticalOffset?: string | undefined;
    hideLabelValue?: boolean | undefined;
    hideKnob?: boolean | undefined;
    knobDraggable?: boolean | undefined;
    progressColorFrom?: string | undefined;
    progressColorTo?: string | undefined;
    progressSize?: number | undefined;
    trackColor?: string | undefined;
    trackSize?: number | undefined;
    data?: never[] | undefined;
    dataIndex?: number | undefined;
    progressLineCap?: string | undefined;
    renderLabelValue?: null | undefined;
    children?: JSX.Element | null | undefined;
    onChange?: ((value: any) => void) | undefined;
}
