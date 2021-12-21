import React, { CSSProperties } from "react";
import { ICircularSliderProps } from "../../Helpers/CircularSliderProps";
import { ICircularSliderState } from "../../Helpers/CircularSliderState";

const Paths = ({
    state,
    label,
    pathsRef,
    props,
}: {
    state: ICircularSliderState;
    label: string;
    pathsRef: React.MutableRefObject<SVGPathElement | null>;
    props: ICircularSliderProps;
}) => {
    const styles = {
        svg: {
            position: "relative",
            zIndex: 2,
        } as CSSProperties,

        path: {
            transform: `rotate(${state.arcOffsetInRadians}rad) ${
                props.direction === -1 ? "scale(-1, 1)" : "scale(1, 1)"
            }`,
            transformOrigin: "center center",
        },
    };

    const halfTrack = props.trackSize / 2;
    const radius = props.width / 2 - halfTrack;

    return (
        <svg
            width={`${props.width}px`}
            height={`${props.width}px`}
            viewBox={`0 0 ${props.width} ${props.width}`}
            overflow="visible"
            style={styles.svg}
        >
            <defs>
                <linearGradient id={label} x1="100%" x2="0%">
                    <stop offset="0%" stopColor={props.progressColorFrom} />
                    <stop offset="100%" stopColor={props.progressColorTo} />
                </linearGradient>
            </defs>
            <Track
                {...{
                    trackSize: props.trackSize,
                    trackColor: props.trackColor,
                    props,
                    radius,
                }}
            />
            {ProgressArc(
                styles,
                pathsRef,
                state,
                label,
                halfTrack,
                props
            )}
        </svg>
    );
};

export default Paths;

function ProgressArc(
    styles: {
        svg: React.CSSProperties;
        path: { transform: string; transformOrigin: string };
    },
    pathsRef: React.MutableRefObject<SVGPathElement | null>,
    state: ICircularSliderState,
    label: string,
    halfTrack: number,
    props: ICircularSliderProps
) {
    const arcOffsetFromTrack = props.segment.arcLengthDegrees
        ? state.trackLength - (props.segment.arcLengthDegrees / 360) * state.trackLength
        : state.arcOffsetFromTrack;

    return (
        <path
            style={styles.path}
            ref={pathsRef}
            strokeDasharray={state.trackLength}
            strokeDashoffset={arcOffsetFromTrack}
            strokeWidth={props.progressSize}
            strokeLinecap={props.progressLineCap !== "round" ? "butt" : "round"}
            fill="none"
            stroke={`url(#${label})`}
            d={`
                        M ${props.width / 2}, ${props.width / 2}
                        m 0, -${props.width / 2 - halfTrack}
                        a ${props.width / 2 - halfTrack},${
                props.width / 2 - halfTrack
            } 0 0,1 0,${props.width - halfTrack * 2}
                        a -${props.width / 2 - halfTrack},-${
                props.width / 2 - halfTrack
            } 0 0,1 0,-${props.width - halfTrack * 2}
                    `}
        />
    );
}

function Track({
    trackSize,
    trackColor,
    props,
    radius,
}: {
    trackSize: number;
    trackColor: string;
    props: ICircularSliderProps;
    radius: number;
}) {
    return (
        <circle
            strokeWidth={trackSize}
            fill="none"
            stroke={trackColor}
            cx={props.width / 2}
            cy={props.width / 2}
            r={radius}
        />
    );
}
