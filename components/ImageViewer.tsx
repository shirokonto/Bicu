import {StyleSheet, Image, ImageSourcePropType, Dimensions, Pressable} from 'react-native';
import React from "react";

const windowWidth = Dimensions.get('window').width;


interface ImageViewerProps {
    placeholderImageSource: ImageSourcePropType;
    selectedImage: ImageSourcePropType | null | undefined;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ placeholderImageSource, selectedImage}) => {
    // Define the type explicitly for imageSource
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

