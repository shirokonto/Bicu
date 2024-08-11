import {StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import RoomCard from "./RoomCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Room} from "types";
import {getRooms, saveRoom} from "@utils/roomStorage";
import RoomModal from "@components/home/RoomModal";
import {useFocusEffect} from "@react-navigation/native";

const RoomRow = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const fetchRooms = async () => {
        const storedRooms = await getRooms();
        setRooms(storedRooms);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchRooms();
        }, [])
    );

    const onAddRoom = (newRoom: Room) => {
        const updatedRooms = [...rooms, newRoom];
        setRooms(updatedRooms);
        saveRoom(newRoom)
    };

    return (
        <View style={styles.roomRowContainer}>
            <View style= {styles.rowContainer}>
                <Text style={styles.title}>Rooms</Text>
                <View style={styles.addButtonContainer}>
                    <MaterialIcons name="add" size={38} color="#25292e" onPress={() => setModalVisible(true)} />
                </View>
            </View>

            {rooms.length === 0 ? (
                <Text style={styles.noRoomsText}>No rooms found. Click the + button to add a new room.</Text>
            ) : (
                rooms.map((room, index) => (
                    <RoomCard key={index} room={room} />
                ))
            )}
            <RoomModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAddRoom={onAddRoom}
            />
        </View>
        );
}

const styles = StyleSheet.create({
    roomRowContainer: {
        marginTop: 15,
        paddingHorizontal: 15
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 30,
        marginBottom: 15,
        flex: 1,
    },
    addButtonContainer: {
        backgroundColor: '#D1D5DB',
        borderRadius: 999,
        marginBottom: 15,
        marginRight: 5,
    },
    addButton: {},
    noRoomsText: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 20,
        textAlign: 'center',
        color: '#888',
    },
});

export default RoomRow;