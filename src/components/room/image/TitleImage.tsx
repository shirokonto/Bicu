import React from "react";
import {ImageSourcePropType, Pressable, StyleSheet} from "react-native";
import ImageViewer from "./ImageViewer";

const placeholderImage = require('../../../assets/images/sample.png');

interface TitleImageProps {
    selectedImg:  ImageSourcePropType | null;
    isImageMaximized: boolean;
    onPress: () => void;
}

const TitleImage = ({ selectedImg, isImageMaximized, onPress } : TitleImageProps) => {
    return (
        <Pressable onPress={onPress}>
            <ImageViewer
                placeholderImageSource={placeholderImage}
                selectedImage={selectedImg}
                maximized={isImageMaximized}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    titleImageContainer: {
        position: "relative",
    },
});

export default TitleImage;
