import React from "react";
import Knob from "./Knob/Knob";
import { CircularSliderState } from "../Helpers/CircularSliderState";

export function DrawKnobs({ knobs }: { knobs: TKnob[] }) {
    return (
        <span>
            {knobs.map((knob) => (
                <Knob
                    key={knob.name}
                    isDragging={knob.state.isDragging}
                    knobCoordinates={{
                        x: knob.state.knob.coordinates.x,
                        y: knob.state.knob.coordinates.y,
                    }}
                    knobSize={knob.knobSize}
                    knobColor={knob.knobColor}
                    trackSize={knob.trackSize}
                    hideKnob={knob.hideKnob}
                    knobDraggable={knob.knobDraggable}
                    onMouseDown={knob.onMouseDown}
                >
                    {knob.children}
                </Knob>
            ))}
        </span>
    );
}

export interface TKnob {
    name: string;
    state: CircularSliderState;
    knobSize: number;
    knobColor: string;
    trackSize: number;
    hideKnob: boolean;
    knobDraggable: boolean;
    onMouseDown: () => void;
    children: JSX.Element | null;
}
