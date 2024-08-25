import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import React from "react";

interface MarkerProps {
    imageSize: number;
    coordinates: {x: number, y: number};
    onCoordinateChange: (x: number, y: number) => void;
}
const Marker = ({ imageSize, coordinates, onCoordinateChange } : MarkerProps) => {

    const translateX = useSharedValue(coordinates.x);
    const translateY = useSharedValue(coordinates.y);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
            console.log("Double tapped for open list")
        });

    const drag = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;

            onCoordinateChange(translateX.value, translateY.value);
        });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350, alignSelf: 'center' }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.View>
                        <FontAwesome
                            name={"map-marker"}
                            size={imageSize}
                            resizeMode="contain"
                            color={"red"}
                        />
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}

export default Marker;
