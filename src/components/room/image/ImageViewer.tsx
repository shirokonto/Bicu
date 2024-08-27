import { Image, StyleSheet, View } from 'react-native';
import React from "react";
import { ImageViewerProps } from "../../../constants";

const placeholderImage = require('../../../assets/images/sample.png');

const ImageViewer = ({ selectedImage, maximized} : ImageViewerProps) => {
    const imageSource = selectedImage
        ? selectedImage
        : placeholderImage

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={maximized ? styles.maximizedImage : styles.image}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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

