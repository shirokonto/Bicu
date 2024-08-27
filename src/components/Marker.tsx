import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Text } from 'react-native';
import React, { useEffect } from "react";

interface MarkerProps {
    itemName?: string;
    coordinates: {x: number, y: number} | null;
    onCoordinateChange: (x: number, y: number) => void;
    color: string;
}
const Marker = ({ itemName, coordinates, onCoordinateChange, color } : MarkerProps) => {
    let translateX: SharedValue<number> = useSharedValue(coordinates ? coordinates.x : 0);
    let translateY: SharedValue<number> = useSharedValue(coordinates ? coordinates.y : 0);


    useEffect(() => {
        console.log("coordinates", coordinates)
        if (coordinates) {
            translateX.value = coordinates.x;
            translateY.value = coordinates.y;
        }
    }, [coordinates, translateX, translateY]);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
            console.log("Double tapped for open list")
        });

    const drag = Gesture.Pan()
        .onChange((event) => {
            console.log("dragged")

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
