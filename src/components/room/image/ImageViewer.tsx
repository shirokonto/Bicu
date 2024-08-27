import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from "react";
import { ImageViewerProps } from "../../../constants";

const placeholderImage = require('../../../assets/images/sample.png');

const ImageViewer = ({ selectedImage, maximized} : ImageViewerProps) => {
    const [layout, setLayout] = useState({ width: 0, height: 0 });

    /*useEffect(() => {
        if (layout.width && layout.height && onLayoutChange) {
            onLayoutChange(layout.width, layout.height);
        }
    }, [layout]);*/


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

