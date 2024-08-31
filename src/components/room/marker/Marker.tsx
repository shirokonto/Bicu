import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from "react";

const markerImage = require('assets/images/marker.png');

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
                    <Animated.View style={styles.markerContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={markerImage}
                                style={[styles.markerImage, { tintColor: color }]}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.roundBackground}>
                            <Text style={ styles.itemName}>{itemName}</Text>
                        </View>
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}
const styles = StyleSheet.create({
    markerContainer: {
        alignItems: 'center',
    },
    imageContainer: {
        paddingBottom: 5,
    },
    roundBackground: {
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    itemName: {
        fontWeight: 'bold',
    }
});

export default Marker;
