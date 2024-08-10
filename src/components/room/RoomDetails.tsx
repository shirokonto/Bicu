import React, {useRef, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import IconButton from "../../components/buttons/IconButton";
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation";
import ItemRow from "./ItemRow";
import {Room} from "../../types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// TODO MOVE
interface RoomDetailsProps {
    fetchedRoom: Room;
    navigation: NavigationProp<RootStackParamList>;
    openActionSheetAsync: () => void;
}

const RoomDetails= ({ fetchedRoom, navigation, openActionSheetAsync } : RoomDetailsProps) => {
    const textInputRef = useRef<TextInput | null>(null);
    const [room, setRoom] = useState<Room>(fetchedRoom);
    const [title, onChangeText] = useState(fetchedRoom.name || "Room");

    return (
        <View style={styles.detailsContainer}>
            <View style={{ paddingHorizontal: 30 }}>
                <View>
                    <View style={styles.titleRow}>
                        <View style={{ flexDirection: 'row', }}>
                            <TextInput style={styles.titleLabel}
                                       maxLength={9}
                                       onChangeText={text => onChangeText(text)}
                                       value={title}
                                       ref={textInputRef} />
                            <IconButton icon="mode-edit" label="Marker" onPress={() => {
                                if (textInputRef.current) {
                                    textInputRef.current.focus();
                                }
                            }} />
                        </View>
                        <TouchableOpacity
                            onPress={openActionSheetAsync}
                            style={{ right: 15, backgroundColor: '#FFFF', borderRadius: 999, padding: 5 }}>
                            <MaterialIcons name={"add-photo-alternate"} size={28} color={'#D97706'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("TodoConvert")}>
                    <Text style={{ fontSize: 11, paddingTop: 20, color: "#D97706", lineHeight: 16 }}>See old view</Text>
                </TouchableOpacity>
            </View>

            {/* items */}
            <ItemRow room ={fetchedRoom}/>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
        marginTop: -12,
        paddingTop: 6,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleLabel: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
});

export default RoomDetails;
