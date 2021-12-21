import React, { useReducer, useCallback, useRef } from "react";
import reducer from "../redux/reducer";
import { EActionType } from "../redux/EActionType";
import useEventListener from "../hooks/useEventListener";
import useIsServer from "../hooks/useIsServer";
import { ICircularSliderState } from "./Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "./Helpers/CircularSliderHelpers";
import { CircularSliderStyles as styles } from "./Helpers/CircularSliderStyles";
import { DrawKnobs } from "./DrawKnobs/DrawKnob";
import { DrawLabels } from "./DrawLabels/DrawLabels";
import { SetInitialKnobPosition } from "./Knob/Position/InitialKnobPosition";
import { AdjustKnobPosition } from "./Knob/Position/KnobPosition";
import { Initialize } from "./Initialize";
import Paths from "./DrawPath/Paths/Paths";
import {
    GetInitializedProps,
    ICircularSliderProps,
    ISegmentProps,
} from "./Helpers/CircularSliderProps";
import { HandleClickDragEvent } from "./Helpers/HandleClickDragEvent";

function CircularSlider({
    options,
    knob,
}: {
    options: Partial<ICircularSliderProps>;
    knob?: Partial<ISegmentProps>;
}) {
    const props: ICircularSliderProps = GetInitializedProps(options, knob);
    const initialState: ICircularSliderState = Helpers.GetInitialState(props);
    const [state, dispatch] = useReducer(reducer, initialState);

    const containerRef: React.MutableRefObject<HTMLDivElement | null> =
        useRef(null);

    const pathsRef: React.MutableRefObject<SVGPathElement | null> =
        useRef(null);

    const isServer = useIsServer();

    const AdjustKnobPositionMemoized = useCallback(
        (radians) => {
            AdjustKnobPosition(state, props, radians, dispatch);
        },
        [state, props]
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
            if (!state.isDragging || !props.knobDraggable) {
                return;
            }

            HandleClickDragEvent(
                event,
                containerRef,
                isServer,
                props,
                AdjustKnobPositionMemoized
            );
        },
        [state, AdjustKnobPositionMemoized, isServer, props]
    );

    Initialize(dispatch, props, props.min, props.max, pathsRef);

    SetInitialKnobPosition(state, props, dispatch, AdjustKnobPositionMemoized);

    const mouseEvents = Helpers.GetSliderEvents(isServer);
    useEventListener(mouseEvents.move, HandleMouseMoveMemoized);
    useEventListener(mouseEvents.up, HandleMouseUpEvent);

    const sanitizedLabel = props.label.replace(/[\W_]/g, "_");

    return (
        <div
            style={{
                ...styles.circularSlider,
                ...(state.mounted && styles.mounted),
            }}
            ref={containerRef}
        >
            <Paths {...{ state, pathsRef, props, label: sanitizedLabel }} />
            <DrawKnobs {...{ state, props, onMouseDown }} />
            <DrawLabels {...{ props, state }} />
        </div>
    );
}

export default CircularSlider;
