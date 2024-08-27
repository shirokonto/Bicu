import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Text } from 'react-native';
import React, { useEffect } from "react";

interface MarkerProps {
    itemName?: string;
    coordinates: {x: number, y: number} | null;
    onCoordinateChange: (x: number, y: number) => void;
    color: string;
}
const Marker = ({ itemName, coordinates, onCoordinateChange, color } : MarkerProps) => {
    const translateX: SharedValue<number> = useSharedValue(coordinates ? coordinates.x : 0);
    const translateY: SharedValue<number> = useSharedValue(coordinates ? coordinates.y : 0);

    useEffect(() => {
        if (coordinates) {
            translateX.value = coordinates.x;
            translateY.value = coordinates.y;
        }
    }, [coordinates, translateX, translateY]);

    const handleOnCoordinateChange = (x: number, y: number) => {
        if (typeof onCoordinateChange === 'function') {
            try {
                onCoordinateChange(x, y);
            } catch (error) {
                console.error("Marker - Error in onCoordinateChange:", error);
            }
        } else {
            console.error("Marker - onCoordinateChange is not a function or is undefined:", onCoordinateChange);
        }
    };

    const doubleTap = Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
            console.log("Double tapped for open list")
        });

    const drag = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        })
        .onEnd(() => {
            console.log("drag end")
            runOnJS(handleOnCoordinateChange)(translateX.value, translateY.value);
        });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
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
                            size={40}
                            resizeMode="contain"
                            color={color}
                        />
                        <Text>{itemName}</Text>
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}

export default Marker;
