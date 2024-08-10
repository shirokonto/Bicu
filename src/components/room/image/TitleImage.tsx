import React from "react";
import {ImageSourcePropType, Pressable, StyleSheet} from "react-native";
import ImageViewer from "./ImageViewer";


interface TitleImageProps {
    selectedImg:  ImageSourcePropType | undefined;
    isImageMaximized: boolean;
    onPress: () => void;
}

const TitleImage = ({ selectedImg, isImageMaximized, onPress } : TitleImageProps) => {
    return (
        <Pressable onPress={onPress}>
            <ImageViewer
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
