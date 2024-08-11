import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import IconButton from "@components/buttons/IconButton";
import ItemModal from "./modals/ItemModal";
import {Item} from "types";
import {ItemRowProps} from "../../constants";
import ItemCard from "./ItemCard";
import {getRoom, saveRoom} from "@utils/roomStorage";

const ItemRow = ({ room }: ItemRowProps) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [ items, setItems] = useState<Item[]>(room.items);

    useEffect(() => {
        setItems(room.items);
    }, [room.items]);

    const handleAddItem = (newItem: Item) => {
        const updatedItems = [...items, newItem];
        const updatedRoom = {
            ...room,
            items: room.items ? [...room.items, newItem] : [newItem]
        };

        //TODO Remove getRoom just use saveRoom
        getRoom(updatedRoom.id as string).then(
            fetchedRoom => {
                if (fetchedRoom) {
                    saveRoom(updatedRoom).then(() => {
                        setItems(updatedItems);
                    }).catch(e => {
                        console.error("Error saving updated room:", e);
                    });
                } else {
                    console.error("Room not found");
                }
            }).catch(e => {
            console.error("Error fetching room:", e);
        });
    };

    const onAddItem = (newItem: Item) => {
        handleAddItem(newItem);
        setModalVisible(false);
    };

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
                    />
                ))
            ) : (
                <Text style={styles.emptyItemsList}>Add items with plus icon</Text>
            )}
            <ItemModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAddItem={onAddItem}
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


