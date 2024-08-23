import React, {useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ImageViewer from "../../room/image/ImageViewer";
import {ImageModalProps} from "../../../constants";
import CircleButton from "../../buttons/CircleButton";
import Marker from "../../Marker";
import {Item} from "types";
import uuid from "react-native-uuid";


const ImageModal = ({ visible, onClose, selectedImage, room, onMarkerUpdate }: ImageModalProps) => {
    const [markers, setMarkers] = useState<Array<{x: number, y: number}>>([]);
    const [isAddingMarker, setIsAddingMarker] = useState(false);
    const [showMarker, setShowMarker] = useState(false);
    const [itemsWithoutMarkers, setItemsWithoutMarkers] = useState<Item[]>([]);
    const [currentMarker, setCurrentMarker] = useState<{ x: number, y: number } | null>(null);

    useEffect(() => {
        // Filter items without markers
        const unmarkedItems: Item[] = room.items.filter(item => !item.marker);
        setItemsWithoutMarkers(unmarkedItems);
    }, [room.items]);

    const onSetMarker = () => {
        setIsAddingMarker(true);
    };

    const handleItemSelection = (selectedItem: Item) => {
        if (currentMarker) {
            const updatedItems = room.items.map(item =>
                item.id === selectedItem.id
                    ? {
                        ...item,
                        marker: {
                            id: uuid.v4(),
                            xCoordinate: currentMarker.x,
                            yCoordinate: currentMarker.y,
                        }
                    }
                    : item
            );
            onMarkerUpdate(updatedItems);
            setShowMarker(false);
        }
        onClose();
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
                    selectedImage={selectedImage}
                    maximized={true}
                />
                {showMarker && (
                    <Marker imageSize={40} />
                )}
                <View style={styles.bottomBar}>
                    <View style={styles.optionsRow}>
                        <CircleButton icon={"bookmark-add"} onPress={onSetMarker}/>
                    </View>
                </View>
                {isAddingMarker && (
                    <View style={styles.itemsModal}>
                        {itemsWithoutMarkers.map((item, index) => (
                            <TouchableOpacity
                                key={String(item.id)}
                                onPress={() => handleItemSelection(item)}
                                style={styles.itemButton}
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
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
    bottomBar: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
    },
    optionsContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 60,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 95,
        right: 30,
        backgroundColor: '#000',
        borderRadius: 999,
        padding: 5,
    },
    markerButton: {
        position: "absolute",
        top: 9,
        right: 30,
        backgroundColor: '#FFFF',
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
    itemsModal: {
        position: 'absolute',
        bottom: 80,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
    },
    itemButton: {
        paddingVertical: 10,
    },
    itemText: {
        color: '#000',
    },
});

export default ImageModal;
