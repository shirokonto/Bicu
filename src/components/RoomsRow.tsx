import {Text, View} from "react-native";
import React from "react";
import RoomCard from "./RoomCard";
import {listedRooms} from "../constants";

const RoomsRow = () => {
    return (
        <View style={{marginTop: 15, paddingHorizontal: 15}}>
            <View>
                <Text style={{fontWeight: "bold", fontSize: 30, lineHeight: 30, marginBottom: 15}}>Rooms</Text>
            </View>
            {
                listedRooms.map((room, index) => {
                    return (
                        <RoomCard
                            room={room}
                            key={index}
                        />
                    )
                })
            }
        </View>
        );
}

export default RoomsRow;