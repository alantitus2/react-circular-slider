import React from "react";
import { CircularSliderState } from "../Helpers/CircularSliderState";
import Labels from "./Labels/Labels";

export function DrawLabels(
    label: string,
    labelColor: string,
    labelBottom: boolean,
    labelFontSize: string,
    verticalOffset: string,
    valueFontSize: string,
    appendToValue: string,
    prependToValue: string,
    hideLabelValue: boolean,
    state: CircularSliderState): React.ReactNode {
    return (
        <Labels
            label={label}
            labelColor={labelColor}
            labelBottom={labelBottom}
            labelFontSize={labelFontSize}
            verticalOffset={verticalOffset}
            valueFontSize={valueFontSize}
            appendToValue={appendToValue}
            prependToValue={prependToValue}
            hideLabelValue={hideLabelValue}
            value={`${state.label}`} />
    );
}
