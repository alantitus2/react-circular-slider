import React, { CSSProperties } from "react";
import { CircularSliderState } from "../../Helpers/CircularSliderState";

const Path = ({
    state,
    width,
    label,
    direction,
    strokeDasharray,
    strokeDashoffset,
    progressColorFrom,
    progressColorTo,
    trackColor,
    progressSize,
    trackSize,
    svgFullPath,
    progressLineCap,
}: {
    state: CircularSliderState;
    width: number;
    label: string;
    direction: number;
    strokeDasharray: number;
    strokeDashoffset: number;
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
                direction === -1 ? "scale(-1, 1)" : "scale(1, 1)"
            }`,
            transformOrigin: "center center",
        },
    };

    const halfTrack = trackSize / 2;
    const radius = width / 2 - halfTrack;

    return (
        <svg
            width={`${width}px`}
            height={`${width}px`}
            viewBox={`0 0 ${width} ${width}`}
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
                cx={width / 2}
                cy={width / 2}
                r={radius}
            />
            <path
                style={styles.path}
                ref={svgFullPath}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeWidth={progressSize}
                strokeLinecap={progressLineCap !== "round" ? "butt" : "round"}
                fill="none"
                stroke={`url(#${label})`}
                d={`
                        M ${width / 2}, ${width / 2}
                        m 0, -${width / 2 - halfTrack}
                        a ${width / 2 - halfTrack},${
                    width / 2 - halfTrack
                } 0 0,1 0,${width - halfTrack * 2}
                        a -${width / 2 - halfTrack},-${
                    width / 2 - halfTrack
                } 0 0,1 0,-${width - halfTrack * 2}
                    `}
            />
        </svg>
    );
};

export default Path;
