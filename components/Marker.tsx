import { View } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

interface MarkerProps {
    imageSize: number;
}
const Marker : React.FC<MarkerProps> = ({ imageSize }) => {
    return (
        <View style={{ top: -350, alignSelf: 'center' }}>
            <FontAwesome
                name={"map-marker"}
                size={imageSize}
                resizeMode="contain"
                color={"red"}
            />
        </View>
    );
}

export default Marker;
