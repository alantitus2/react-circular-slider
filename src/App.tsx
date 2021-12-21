import React from "react";
import CircularSlider from "./CircularSlider/CircularSlider";

const App = () => {
    const styles = {
        wrapper: {
            margin: "2rem",
        },

        h3: {
            margin: "3rem 0 2rem 0",
        },

        pre: {
            fontSize: "0.9rem",
            borderRadius: "0.3rem",
            backgroundColor: "#eeeeee",
            padding: "0.5rem",
        },

        slider: {
            padding: "0 0 0.5rem 0",
        },
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.slider}>
                <CircularSlider
                    options={{}}
                    segment={{
                        arcStartOffsetDegrees: 90,
                        arcLengthDegrees: 30,
                        knobOffsetIndex: 7
                    }}
                />
            </div>
        </div>
    );
};

export default App;
