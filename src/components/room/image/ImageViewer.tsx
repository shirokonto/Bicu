import {Image, StyleSheet} from 'react-native';
import React from "react";
import {ImageViewerProps} from "../../../constants";


const ImageViewer = ({ placeholderImageSource, selectedImage, maximized} : ImageViewerProps) => {
    const imageSource = selectedImage ? {uri: selectedImage as string } : placeholderImageSource

    return (
        <Image source={imageSource} style={maximized ? styles.maximizedImage : styles.image}/>
    );
}

const styles = StyleSheet.create({
    maximizedImage: {
        width: '90%',
        height: '80%',
    },
    image: {
        width: "100%",
        height: 320,
    },
});

export default ImageViewer;

