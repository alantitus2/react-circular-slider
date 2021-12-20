import React from "react";
import { ICircularSliderProps } from "../Helpers/CircularSliderProps";
import { ICircularSliderState } from "../Helpers/CircularSliderState";
import Labels from "./Labels/Labels";

export function DrawLabels({
    props,
    state,
}: {
    props: ICircularSliderProps;
    state: ICircularSliderState;
}) {
    if (props.renderLabelValue) {
        return <span>{props.renderLabelValue}</span>;
    }

    return (
        <Labels
            label={props.label}
            labelColor={props.labelColor}
            labelBottom={props.labelBottom}
            labelFontSize={props.labelFontSize}
            verticalOffset={props.verticalOffset}
            valueFontSize={props.valueFontSize}
            appendToValue={props.appendToValue}
            prependToValue={props.prependToValue}
            hideLabelValue={props.hideLabelValue}
            value={`${state.labelValue}`}
        />
    );
}
