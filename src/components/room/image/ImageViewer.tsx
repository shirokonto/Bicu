import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import React from "react";

interface ImageViewerProps {
    placeholderImageSource: ImageSourcePropType;
    selectedImage: ImageSourcePropType | null | undefined;
}

const ImageViewer = ({ placeholderImageSource, selectedImage} : ImageViewerProps) => {
    const imageSource = selectedImage ? {uri: selectedImage as string } : placeholderImageSource

    return (

        <Image source={imageSource} style={styles.maximizedImage}/>
    );
}

const styles = StyleSheet.create({
    maximizedImage: {
        width: '90%',
        height: '80%',
    }
});

export default ImageViewer;

