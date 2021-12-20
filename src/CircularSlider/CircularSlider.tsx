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
import { ICircularSliderProps } from "./Helpers/CircularSliderProps";
import { HandleClickDragEvent } from "./Helpers/HandleClickDragEvent";

function CircularSlider({ options }: { options: Partial<ICircularSliderProps> }) {
    const props: ICircularSliderProps = {
        label: options.label ?? "ANGLE",
        width: options.width ?? 300,
        direction: options.direction ?? 1,
        min: options.min ?? 0,
        max: options.max ?? 360,
        knobColor: options.knobColor ?? "#4e63ea",
        knobSize: options.knobSize ?? 36,
        knobPosition: options.knobPosition ?? "top",
        knobOffset: options.knobOffset ?? 0,
        labelColor: options.labelColor ?? "#272b77",
        labelBottom: options.labelBottom ?? false,
        labelFontSize: options.labelFontSize ?? "1rem",
        valueFontSize: options.valueFontSize ?? "3rem",
        appendToValue: options.appendToValue ?? "",
        prependToValue: options.prependToValue ?? "",
        verticalOffset: options.verticalOffset ?? "1.5rem",
        hideLabelValue: options.hideLabelValue ?? true,
        hideKnob: options.hideKnob ?? false,
        knobDraggable: options.knobDraggable ?? true,
        progressColorFrom: options.progressColorFrom ?? "#80C3F3",
        progressColorTo: options.progressColorTo ?? "#4990E2",
        progressSize: options.progressSize ?? 24,
        trackColor: options.trackColor ?? "#DDDEFB",
        trackSize: options.trackSize ?? 24,
        data: options.data ?? [],
        dataIndex: options.dataIndex ?? 0,
        progressLineCap: options.progressLineCap ?? "round",
        renderLabelValue: options.renderLabelValue ?? null,
        children: options.children ?? null,
        onChange: options.onChange ?? ((value) => { }),
        lockDashOffset: options.lockDashOffset ?? undefined,
    };

    const initialState: ICircularSliderState = Helpers.GetInitialState(props);
    const [state, dispatch] = useReducer(reducer, initialState);

    const containerRef: React.MutableRefObject<HTMLDivElement | null> =
        useRef(null);

    const pathsRef: React.MutableRefObject<SVGPathElement | null> =
        useRef(null);

    const isServer = useIsServer();

    const AdjustKnobPositionMemoized = useCallback(
        (radians) => {
            AdjustKnobPosition(state, radians, props.onChange, dispatch);
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

    Initialize(dispatch, state, props.min, props.max, pathsRef);

    SetInitialKnobPosition(
        state,
        props.dataIndex,
        dispatch,
        props.knobPosition,
        props.knobOffset,
        props.direction,
        AdjustKnobPositionMemoized
    );

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
            <Paths
                {...{
                    state,
                    pathsRef,
                    props
                }}
                label={sanitizedLabel}
            />
            <DrawKnobs
                knobs={[
                    {
                        name: `default`,
                        state,
                        knobSize: props.knobSize,
                        knobColor: props.knobColor,
                        trackSize: props.trackSize,
                        hideKnob: props.hideKnob,
                        knobDraggable: props.knobDraggable,
                        onMouseDown,
                        children: props.children,
                    },
                ]}
            />
            {props.renderLabelValue ||
                DrawLabels(
                    props.label,
                    props.labelColor,
                    props.labelBottom,
                    props.labelFontSize,
                    props.verticalOffset,
                    props.valueFontSize,
                    props.appendToValue,
                    props.prependToValue,
                    props   .hideLabelValue,
                    state
                )}
        </div>
    );
}

export default CircularSlider;
