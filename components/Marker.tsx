import { View } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import React from "react";

interface MarkerProps {
    imageSize: number;
}
const Marker : React.FC<MarkerProps> = ({ imageSize }) => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
            console.log("Double tapped for open list")
        });

    const drag = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
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
