import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Button from "./Button";
import React from "react";

interface ImageViewerProps {
    placeholderImageSource: ImageSourcePropType;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ placeholderImageSource }) => {
    return (
        <Image source={placeholderImageSource} style={styles.image} />
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

