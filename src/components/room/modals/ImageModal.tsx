import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import ImageViewer from "../../room/image/ImageViewer";
import { ImageModalProps } from "../../../constants";
import { Item } from "types";
import uuid from "react-native-uuid";
import TopBar from "@components/room/bar/TopBar";
import BottomBar from "@components/room/bar/BottomBar";
import ItemSelectionList from "@components/room/items/ItemSelectionList";
import MarkerContainer from "@components/room/marker/MarkerContainer";

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
        console.log("handleItemSelection1", selectedItem);

        //                 x: selectedItem.marker.xCoordinate * imageDimensions.width,
        if (selectedItem?.marker) {
            setCurrentMarker({
                x: selectedItem.marker.xCoordinate,
                y: selectedItem.marker.yCoordinate
            });
        } else {
            // No marker yet, ready to add new
            console.log("setCurrentMarker", selectedItem);

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
                // currentMarker.y / imageDimensions.height
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
            // No item is selected yet, show item list
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
                < TopBar onClose={onClose}/>
                <View style={styles.imageWrapper}>
                    <ImageViewer
                        selectedImage={selectedImage}
                        maximized={true}
                    />
                    <MarkerContainer
                        itemsSorted={itemsSorted}
                        selectedItem={selectedItem}
                        showSelectedMarker={showSelectedMarker}
                        currentMarker={currentMarker}
                        handleItemSelection={handleItemSelection}
                        handleCoordinateChange={handleCoordinateChange}
                    />
                </View>
                {/* Bar at the bottom with selection list */}
                <BottomBar onSetMarker={onSetMarker}/>
                {isAddingMarker && (
                    <ItemSelectionList items={itemsSorted} onItemSelect={handleItemSelection} />
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        flex: 1,
        width: '100%',
        position: 'relative', // relative positioning to enable absolute positioning of children
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ImageModal;
