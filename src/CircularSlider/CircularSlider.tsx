import React, { useReducer, useCallback, useRef } from "react";
import window from "global";
import reducer from "../redux/reducer";
import { EActionType } from "../redux/EActionType";
import useEventListener from "../hooks/useEventListener";
import useIsServer from "../hooks/useIsServer";
import { CircularSliderState } from "./Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "./Helpers/CircularSliderHelpers";
import { CircularSliderStyles as styles } from "./Helpers/CircularSliderStyles";
import { DrawKnobs } from "./DrawKnobs/DrawKnob";
import { DrawLabels } from "./DrawLabels/DrawLabels";
import { SetInitialKnobPosition } from "./Knob/Position/InitialKnobPosition";
import { AdjustKnobPosition } from "./Knob/Position/KnobPosition";
import { Initialize } from "./Initialize";
import Paths from "./DrawPath/Paths/Paths";
import { CircularSliderProps } from "./Helpers/CircularSliderProps";

const CircularSlider = ({
    label = "ANGLE",
    width = 300,
    direction = 1,
    min = 0,
    max = 360,
    knobColor = "#4e63ea",
    knobSize = 36,
    knobPosition = "top",
    knobOffset = 0,
    labelColor = "#272b77",
    labelBottom = false,
    labelFontSize = "1rem",
    valueFontSize = "3rem",
    appendToValue = "",
    prependToValue = "",
    verticalOffset = "1.5rem",
    hideLabelValue = true,
    hideKnob = false,
    knobDraggable = true,
    progressColorFrom = "#80C3F3",
    progressColorTo = "#4990E2",
    progressSize = 24,
    trackColor = "#DDDEFB",
    trackSize = 24,
    data = [],
    dataIndex = 0,
    progressLineCap = "round",
    renderLabelValue = null,
    children = null,
    onChange = (value) => {},
}: CircularSliderProps) => {
    const initialState: CircularSliderState = Helpers.GetInitialState(
        width,
        data,
        knobPosition,
        knobOffset,
        direction,
        trackSize,
        knobDraggable
    );

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const containerRef: React.MutableRefObject<HTMLDivElement | null> =
        useRef(null);
    
    const pathsRef: React.MutableRefObject<SVGPathElement | null> =
        useRef(null);
    
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
                containerRef,
                isServer,
                state,
                AdjustKnobPositionMemoized
            );
        },
        [state, AdjustKnobPositionMemoized, isServer]
    );

    Initialize(dispatch, state, min, max, pathsRef);

    SetInitialKnobPosition(
        state,
        dataIndex,
        dispatch,
        knobPosition,
        knobOffset,
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
            ref={containerRef}
        >
            <Paths
                {...{
                    state,
                    progressSize,
                    progressColorFrom,
                    progressColorTo,
                    progressLineCap,
                    trackColor,
                    trackSize,
                    pathsRef,
                }}
                label={sanitizedLabel}
            />
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
    containerRef: React.MutableRefObject<HTMLDivElement | null>,
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
        (Helpers.GetOffsetRelativeToDocument(containerRef, isServer).left +
            state.radius);

    const mouseYFromCenter =
        (event.type === "touchmove" ? touch.pageY : event.pageY) -
        (Helpers.GetOffsetRelativeToDocument(containerRef, isServer).top +
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
