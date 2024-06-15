import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RoomScreenParams} from "../../constants";
import {RootStackParamList} from "../../navigation";

const RoomCard = ({ room }: RoomScreenParams) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Room", { room })}>
            <View style={{
                marginVertical: 14,
                backgroundColor: "#fff",
                borderRadius: 24,
                elevation: 12,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 6},
                shadowOpacity: 0.1,
                shadowRadius: 10,
            }}>
                <Image source={room.image}
                       style={{
                           height: 100,
                           width: 359,
                           borderTopLeftRadius: 24,
                           borderTopRightRadius: 24,
                       }}/>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingBottom: 16,
                    marginTop: 8,
                }}>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            paddingTop: 8,
                            fontSize: 18,
                            lineHeight: 30,
                        }}>{room.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default RoomCard;