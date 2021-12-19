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
import { ReducerAction } from "../redux/ReducerAction";
import { SetInitialKnobPosition } from "./Knob/Position/InitialKnobPosition";
import { DispatchSetKnobPosition } from "./Knob/Position/KnobPosition";

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
}) => {
    const initialState: CircularSliderState = Helpers.GetInitialState(
        width,
        data,
        knobPosition,
        direction
    );

    const [state, dispatch] = useReducer(reducer, initialState);
    const circularSlider: React.MutableRefObject<any> = useRef(null);
    const svgFullPath: React.MutableRefObject<any> = useRef(null);
    const isServer = useIsServer();
    const touchSupported = !isServer && "ontouchstart" in window;

    const SLIDER_EVENT = {
        DOWN: touchSupported ? "touchstart" : "mousedown",
        UP: touchSupported ? "touchend" : "mouseup",
        MOVE: touchSupported ? "touchmove" : "mousemove",
    };

    const AdjustKnobPositionMemoized = useCallback(
        (radians) => {
            const adjustedRadius = state.radius - trackSize / 2;
            let degrees = Helpers.GetDegrees(radians, knobPosition);

            // change direction
            const dashOffset =
                (degrees / Constants.spreadDegrees) * state.dashFullArray;

            degrees =
                Helpers.GetSliderRotation(direction) === -1
                    ? Constants.spreadDegrees - degrees
                    : degrees;

            const pointsInCircle =
                (state.data.length - 1) / Constants.spreadDegrees;

            const currentPoint = Math.round(degrees * pointsInCircle);

            if (state.data[currentPoint] !== state.label) {
                // props callback for parent
                onChange(state.data[currentPoint]);
            }

            DispatchSetKnobPosition(
                dispatch,
                degrees,
                dashOffset,
                state,
                currentPoint,
                adjustedRadius,
                radians
            );
        },
        [state, knobPosition, trackSize, direction, onChange]
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
            AdjustKnobPositionMemoized(radians);
        },
        [
            state.isDragging,
            state.radius,
            AdjustKnobPositionMemoized,
            knobDraggable,
            isServer,
        ]
    );

    GetSVGPathLengthOnMount(dispatch, state, min, max, svgFullPath);

    SetInitialKnobPosition(
        state,
        dataIndex,
        dispatch,
        knobPosition,
        direction,
        AdjustKnobPositionMemoized
    );

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

function GetSVGPathLengthOnMount(
    dispatch: React.Dispatch<ReducerAction>,
    state: CircularSliderState,
    min: number,
    max: number,
    svgFullPath: React.MutableRefObject<any>
) {
    useEffect(() => {
        dispatch({
            type: EActionType.init,
            payload: {
                mounted: true,
                data: state.data.length
                    ? [...state.data]
                    : [...Helpers.GenerateRange(min, max)],
                dashFullArray: svgFullPath.current.getTotalLength
                    ? svgFullPath.current.getTotalLength()
                    : 0,
            },
        });
        // eslint-disable-next-line
    }, [max, min]);
}
