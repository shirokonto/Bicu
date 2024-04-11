import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Button from "./Button";
import React from "react";

interface ImageViewerProps {
    placeholderImageSource: ImageSourcePropType;
    selectedImage: ImageSourcePropType | null | undefined;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ placeholderImageSource, selectedImage }) => {
    // Define the type explicitly for imageSource
    const imageSource = selectedImage ? {uri: selectedImage as string } : placeholderImageSource

    return (
        <Image source={imageSource} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 350, // TODO remove later? so that image is fullscreen and in background
        height: 500,
        borderRadius: 18,
    },
});

export default ImageViewer;

