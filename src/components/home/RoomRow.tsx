import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Room } from "types";
import { getRooms, saveRoom } from "@utils/roomStorage";
import RoomModal from "@components/home/RoomModal";
import { useFocusEffect } from "@react-navigation/native";

type RoomRowProps = {
    searchQuery: string;
    selectedCategory: string | null;
};

const RoomRow = ({ searchQuery, selectedCategory }: RoomRowProps) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchRooms();
        }, [])
    );

    useEffect(() => {
        // Filter rooms based on search query and selected category
        let filtered = rooms;
        if (selectedCategory !== null) {
            filtered = filtered.filter((room) =>
                room.items.some((item) => item.category === selectedCategory)
            );
        }

        if (searchQuery?.length >= 2) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(room =>
                room.name.toLowerCase().includes(lowerCaseQuery) ||
                room.items.some(item => item.name.toLowerCase().includes(lowerCaseQuery))
            );

        }
        setFilteredRooms(filtered);

    }, [searchQuery, rooms, selectedCategory]);

    const fetchRooms = async () => {
        const storedRooms = await getRooms();
        setRooms(storedRooms);
        setFilteredRooms(storedRooms);
    };

    const onAddRoom = (newRoom: Room) => {
        const updatedRooms = [...rooms, newRoom];
        setRooms(updatedRooms);
        saveRoom(newRoom)
    };

    const renderRoomResults = () => {
        if (rooms.length === 0) {
            return (
                <Text style={styles.noRoomsText}>
                    No rooms found. Click the + button to add a new room.
                </Text>
            );
        } else if (filteredRooms.length === 0) {
            return (
                <Text style={styles.noRoomsText}>
                    No room or item "{searchQuery}" found
                    {selectedCategory !== null ? " in selected category." : "."}
                </Text>
            );
        } else {
            return filteredRooms.map((room, index) => (
                <RoomCard key={index} room={room} />
            ));
        }
    };

    return (
        <View style={styles.roomRowContainer}>
            <View style= {styles.rowContainer}>
                <Text style={styles.title}>Rooms</Text>
                <View style={styles.addButtonContainer}>
                    <MaterialIcons name="add" size={38} color="#25292e" onPress={() => setModalVisible(true)} />
                </View>
            </View>

            {renderRoomResults()}
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