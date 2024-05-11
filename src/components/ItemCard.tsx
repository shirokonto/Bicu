import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../navigation";

const ItemCard = ({ room, index }: {RoomScreenParams; index: number }) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Room", { item })}>
            <View style={{
                marginBottom: 10,
                backgroundColor: "#fff",
                borderRadius: 15,
                elevation: 12,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 6},
                shadowOpacity: 0.1,
                shadowRadius: 10,
            }}>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingBottom: 14,
                    marginTop: 8,
                }}>
                    <Image source={room.image}
                           style={{
                               height: 70,
                               width: 70,
                               borderRadius: 15,
                               marginHorizontal: 15
                           }}/>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            paddingTop: 8,
                            fontSize: 18,
                            lineHeight: 30,
                        }}>{room.items[index].name}</Text>
                        <Text style={{color: "#6B7280", fontSize: 15, lineHeight: 16}}>{room.items[index].category}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ItemCard;