import React, { useReducer, useCallback, useRef } from "react";
import reducer from "./Helpers/redux/reducer";
import { EActionType } from "./Helpers/redux/EActionType";
import useEventListener from "../hooks/useEventListener";
import useIsServer from "../hooks/useIsServer";
import { ICircularSliderState } from "./Helpers/CircularSliderState";
import { CircularSliderHelpers as Helpers } from "./Helpers/CircularSliderHelpers";
import { CircularSliderStyles as styles } from "./Helpers/CircularSliderStyles";
import { DrawKnobs } from "./DrawKnobs/DrawKnob";
import { SetInitialKnobPosition } from "./Knob/Position/InitialKnobPosition";
import { AdjustKnobPosition } from "./Knob/Position/KnobPosition";
import { InitializeCircularSlider } from "./Initialize";
import Paths from "./DrawPath/Paths/Paths";
import {
    GetInitializedProps,
    ICircularSliderProps,
    ISegmentProps,
} from "./Helpers/CircularSliderProps";
import { HandleClickDragEvent } from "./Helpers/HandleClickDragEvent";
import Labels from "./DrawLabels/Labels/Labels";

function CircularSlider({
    options,
    segment,
}: {
    options: Partial<ICircularSliderProps>;
    segment?: Partial<ISegmentProps>;
}) {
    const props: ICircularSliderProps = GetInitializedProps(options, segment);
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

    InitializeCircularSlider(dispatch, props, pathsRef);
    SetInitialKnobPosition(state, props, dispatch, AdjustKnobPositionMemoized);

    const mouseEvents = Helpers.GetSliderEvents(isServer);
    useEventListener(mouseEvents.move, HandleMouseMoveMemoized);
    useEventListener(mouseEvents.up, HandleMouseUpEvent);

    const sanitizedLabel = props.segment.segmentName.replace(/[\W_]/g, "_");

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
            <Labels {...{ props, state }} />
        </div>
    );
}

export default CircularSlider;
