import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RoomScreenParams} from "../../constants";
import {RootStackParamList} from "../../navigation";
import {getImageSource} from "../../utils/convertImageType";

const RoomCard = ({ room }: RoomScreenParams) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const imageSource = getImageSource(room.image);

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Room", { room })}>
            <View style={styles.container}>
                <Image source={imageSource}
                       style={styles.image}/>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.title}>{room.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 24,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    image: {
        height: 100,
        width: 359,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingBottom: 16,
        marginTop: 8,
    },
    title: {
        fontWeight: "bold",
        paddingTop: 8,
        fontSize: 18,
        lineHeight: 30,
    },
});


export default RoomCard;