import { ActionSheetIOS, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RootStackParamList } from 'navigation'
import React, { useEffect, useState } from "react";
import ImageModal from "@components/room/modals/ImageModal";
import TitleImage from "@components/room/image/TitleImage";
import RoomDetails from "@components/room/RoomDetails";
import { useImageHandler } from "hooks/useImageHandler";
import { RoomScreenParams } from "../constants";
import { getImageSource } from "@utils/convertImageType";
import { Item, Room as RoomType } from "types";
import { saveRoom } from "@utils/roomStorage";

const placeholderImage = require('../assets/images/sample.png')

const Room = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "Room">>();
    const { room, itemId } = route.params as RoomScreenParams;
    const initialImageSource = room.image ? getImageSource(room.image) : placeholderImage;
    const { selectedImg, openGalleryAsyncRoom, openCameraAsyncRoom } = useImageHandler();

    const [imageSource, setImageSource] = useState(initialImageSource);
    const [isImageMaximized, setIsImageMaximized] = useState(false);
    const [highlightedItemId, setHighlightedItemId] = useState<string | number[] | null>(null);
    const [updatedRoom, setUpdatedRoom] = useState(room);

    useEffect(() => {
        if (selectedImg) {
            // This will run after image is selected and saved
            setImageSource(selectedImg);
            room.image = selectedImg;
        }

        if (route.params.itemId) {
            setHighlightedItemId(route.params.itemId);
            setIsImageMaximized(true);
        }
    }, [selectedImg, route.params.itemId]);

    // handle Room image update
    const handleImageUpdate = (imageUri: string) => {
        const newRoom : RoomType = { ...updatedRoom, image: imageUri };
        handleRoomUpdate(newRoom);
        setImageSource({ uri: imageUri });
    };

    const handleRoomUpdate = (newRoom: RoomType) => {
        setUpdatedRoom(newRoom);
        saveRoom(newRoom)
            .then(() => console.log("Room updated successfully"))
            .catch((e) => console.error("Error updating room:", e));
    };

    const openActionSheetAsync = async () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Camera', 'Gallery'],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    openCameraAsyncRoom(updatedRoom, handleImageUpdate)
                } else if (buttonIndex === 2) {
                    openGalleryAsyncRoom(updatedRoom, handleImageUpdate)
                }
            },
        );

    const handleMarkerUpdate = (updatedItems: Item[]) => {
        const newRoom = { ...updatedRoom, items: updatedItems };
        setUpdatedRoom(newRoom);
        saveRoom(room).then(() => {
            console.log("Successfully updated items with markers");
        }).catch(e => {
            console.error("Error saving updated room:", e);
        });
    };

    return (
        <View>
            <ScrollView>
                <View style={{position: "relative"}}>

                    {/* title image */}
                    <TitleImage
                        selectedImg={imageSource}
                        isImageMaximized={isImageMaximized}
                        onPress={() => setIsImageMaximized(true)}/>

                    {/* Action Buttons */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <MaterialIcons name={"arrow-back"} size={28} color={'#D97706'}/>
                    </TouchableOpacity>
                </View>

                {/* Room details with item list*/}
                <RoomDetails
                    fetchedRoom={updatedRoom}
                    navigation={navigation}
                    openActionSheetAsync={openActionSheetAsync}
                    onRoomUpdate={handleRoomUpdate}
                />
            </ScrollView>

            {/* Modal for maximized image */}
            <ImageModal
                visible={isImageMaximized}
                onClose={() => setIsImageMaximized(false)}
                selectedImage={imageSource}
                room={updatedRoom}
                onMarkerUpdate={handleMarkerUpdate}
                highlightedItemId={highlightedItemId}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 50,
        left: 15,
        backgroundColor: '#FFFF',
        borderRadius: 999,
        padding: 5
    },
})

export default Room;