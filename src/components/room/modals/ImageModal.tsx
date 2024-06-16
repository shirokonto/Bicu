import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ImageViewer from "../../room/image/ImageViewer";
import {ImageModalProps} from "../../../constants";


const ImageModal = ({ visible, onClose, placeholderImageSource, selectedImage }: ImageModalProps) => {
    const [markers, setMarkers] = useState<Array<{x: number, y: number}>>([]);

    const handleAddMarker = (event: any) => {
        const { locationX, locationY } = event.nativeEvent;
        setMarkers([...markers, { x: locationX, y: locationY }]);
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {/* Bar at the top */}
                <View style={styles.topBar}>
                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <MaterialIcons name="close" size={28} color="#FFFFFF" />
                    </Pressable>
                </View>
                <ImageViewer
                    placeholderImageSource={placeholderImageSource}
                    selectedImage={selectedImage}
                    maximized={true}
                />
                { /*<Pressable onPress={handleAddMarker} style={{ flex: 1 }}>

                    {markers.map((marker, index) => (
                        <View
                            key={index}
                            style={[
                                styles.marker,
                                { top: marker.y - 10, left: marker.x - 10 }
                            ]}
                        />
                    ))}
                </Pressable> */}

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    interactionBar: {
        position: 'absolute',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    barText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    closeButton: {
        position: 'absolute',
        top: 95,
        right: 30,
        backgroundColor: '#000',
        borderRadius: 999,
        padding: 5,
    },
    marker: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
    },
});

export default ImageModal;
