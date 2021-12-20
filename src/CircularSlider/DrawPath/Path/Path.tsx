import React, { CSSProperties } from "react";
import { CircularSliderState } from "../../Helpers/CircularSliderState";

const Path = ({
    state,
    label,
    progressColorFrom,
    progressColorTo,
    trackColor,
    progressSize,
    trackSize,
    svgFullPath,
    progressLineCap,
}: {
    state: CircularSliderState;
    label: string;
    progressColorFrom: string;
    progressColorTo: string;
    trackColor: string;
    progressSize: number;
    trackSize: number;
    svgFullPath: React.MutableRefObject<any>;
    progressLineCap: string;
}) => {
    const styles = {
        svg: {
            position: "relative",
            zIndex: 2,
        } as CSSProperties,

        path: {
            transform: `rotate(${state.radians}rad) ${
                state.direction === -1 ? "scale(-1, 1)" : "scale(1, 1)"
            }`,
            transformOrigin: "center center",
        },
    };

    const halfTrack = trackSize / 2;
    const radius = state.width / 2 - halfTrack;

    return (
        <svg
            width={`${state.width}px`}
            height={`${state.width}px`}
            viewBox={`0 0 ${state.width} ${state.width}`}
            overflow="visible"
            style={styles.svg}
        >
            <defs>
                <linearGradient id={label} x1="100%" x2="0%">
                    <stop offset="0%" stopColor={progressColorFrom} />
                    <stop offset="100%" stopColor={progressColorTo} />
                </linearGradient>
            </defs>
            <circle
                strokeWidth={trackSize}
                fill="none"
                stroke={trackColor}
                cx={state.width / 2}
                cy={state.width / 2}
                r={radius}
            />
            <path
                style={styles.path}
                ref={svgFullPath}
                strokeDasharray={state.dashFullArray}
                strokeDashoffset={state.dashFullOffset}
                strokeWidth={progressSize}
                strokeLinecap={progressLineCap !== "round" ? "butt" : "round"}
                fill="none"
                stroke={`url(#${label})`}
                d={`
                        M ${state.width / 2}, ${state.width / 2}
                        m 0, -${state.width / 2 - halfTrack}
                        a ${state.width / 2 - halfTrack},${
                    state.width / 2 - halfTrack
                } 0 0,1 0,${state.width - halfTrack * 2}
                        a -${state.width / 2 - halfTrack},-${
                    state.width / 2 - halfTrack
                } 0 0,1 0,-${state.width - halfTrack * 2}
                    `}
            />
        </svg>
    );
};

export default Path;
