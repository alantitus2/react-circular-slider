import { stat } from "fs";
import React from "react";
import { ICircularSliderProps } from "../../Helpers/CircularSliderProps";
import { ICircularSliderState } from "../../Helpers/CircularSliderState";
import "./Knob.css";

const Knob = ({
    state,
    props,
    onMouseDown,
}: {
    state: ICircularSliderState;
    props: ICircularSliderProps;
    onMouseDown: () => void;
}) => {
    const knobCoordinates = {
		x: state.knob_x,
		y: state.knob_y
	};

    const styles = {
        knob: {
            position: "absolute",
            left: `-${props.knobSize / 2 - props.trackSize / 2}px`,
            top: `-${props.knobSize / 2 - props.trackSize / 2}px`,
            cursor: "grab",
            zIndex: 3,
        } as React.CSSProperties,

        dragging: {
            cursor: "grabbing",
        },

        pause: {
            animationPlayState: "paused",
        },

        animation: {
            transformOrigin: "50% 50%",
            animationTimingFunction: "ease-out",
            animationDuration: "1500ms",
            animationIterationCount: "infinite",
            animationName: "pulse",
        },

        hide: {
            opacity: 0,
        },

        normalCursor: {
            cursor: "auto",
        },
    };

    return (
        <div
            style={{
                transform: `translate(${knobCoordinates.x}px, ${knobCoordinates.y}px)`,
                ...styles.knob,
                ...(state.isDragging && styles.dragging),
                ...(props.hideKnob && styles.hide),
                ...(!props.knobDraggable && styles.normalCursor),
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
        >
            <svg
                width={`${props.knobSize}px`}
                height={`${props.knobSize}px`}
                viewBox={`0 0 ${props.knobSize} ${props.knobSize}`}
            >
                <circle
                    style={{
                        ...styles.animation,
                        ...(state.isDragging && styles.pause),
                    }}
                    fill={props.knob.color}
                    fillOpacity="0.2"
                    stroke="none"
                    cx={props.knobSize / 2}
                    cy={props.knobSize / 2}
                    r={props.knobSize / 2}
                />
                <circle
                    fill={props.knob.color}
                    stroke="none"
                    cx={props.knobSize / 2}
                    cy={props.knobSize / 2}
                    r={(props.knobSize * 2) / 3 / 2}
                />
                {props.children ?? (
                    <svg
                        width={`${props.knobSize}px`}
                        height={`${props.knobSize}px`}
                        viewBox={`0 0 36 36`}
                    >
                        <rect
                            fill="#FFFFFF"
                            x="14"
                            y="14"
                            width="8"
                            height="1"
                        />
                        <rect
                            fill="#FFFFFF"
                            x="14"
                            y="17"
                            width="8"
                            height="1"
                        />
                        <rect
                            fill="#FFFFFF"
                            x="14"
                            y="20"
                            width="8"
                            height="1"
                        />
                    </svg>
                )}
            </svg>
        </div>
    );
};

export default Knob;
