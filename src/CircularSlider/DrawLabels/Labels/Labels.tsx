import React, { CSSProperties } from "react";
import { ICircularSliderProps } from "../../Helpers/CircularSliderProps";
import { ICircularSliderState } from "../../Helpers/CircularSliderState";

const Labels = ({
    props,
    state,
}: {
    props: ICircularSliderProps;
    state: ICircularSliderState;
}) => {
    if (!state.isDragging) {
        return <span />;
    }

    if (props.renderLabelValue) {
        return <span>{props.renderLabelValue}</span>;
    }

    const styles = {
        labels: {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: `${props.labelColor}`,
            userSelect: "none",
            zIndex: 1,
        } as CSSProperties,

        value: {
            fontSize: `${props.valueFontSize}`,
            position: "relative",
        } as CSSProperties,

        bottomMargin: {
            marginBottom: `calc(${props.verticalOffset})`,
        },

        appended: {
            position: "absolute",
            right: "0",
            top: "0",
            transform: "translate(100%, 0)",
        } as CSSProperties,

        prepended: {
            position: "absolute",
            left: "0",
            top: "0",
            transform: "translate(-100%, 0)",
        } as CSSProperties,

        hide: {
            display: "none",
        },
    };

    return (
        <div
            style={{
                ...styles.labels,
                ...(props.hideLabelValue && styles.hide),
            }}
        >
            {props.labelBottom || (
                <div style={{ fontSize: props.labelFontSize }}>
                    {props.segment.segmentName}
                </div>
            )}
            <div
                style={{
                    ...styles.value,
                    ...(!props.labelBottom && styles.bottomMargin),
                }}
            >
                <code>
                    <span style={styles.prepended}>{props.prependToValue}</span>
                    {state.labelValue}
                    <span style={styles.appended}>{props.appendToValue}</span>
                </code>
            </div>
            {props.labelBottom && (
                <div style={{ fontSize: props.labelFontSize }}>
                    {props.segment.segmentName}
                </div>
            )}
        </div>
    );
};

export default Labels;
