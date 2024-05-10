import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import React from "react";

interface ImageViewerProps {
    placeholderImageSource: ImageSourcePropType;
    selectedImage: ImageSourcePropType | null | undefined;
}

const ImageViewer = ({ placeholderImageSource, selectedImage} : ImageViewerProps) => {
    const imageSource = selectedImage ? {uri: selectedImage as string } : placeholderImageSource

    return (
        <Image source={imageSource} style={styles.image}/>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 370,
        height: 600,
        borderRadius: 15,
    },
});

export default ImageViewer;

