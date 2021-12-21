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
        y: state.knob_y,
    };

    const styles = {
        knob: {
            position: "absolute",
            left: `-${props.segment.knobSize / 2 - props.trackSize / 2}px`,
            top: `-${props.segment.knobSize / 2 - props.trackSize / 2}px`,
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
                ...(props.segment.knobHidden && styles.hide),
                ...(!props.knobDraggable && styles.normalCursor),
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
            onMouseEnter={() => console.log(`hello`)}
        >
            <span
                style={{
                    fontSize: "22px",
                    maxWidth: "200px",
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <span>Hello</span>
            </span>
            <svg
                width={`${props.segment.knobSize}px`}
                height={`${props.segment.knobSize}px`}
                viewBox={`0 0 ${props.segment.knobSize} ${props.segment.knobSize}`}
            >
                <circle
                    style={{
                        ...styles.animation,
                        ...(state.isDragging && styles.pause),
                    }}
                    fill={props.segment.knobColor}
                    fillOpacity="0.2"
                    stroke="none"
                    cx={props.segment.knobSize / 2}
                    cy={props.segment.knobSize / 2}
                    r={props.segment.knobSize / 2}
                />
                <circle
                    fill={props.segment.knobColor}
                    stroke="none"
                    cx={props.segment.knobSize / 2}
                    cy={props.segment.knobSize / 2}
                    r={(props.segment.knobSize * 2) / 3 / 2}
                />
                {props.children ?? (
                    <svg
                        width={`${props.segment.knobSize}px`}
                        height={`${props.segment.knobSize}px`}
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
