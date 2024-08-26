import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Item } from "types";

interface ItemSelectionListProps {
    items: Item[];
    onItemSelect: (item: Item) => void;
}

const ItemSelectionList = ({ items, onItemSelect }: ItemSelectionListProps) => (
    <View style={styles.itemsModal}>
        {items.map((item) => (
            <TouchableOpacity
                key={String(item.id)}
                onPress={() => onItemSelect(item)}
                style={styles.itemButton}
            >
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
        ))}
    </View>
);

const styles = StyleSheet.create({
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

export default ItemSelectionList;
