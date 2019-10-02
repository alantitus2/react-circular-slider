import React, {useState, useEffect, useCallback, useRef, memo} from 'react';
import {StyleSheet, css} from 'aphrodite';
import Knob from "../Knob";
import Labels from "../Labels";
import Svg from "../Svg";

const touchSupported = ('ontouchstart' in window);

const SLIDER_EVENT = {
    DOWN: touchSupported ? 'touchstart' : 'mousedown',
    UP: touchSupported ? 'touchend' : 'mouseup',
    MOVE: touchSupported ? 'touchmove' : 'mousemove',
};

const knobOffset = {
    top: Math.PI / 2,
    right: 0,
    bottom: -Math.PI / 2,
    left: -Math.PI
};

const offset = 0.005;

const getSliderRotation = (number) => {
    if(number === 0) return 1;
    return Math.min(Math.max(number, -1), 1)
};

const generateRange = (min, max) => {
    let rangeOfNumbers = [];
    for(let i = min; i <= max; i++) {
        rangeOfNumbers.push(i);
    }
    return rangeOfNumbers;
};

const offsetRelativeToDocument = (ref) => {
    const rect = ref.current.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
};

const styles = StyleSheet.create({
    circularSlider: {
        position: 'relative',
        display: 'inline-block',
        opacity: 0,
        transition: 'opacity 1s ease-in'
    },

    mounted: {
        opacity: 1
    },
});

const CircularSlider = memo(({
        label = 'ANGLE',
        width = 280,
        direction = 1,
        min = 0,
        max = 360,
        knobColor = '#4e63ea',
        knobZeroPosition = 'top',
        labelColor = '#272b77',
        labelFontSize = '1rem',
        labelValueFontSize = '4rem',
        labelValueAppend = '',
        labelVerticalOffset = '2rem',
        labelHide = false,
        progressColorFrom = '#80C3F3',
        progressColorTo = '#4990E2',
        progressSize = 6,
        trackColor = '#DDDEFB',
        trackSize = 6,
        data = [],
        initialDataIndex = 0,
        progressLineCap = 'round',
        onChange = value => {}
    }) => {
    const [state, setState] = useState({
        mounted: false,
        isDragging: false,
        width: width,
        radius: width / 2,
        knobZeroPosition: knobZeroPosition,
        label: 0,
        data: data,
        radians: 0,
        knob: {
            x: 0,
            y: 0,
        },
        dashFullArray: 0,
        dashFullOffset: 0
    });

    const circularSlider = useRef(null);
    const svgFullPath = useRef(null);

    const knobPosition = useCallback((radians) => {
        const radius = state.radius;
        const offsetRadians = radians + knobOffset[knobZeroPosition];
        let degrees = (offsetRadians > 0 ? offsetRadians
            :
            ((2 * Math.PI) + offsetRadians)) * (360 / (2 * Math.PI));
        // change direction
        const dashOffset = (degrees / 360) * state.dashFullArray;
        degrees = (getSliderRotation(direction) === -1 ? 360 - degrees : degrees);

        const pointsInCircle = state.data.length / 361;
        const currentPoint = Math.floor(degrees * pointsInCircle);

        if(state.data[currentPoint] !== state.label) {
            // props callback for parent
            onChange(state.data[currentPoint]);
        }

        setState(prevState => ({
            ...prevState,
            dashFullOffset: getSliderRotation(direction) === -1 ? dashOffset : state.dashFullArray - dashOffset,
            label: state.data[currentPoint],
            knob: {
                x: (radius * Math.cos(radians) + radius),
                y: (radius * Math.sin(radians) + radius),
            }
        }));
    }, [state.dashFullArray, state.radius, state.data, state.label, knobZeroPosition, direction, onChange]);

    const onMouseDown = (event) => {
        setState(prevState => ({
            ...prevState,
            isDragging: true
        }));
    };

    const onMouseUp = (event) => {
        setState(prevState => ({
            ...prevState,
            isDragging: false
        }));
    };

    const onMouseMove = useCallback((event) => {
        event.preventDefault();

        if (!state.isDragging) return;

        let touch;
        if (event.type === 'touchmove') {
            touch = event.changedTouches[0];
        }

        const mouseXFromCenter = (event.type === 'touchmove' ? touch.pageX : event.pageX) -
            (offsetRelativeToDocument(circularSlider).left + state.radius);
        const mouseYFromCenter = (event.type === 'touchmove' ? touch.pageY : event.pageY) -
            (offsetRelativeToDocument(circularSlider).top + state.radius);

        const radians = Math.atan2(mouseYFromCenter, mouseXFromCenter);
        knobPosition(radians);
    }, [state.isDragging, state.radius, knobPosition]);

    // Get svg path length on mount
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            mounted: true,
            data: prevState.data.length ? [...prevState.data] : [...generateRange(min, max)],
            dashFullArray: svgFullPath.current.getTotalLength(),
        }));
    }, [state.date, max, min]);

    useEffect(() => {
        const dataArrayLength = data.length;
        const knobPositionIndex = (initialDataIndex > dataArrayLength - 1) ? dataArrayLength - 1 : initialDataIndex;

        setState(prevState => ({
            ...prevState,
            radians: Math.PI / 2 - knobOffset[state.knobZeroPosition],
        }));

        if(knobPositionIndex && !!dataArrayLength) {
            const pointsInCircle = Math.ceil(360 / dataArrayLength);
            const degrees = getSliderRotation(direction) * knobPositionIndex * pointsInCircle;
            const radians = (degrees * Math.PI / 180) - knobOffset[state.knobZeroPosition];

            return knobPosition(radians+(offset*getSliderRotation(direction)));
        }

        knobPosition(-knobOffset[state.knobZeroPosition]+(offset*getSliderRotation(direction)));
        // eslint-disable-next-line
    }, [state.dashFullArray, state.knobZeroPosition, initialDataIndex, direction, data.length]);

    useEffect(() => {
        if (state.isDragging) {
            window.addEventListener(SLIDER_EVENT.MOVE, onMouseMove, {passive: false});
            window.addEventListener(SLIDER_EVENT.UP, onMouseUp, {passive: false});
            return () => {
                window.removeEventListener(SLIDER_EVENT.MOVE, onMouseMove);
                window.removeEventListener(SLIDER_EVENT.UP, onMouseUp);
            }
        }
    }, [state.isDragging, onMouseMove]);

    return (
        <div className={css(styles.circularSlider, state.mounted && styles.mounted)} ref={circularSlider}>
            <Svg
                width={width}
                label={label}
                direction={direction}
                strokeDasharray={state.dashFullArray}
                strokeDashoffset={state.dashFullOffset}
                progressColorFrom={progressColorFrom}
                progressColorTo={progressColorTo}
                trackColor={trackColor}
                progressSize={progressSize}
                trackSize={trackSize}
                svgFullPath={svgFullPath}
                radiansOffset={state.radians}
                progressLineCap={progressLineCap}
            />
            <Knob
                isDragging={state.isDragging}
                knobPosition={{ x: state.knob.x, y: state.knob.y }}
                knobColor={knobColor}
                onMouseDown={onMouseDown}
            />
            <Labels
                labelColor={labelColor}
                labelFontSize={labelFontSize}
                labelVerticalOffset={labelVerticalOffset}
                labelValueFontSize={labelValueFontSize}
                labelValueAppend={labelValueAppend}
                labelHide={labelHide}
                label={label}
                value={`${state.label}`}
            />
        </div>
    );
});

export default CircularSlider;
