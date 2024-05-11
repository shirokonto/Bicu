import {Text, View} from "react-native";
import React from "react";
import RoomCard from "./RoomCard";
import {listedRooms} from "../constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const RoomRow = () => {

    const onAddRoom = () => {
        // implement this later
        alert('Add a new room.')
    };

    return (
        <View style={{marginTop: 15, paddingHorizontal: 15}}>
            <View style= {{ flexDirection: "row", marginTop: 15 }}>
                <Text style={{fontWeight: "bold", fontSize: 30, lineHeight: 30, marginBottom: 15, flex: 1}}>Rooms</Text>
                <View style={{ backgroundColor: '#D1D5DB', borderRadius: 999, marginBottom: 15, marginRight: 5, }}>
                    <MaterialIcons name="add" size={38} color="#25292e" onPress={onAddRoom} />
                </View>
            </View>
            {
                listedRooms.map((room, index) => {
                    return (
                        <RoomCard
                            room = {room}
                            key = {index}
                        />
                    )
                })
            }
        </View>
        );
}

export default RoomRow;