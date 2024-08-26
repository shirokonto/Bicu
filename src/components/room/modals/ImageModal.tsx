import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ImageViewer from "../../room/image/ImageViewer";
import { ImageModalProps } from "../../../constants";
import CircleButton from "../../buttons/CircleButton";
import Marker from "../../Marker";
import { Item } from "types";
import uuid from "react-native-uuid";

const ImageModal = ({ visible, onClose, selectedImage, room, onMarkerUpdate }: ImageModalProps) => {
    const [isAddingMarker, setIsAddingMarker] = useState(false);
    const [showSelectedMarker, setShowSelectedMarker] = useState(false);
    const [itemsSorted, setItemsSorted] = useState<Item[]>([]);
    const [currentMarker, setCurrentMarker] = useState<{ x: number, y: number } |  null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        const sortedItems: Item[] = room.items.sort((a: Item, b: Item) => {
            if (a.marker === undefined && b.marker !== undefined) {
                return -1;
            }
            if (b.marker === undefined && a.marker !== undefined) {
                return 1;
            }
            return 0;
        });

        setItemsSorted(sortedItems);
    }, [room.items]);

    const handleItemSelection = (selectedItem: Item) => {
        if (selectedItem?.marker) {
            setCurrentMarker({ x: selectedItem.marker.xCoordinate, y: selectedItem.marker.yCoordinate });
        } else {
            // No marker yet, ready to add new
            setCurrentMarker({ x: 0, y: 0 });
        }
        setSelectedItem(selectedItem);
        setShowSelectedMarker(true);
        setIsAddingMarker(false);
    };

    const onSetMarker = () => {
        if (selectedItem) {
            if (currentMarker) {
                // Update existing marker
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
                setShowSelectedMarker(false);
                setCurrentMarker(null);
                setSelectedItem(null);
                onClose();
            } else {
                // Create a new marker with 0,0 coordinates
                setCurrentMarker({ x: 0, y: 0 });
                setShowSelectedMarker(true);
            }
        }
        else {
            // No item is selected yet, show the item list
            setIsAddingMarker(true);
        }
    };

    const handleCoordinateChange = (x: number, y: number) => {
        setCurrentMarker({ x, y });
    }


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
                        <MaterialIcons name="close" size={28} color="#FFFFFF"/>
                    </Pressable>
                </View>
                <ImageViewer
                    selectedImage={selectedImage}
                    maximized={true}
                />
                {itemsSorted.map((item) => {
                    if (item.marker) {
                        const isSelected = selectedItem?.id === item.id;

                        if (isSelected && showSelectedMarker) {
                            return null;
                        }
                        return (
                            <Marker
                                key={item.id as string}
                                itemName={item.name}
                                coordinates={{ x: item.marker.xCoordinate, y: item.marker.yCoordinate }}
                                onCoordinateChange={(x, y) => {
                                    handleItemSelection(item);
                                    handleCoordinateChange(x, y);
                                }}
                                color={isSelected ? 'green' : 'red'}
                            />
                        );
                    }
                    return null;
                })}
                { showSelectedMarker && currentMarker && selectedItem && (
                    <Marker
                        key={"0"}
                        itemName={selectedItem?.name}
                        coordinates={currentMarker}
                        onCoordinateChange={handleCoordinateChange}
                        color={'green'}
                    />
                )}
                <View style={styles.bottomBar}>
                    <View style={styles.optionsRow}>
                        <CircleButton icon={"bookmark-add"} onPress={onSetMarker}/>
                    </View>
                </View>
                {isAddingMarker && (
                    <View style={styles.itemsModal}>
                        {itemsSorted.map((item, index) => (
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
