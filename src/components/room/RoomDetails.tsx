import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import IconButton from "@components/buttons/IconButton";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation";
import ItemRow from "components/room/items/ItemRow";
import { Room } from "types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { saveRoom } from "@utils/roomStorage";

// TODO MOVE to constants or types
interface RoomDetailsProps {
    fetchedRoom: Room;
    navigation: NavigationProp<RootStackParamList>;
    openActionSheetAsync: () => void;
    onRoomUpdate: (updatedRoom: Room) => void;
}

const RoomDetails= ({ fetchedRoom, navigation, openActionSheetAsync, onRoomUpdate } : RoomDetailsProps) => {
    const textInputRef = useRef<TextInput | null>(null);
    const [title, setTitle] = useState(fetchedRoom.name || "Room");
    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        if (isEditing) {
            fetchedRoom.name = title;
            saveRoom(fetchedRoom);
        } else {
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        }
        setIsEditing(!isEditing);
    };

    const handleTitleSubmit = () => {
        if (textInputRef.current) {
            textInputRef.current.blur(); // Dismiss keyboard
        }
        handleEditToggle();
    };

    const handleItemPress = (itemId:  string | number[]) => {
        navigation.navigate("Room", {
            room: fetchedRoom,
            itemId: itemId,
        });
    };

    return (
        <View style={styles.detailsContainer}>
            <View style={{ paddingHorizontal: 30 }}>
                <View>
                    <View style={styles.titleRow}>
                        <View style={{ flexDirection: 'row', }}>
                            <TextInput
                                style={styles.titleLabel}
                                maxLength={9}
                                onChangeText={text => setTitle(text)}
                                value={title}
                                ref={textInputRef}
                                onFocus={() => setIsEditing(true)}
                                onSubmitEditing={handleTitleSubmit}
                                returnKeyType="done"
                            />
                            <IconButton
                                icon={isEditing ? "check" : "mode-edit"}
                                label={isEditing ? "Save" : "Edit"}
                                onPress={handleEditToggle}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={openActionSheetAsync}
                            style={{ right: 15, backgroundColor: '#FFFF', borderRadius: 999, padding: 5 }}>
                            <MaterialIcons name={"add-photo-alternate"} size={28} color={'#D97706'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* items */}
            <ItemRow
                room ={fetchedRoom}
                onItemPress={handleItemPress}
                onRoomUpdate={onRoomUpdate}
            />
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
