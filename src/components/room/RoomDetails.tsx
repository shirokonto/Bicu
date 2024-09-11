import React, { useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import IconButton from "@components/buttons/IconButton";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation";
import ItemRow from "components/room/items/ItemRow";
import { Room } from "types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { deleteRoom, saveRoom } from "@utils/roomStorage";

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

    const handleDeleteRoom = () => {
        Alert.alert(
            `Delete Room "${fetchedRoom.name}"?`,
            "Are you sure you want to delete this room?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        await deleteRoom(fetchedRoom.id);
                        navigation.goBack();
                    },
                    style: "destructive",
                },
            ]
        );
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
                        <View style={styles.iconGroup}>
                            <TouchableOpacity
                                onPress={openActionSheetAsync}
                                style={styles.iconButton}>
                                <MaterialIcons name={"add-photo-alternate"} size={28} color={'#D97706'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDeleteRoom}
                                style={styles.iconButton}
                            >
                                <MaterialIcons name="delete" size={28} color="red" />
                            </TouchableOpacity>
                        </View>
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
    iconGroup: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        right: 15,
        backgroundColor: '#FFFF',
        borderRadius: 999,
        marginLeft: 10,
        padding: 5
    }
});

export default RoomDetails;
