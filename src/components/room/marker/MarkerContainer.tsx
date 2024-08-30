import React from 'react';
import { StyleSheet, View } from 'react-native';
import Marker from "./Marker";
import { Item } from "types";

interface MarkerContainerProps {
    itemsSorted: Item[];
    selectedItem: Item | null;
    showSelectedMarker: boolean;
    currentMarker: { x: number, y: number } | null;
    handleItemSelection: (item: Item) => void;
    handleCoordinateChange: (x: number, y: number) => void;
}

const MarkerContainer = ({
        itemsSorted,
        selectedItem,
        showSelectedMarker,
        currentMarker,
        handleItemSelection,
        handleCoordinateChange,
        }: MarkerContainerProps) => {
    return (
        <View style={styles.markerContainer}>
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
            {showSelectedMarker && currentMarker && selectedItem && (
                <Marker
                    key={"0"}
                    itemName={selectedItem?.name}
                    coordinates={currentMarker}
                    onCoordinateChange={(x, y) => {
                        handleCoordinateChange(x, y);
                    }}
                    color={'green'}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    markerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'box-none',
    },
});

export default MarkerContainer;
