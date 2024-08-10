import {Image, StyleSheet} from 'react-native';
import React from "react";
import {ImageViewerProps} from "../../../constants";

const placeholderImage = require('../../../assets/images/sample.png');

const ImageViewer = ({ selectedImage, maximized} : ImageViewerProps) => {

    // TODO add placeHolderImageSource here if not needed elsewhere
    const imageSource = selectedImage && true
        ? selectedImage
        : placeholderImage

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

