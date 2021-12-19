import React, { useReducer, useCallback, useRef } from "react";
import window from "global";
import reducer from "../redux/reducer";
import { EActionType } from "../redux/EActionType";
import useEventListener from "../hooks/useEventListener";
import useIsServer from "../hooks/useIsServer";
import { CircularSliderState } from "./Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "./Helpers/CircularSliderHelpers";
import { CircularSliderStyles as styles } from "./Helpers/CircularSliderStyles";
import { DrawPath } from "./DrawPath/DrawPath";
import { DrawKnobs } from "./DrawKnobs/DrawKnob";
import { DrawLabels } from "./DrawLabels/DrawLabels";
import { SetInitialKnobPosition } from "./Knob/Position/InitialKnobPosition";
import { AdjustKnobPosition } from "./Knob/Position/KnobPosition";
import { Initialize } from "./Initialize";

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
        direction,
        trackSize,
        knobDraggable
    );

    const [state, dispatch] = useReducer(reducer, initialState);
    const circularSlider: React.MutableRefObject<any> = useRef(null);
    const svgFullPath: React.MutableRefObject<any> = useRef(null);
    const isServer = useIsServer();

    const AdjustKnobPositionMemoized = useCallback(
        (radians) => {
            AdjustKnobPosition(state, radians, onChange, dispatch);
        },
        [state, onChange]
    );

    const onMouseDown = () => {
        dispatch({
            type: EActionType.onMouseDown,
            payload: {
                isDragging: true,
            },
        });
    };

    const HandleMouseUpEvent = () => {
        dispatch({
            type: EActionType.onMouseUp,
            payload: {
                isDragging: false,
            },
        });
    };

    const HandleMouseMoveMemoized = useCallback(
        (event) => {
            if (!state.isDragging || !state.knobDraggable) {
                return;
            }

            HandleClickDragEvent(
                event,
                circularSlider,
                isServer,
                state,
                AdjustKnobPositionMemoized
            );
        },
        [state, AdjustKnobPositionMemoized, isServer]
    );

    Initialize(dispatch, state, min, max, svgFullPath);

    SetInitialKnobPosition(
        state,
        dataIndex,
        dispatch,
        knobPosition,
        direction,
        AdjustKnobPositionMemoized
    );

    const mouseEvents = GetSliderEvents(isServer);
    useEventListener(mouseEvents.move, HandleMouseMoveMemoized);
    useEventListener(mouseEvents.up, HandleMouseUpEvent);

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

function HandleClickDragEvent(
    event: any,
    circularSlider: React.MutableRefObject<any>,
    isServer: boolean,
    state: CircularSliderState,
    AdjustKnobPositionMemoized: (radians: any) => void
) {
    event.preventDefault();
    let touch;

    if (event.type === "touchmove") {
        touch = event.changedTouches[0];
    }

    const mouseXFromCenter =
        (event.type === "touchmove" ? touch.pageX : event.pageX) -
        (Helpers.GetOffsetRelativeToDocument(circularSlider, isServer).left +
            state.radius);

    const mouseYFromCenter =
        (event.type === "touchmove" ? touch.pageY : event.pageY) -
        (Helpers.GetOffsetRelativeToDocument(circularSlider, isServer).top +
            state.radius);

    const radians = Math.atan2(mouseYFromCenter, mouseXFromCenter);
    AdjustKnobPositionMemoized(radians);
}

function GetSliderEvents(isServer: boolean) {
    const touchSupported = !isServer && "ontouchstart" in window;

    return {
        up: touchSupported ? "touchend" : "mouseup",
        move: touchSupported ? "touchmove" : "mousemove",
    };
}
