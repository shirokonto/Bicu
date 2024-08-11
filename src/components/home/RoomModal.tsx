import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import uuid from 'react-native-uuid';
import {Room} from 'types';

interface RoomModalProps {
    visible: boolean;
    onClose: () => void;
    onAddRoom: (room: Room) => void;
}

const RoomModal = ({ visible, onClose, onAddRoom }: RoomModalProps) => {
    const [name, setName] = useState('');

    const handleAddRoom = () => {
        const newRoom: Room = {
            id: uuid.v4(),
            name: name || 'New Room',
            image: require('../../assets/images/sample.png'),
            items: [],
        };

        onAddRoom(newRoom);
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Add New Room</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Room Name"
                        placeholderTextColor="#ccc"
                        value={name}
                        onChangeText={setName}
                    />
                    <Pressable style={styles.addButton} onPress={handleAddRoom}>
                        <Text style={styles.addButtonText}>Add Room</Text>
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
        color: '#fff',
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '100%',
        marginVertical: 10,
    },
    addButton: {
        backgroundColor: '#D97706',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default RoomModal;
