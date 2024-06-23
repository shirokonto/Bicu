import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import RoomCard from "./RoomCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import uuid from 'react-native-uuid';
import {Room} from "../../types";
import {getRooms, saveRooms} from "../../utils/roomStorage";

const RoomRow = () => {

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        // Fetch rooms from AsyncStorage on component mount
        const fetchRooms = async () => {
            const storedRooms = await getRooms();
            setRooms(storedRooms);
        };
        fetchRooms();
    }, []);

    const onAddRoom = () => {
        const newRoom: Room = {
            id: uuid.v4(),
            name: 'New Room',
            image: require('../../assets/images/sample.png'),
            items: [],
        };

        const updatedRooms = [...rooms, newRoom];
        setRooms(updatedRooms);
        saveRooms(updatedRooms);
    };

    return (
        <View style={{marginTop: 15, paddingHorizontal: 15}}>
            <View style= {{ flexDirection: "row", marginTop: 15 }}>
                <Text style={{fontWeight: "bold", fontSize: 30, lineHeight: 30, marginBottom: 15, flex: 1}}>Rooms</Text>
                <View style={{ backgroundColor: '#D1D5DB', borderRadius: 999, marginBottom: 15, marginRight: 5, }}>
                    <MaterialIcons name="add" size={38} color="#25292e" onPress={onAddRoom} />
                </View>
            </View>

            {rooms.length === 0 ? (
                <Text style={styles.noRoomsText}>No rooms found. Click the + button to add a new room.</Text>
            ) : (
                rooms.map((room, index) => (
                    <RoomCard key={index} room={room} />
                ))
            )}
        </View>
        );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 30,
        marginBottom: 15,
        flex: 1,
    },
    addButton: {
        backgroundColor: '#D1D5DB',
        borderRadius: 999,
        marginBottom: 15,
        marginRight: 5,
        padding: 5,
    },
    noRoomsText: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 20,
        textAlign: 'center',
        color: '#888',
    },
});

export default RoomRow;