import React, { useEffect, useReducer, useCallback, useRef } from "react";
import window from "global";
import reducer from "../redux/reducer";
import { EActionType } from "../redux/EActionType";
import useEventListener from "../hooks/useEventListener";
import useIsServer from "../hooks/useIsServer";
import { CircularSliderState } from "./Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "./Helpers/CircularSliderHelpers";
import { CircularSliderConstants as Constants } from "./Helpers/CircularSliderConstants";
import { CircularSliderStyles as styles } from "./Helpers/CircularSliderStyles";
import { DrawPath } from "./DrawPath/DrawPath";
import { DrawKnobs } from "./DrawKnobs/DrawKnob";
import { DrawLabels } from "./DrawLabels/DrawLabels";

const CircularSlider = ({
    label = "ANGLE",
    width = 280,
    direction = 1,
    min = 0,
    max = 360,
    knobColor = "#4e63ea",
    knobSize = 36,
    knobPosition = "top",
    labelColor = "#272b77",
    labelBottom = false,
    labelFontSize = "1rem",
    valueFontSize = "3rem",
    appendToValue = "",
    prependToValue = "",
    verticalOffset = "1.5rem",
    hideLabelValue = false,
    hideKnob = false,
    knobDraggable = true,
    progressColorFrom = "#80C3F3",
    progressColorTo = "#4990E2",
    progressSize = 8,
    trackColor = "#DDDEFB",
    trackSize = 8,
    data = [],
    dataIndex = 0,
    progressLineCap = "round",
    renderLabelValue = null,
    children = null,
    onChange = (value) => {},
    restrictKnob = false,
    knobMinDegrees = 0,
    knobMaxDegrees = 360,
}) => {
    const initialState: CircularSliderState = {
        mounted: false,
        isDragging: false,
        width: width,
        radius: width / 2,
        label: 0,
        data: data,
        radians: 0,
        offset: 0,
        knob: {
            inputPosition: knobPosition,
            coordinates: {
                x: 0,
                y: 0,
            },
            restrictKnob,
            minDegrees: knobMinDegrees,
            maxDegrees: knobMaxDegrees,
        },
        dashFullArray: 0,
        dashFullOffset: 0,
    };

    const isServer = useIsServer();
    const [state, dispatch] = useReducer(reducer, initialState);
    const circularSlider: React.MutableRefObject<any> = useRef(null);
    const svgFullPath: React.MutableRefObject<any> = useRef(null);
    const touchSupported = !isServer && "ontouchstart" in window;

    const SLIDER_EVENT = {
        DOWN: touchSupported ? "touchstart" : "mousedown",
        UP: touchSupported ? "touchend" : "mouseup",
        MOVE: touchSupported ? "touchmove" : "mousemove",
    };

    const setKnobPosition = useCallback(
        (radians) => {
            const radius = state.radius - trackSize / 2;
            let degrees = Helpers.GetDegrees(radians, knobPosition);

            // change direction
            const dashOffset =
                (degrees / Constants.spreadDegrees) * state.dashFullArray;

            degrees =
                Helpers.getSliderRotation(direction) === -1
                    ? Constants.spreadDegrees - degrees
                    : degrees;

            const pointsInCircle =
                (state.data.length - 1) / Constants.spreadDegrees;

            const currentPoint = Math.round(degrees * pointsInCircle);

            if (state.data[currentPoint] !== state.label) {
                // props callback for parent
                onChange(state.data[currentPoint]);
            }

            dispatch({
                type: EActionType.setKnobPosition,
                payload: {
                    dashFullOffset:
                        Helpers.getSliderRotation(direction) === -1
                            ? dashOffset
                            : state.dashFullArray - dashOffset,
                    label: state.data[currentPoint],
                    knob: {
                        ...state.knob,
                        inputPosition: state.knob.inputPosition,
                        coordinates: {
                            x: radius * Math.cos(radians) + radius,
                            y: radius * Math.sin(radians) + radius,
                        },
                    },
                },
            });
        },
        [
            state.dashFullArray,
            state.radius,
            state.data,
            state.label,
            knobPosition,
            state.knob.inputPosition,
            state.knob.maxDegrees,
            trackSize,
            direction,
            onChange,
        ]
    );

    const onMouseDown = () => {
        dispatch({
            type: EActionType.onMouseDown,
            payload: {
                isDragging: true,
            },
        });
    };

    const onMouseUp = () => {
        dispatch({
            type: EActionType.onMouseUp,
            payload: {
                isDragging: false,
            },
        });
    };

    const onMouseMove = useCallback(
        (event) => {
            if (!state.isDragging || !knobDraggable) return;

            event.preventDefault();

            let touch;
            if (event.type === "touchmove") {
                touch = event.changedTouches[0];
            }

            const offsetRelativeToDocument = (ref) => {
                const rect = ref.current.getBoundingClientRect();
                const scrollLeft =
                    !isServer &&
                    ((window?.pageXOffset ?? 0) ||
                        (document?.documentElement?.scrollLeft ?? 0));
                const scrollTop =
                    !isServer &&
                    ((window?.pageYOffset ?? 0) ||
                        (document?.documentElement?.scrollTop ?? 0));
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft,
                };
            };

            const mouseXFromCenter =
                (event.type === "touchmove" ? touch.pageX : event.pageX) -
                (offsetRelativeToDocument(circularSlider).left + state.radius);
            const mouseYFromCenter =
                (event.type === "touchmove" ? touch.pageY : event.pageY) -
                (offsetRelativeToDocument(circularSlider).top + state.radius);

            const radians = Math.atan2(mouseYFromCenter, mouseXFromCenter);
            setKnobPosition(radians);
        },
        [
            state.isDragging,
            state.radius,
            setKnobPosition,
            knobDraggable,
            isServer,
        ]
    );

    // Get svg path length onmount
    useEffect(() => {
        dispatch({
            type: EActionType.init,
            payload: {
                mounted: true,
                data: state.data.length
                    ? [...state.data]
                    : [...Helpers.generateRange(min, max)],
                dashFullArray: svgFullPath.current.getTotalLength
                    ? svgFullPath.current.getTotalLength()
                    : 0,
            },
        });
        // eslint-disable-next-line
    }, [max, min]);

    // Set knob position
    useEffect(() => {
        const dataArrayLength = state.data.length;
        const knobPositionIndex =
            dataIndex > dataArrayLength - 1 ? dataArrayLength - 1 : dataIndex;

        if (!!dataArrayLength) {
            const pointsInCircle = Constants.spreadDegrees / dataArrayLength;
            const offset = Helpers.getRadians(pointsInCircle) / 2;

            dispatch({
                type: EActionType.setInitialKnobPosition,
                payload: {
                    radians:
                        Math.PI / 2 -
                        Constants.knobOffset[state.knob.inputPosition],
                    offset,
                },
            });

            if (knobPositionIndex) {
                const degrees =
                    Helpers.getSliderRotation(direction) *
                    knobPositionIndex *
                    pointsInCircle;
                const radians =
                    Helpers.getRadians(degrees) -
                    Constants.knobOffset[state.knob.inputPosition];

                return setKnobPosition(
                    radians + offset * Helpers.getSliderRotation(direction)
                );
            }
            setKnobPosition(
                -(
                    Constants.knobOffset[state.knob.inputPosition] *
                    Helpers.getSliderRotation(direction)
                ) +
                    offset * Helpers.getSliderRotation(direction)
            );
        }

        // eslint-disable-next-line
    }, [
        state.dashFullArray,
        state.knob.inputPosition,
        state.data.length,
        dataIndex,
        direction,
    ]);

    useEventListener(SLIDER_EVENT.MOVE, onMouseMove);
    useEventListener(SLIDER_EVENT.UP, onMouseUp);

    const sanitizedLabel = label.replace(/[\W_]/g, "_");

    return (
        <div
            style={{
                ...styles.circularSlider,
                ...(state.mounted && styles.mounted),
            }}
            ref={circularSlider}
        >
            {DrawPath(
                width,
                sanitizedLabel,
                direction,
                state,
                svgFullPath,
                progressSize,
                progressColorFrom,
                progressColorTo,
                progressLineCap,
                trackColor,
                trackSize
            )}
            <DrawKnobs
                knobs={[
                    {
                        name: `default`,
                        state,
                        knobSize,
                        knobColor,
                        trackSize,
                        hideKnob,
                        knobDraggable,
                        onMouseDown,
                        children,
                    },
                ]}
            />
            {renderLabelValue ||
                DrawLabels(
                    label,
                    labelColor,
                    labelBottom,
                    labelFontSize,
                    verticalOffset,
                    valueFontSize,
                    appendToValue,
                    prependToValue,
                    hideLabelValue,
                    state
                )}
        </div>
    );
};

export default CircularSlider;
