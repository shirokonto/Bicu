import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import uuid from 'react-native-uuid';
import RNPickerSelect from 'react-native-picker-select';
import { AddItemModalProps, categories } from "../../../constants";
import { Item } from "types";


const ItemModal = ({ visible, onClose, onAddItem, itemToEdit } : AddItemModalProps) => {
    const [ items, setItems] = useState<Item[]>([]);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setCategory(itemToEdit.category);
        } else {
            setName("");
            setCategory("");
        }
    }, [itemToEdit]);

    const handleAddOrUpdateItem  = () => {
        const itemToSave: Item = itemToEdit ? {
            ...itemToEdit,
            name,
            category
        } : {
            id: uuid.v4(),
            name,
            category,
            marker: undefined,
        };

        onAddItem(itemToSave);
        onClose();
    }

    const togglePicker = () => {
        setIsPickerVisible(!isPickerVisible);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{itemToEdit ? "Update Item" : "Add New Item"}</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#ccc"
                        value={name}
                        onChangeText={setName}
                    />
                    <Text style={styles.inputTitle}>Category</Text>
                    <RNPickerSelect
                        placeholder={
                            {
                                label: "Select Category...",
                                value: null,
                                color: "#ccc",
                            }
                        }
                        items={categories.map((cat) => ({
                            label: cat.name,
                            value: cat.name,
                        }))}
                        onValueChange={(value) => {
                            setCategory(value);
                            setIsPickerVisible(false);
                        }}
                        style={pickerSelectStyles}
                        value={category}
                    />
                    <Pressable style={styles.addButton} onPress={handleAddOrUpdateItem}>
                        <Text style={styles.addButtonText}>{itemToEdit ? "Save" : "Add"}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        height: '60%',
        width: '100%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    pickerContainer: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#464C55',
        width: '100%',
        marginBottom: 10,
    },
    inputTitle: {
        fontSize: 18,
        color: "#fff",
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        fontSize: 16,
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '100%',
        marginVertical: 10,
    },
    addButton: {
        backgroundColor: "#D97706",
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        alignItems: "center",
        width: '100%',
    },
    addButtonText: {
        color: "#fff",
        fontSize: 20,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 11,
        marginVertical: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#fff',
        width: '100%',
        marginBottom: 10,
    }
});

export default ItemModal;
