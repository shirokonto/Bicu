import {ItemRowProps} from "../../constants";
import ItemCard from "./ItemCard";
import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import IconButton from "../../components/buttons/IconButton";
import ItemModal from "./modals/ItemModal";
import {Item} from "../../types";

const ItemRow = ({ room }: ItemRowProps) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState(room.items || []);

    const handleAddItem = (newItem: Item) => {
        setItems([...items, newItem]);
        setModalVisible(false);
    };

    return(
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ paddingVertical: 12, paddingHorizontal: 30, fontWeight: 'bold', fontSize: 25 }}>Items</Text>
                <IconButton icon="add" label="Add" onPress={() => setModalVisible(true)} />
            </View>
            {room.items && room.items.length > 0 ? (
                room.items.map((item, index) => (
                    <ItemCard
                        room={room}
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
                onAddItem={handleAddItem}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    emptyItemsList: {
        color: 'gray',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ItemRow;


