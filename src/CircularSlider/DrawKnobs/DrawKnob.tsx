import React from "react";
import Knob from "./Knob/Knob";
import { TKnob } from "./Knob/TKnob";

export function DrawKnobs({ knobs }: { knobs: TKnob[] }) {
    return (
        <span>
            {knobs.map((knob) => (
                <Knob
                    key={knob.name}
                    isDragging={knob.state.isDragging}
                    knobCoordinates={{
                        x: knob.state.knob_x,
                        y: knob.state.knob_y,
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


