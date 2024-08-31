import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "@components/buttons/IconButton";
import ItemModal from "components/room/modals/ItemModal";
import { Item } from "types";
import { ItemRowProps } from "../../../constants";
import ItemCard from "components/room/items/ItemCard";
import { saveRoom } from "@utils/roomStorage";

const ItemRow = ({ room, onItemPress }: ItemRowProps) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [ items, setItems] = useState<Item[]>(room.items);
    const [ selectedItem, setSelectedItem ] = useState<Item | null>(null);

    useEffect(() => {
        setItems(room.items);
    }, [room.items]);

    const handleAddOrUpdateItem = (newItem: Item) => {
        const updatedItems = items.some(item => item.id === newItem.id)
            ? items.map(item => (item.id === newItem.id ? newItem : item))
            : [...items, newItem];

        const updatedRoom = {
            ...room,
            items: updatedItems
        };

        saveRoom(updatedRoom).then(() => {
            setItems(updatedItems);
            setSelectedItem(null);
        }).catch(e => {
            console.error("Error saving updated room:", e);
        });
    };

    const handleDeleteItem = (itemId: string| number[]) => {
        const updatedItems = items.filter(item => item.id !== itemId);
        const updatedRoom = {
            ...room,
            items: updatedItems
        };

        saveRoom(updatedRoom).then(() => {
            setItems(updatedItems);
        }).catch(e => {
            console.error("Error saving updated room:", e);
        });
    }

    const onAddItem = (newItem: Item) => {
        handleAddOrUpdateItem (newItem);
        setModalVisible(false);
    };

    const onEditItem = (editedItem: Item) => {
        setSelectedItem(editedItem);
        setModalVisible(true);
    }

    return(
        <View>
            <View style={styles.itemRowContainer}>
                <Text style={styles.title}>Items</Text>
                <IconButton icon="add" label="Add" onPress={() => setModalVisible(true)} />
            </View>
            {items && items.length > 0 ? (
                items.map((item, index) => (
                    <ItemCard
                        item={item}
                        key={index}
                        index={index}
                        onPress={() => onItemPress(item.id)}
                        onEdit={onEditItem}
                        onDelete={ () => handleDeleteItem(item.id)}
                    />
                ))
            ) : (
                <Text style={styles.emptyItemsList}>Add items with plus icon</Text>
            )}
            <ItemModal
                visible={isModalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setSelectedItem(null);
                }}
                onAddItem={onAddItem}
                itemToEdit={selectedItem}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    itemRowContainer: {
        flexDirection: 'row'
    },
    title: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        fontWeight: 'bold',
        fontSize: 25
    },
    emptyItemsList: {
        color: 'gray',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ItemRow;


