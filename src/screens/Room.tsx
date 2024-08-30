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
import { Item } from "types";
import { saveRoom } from "@utils/roomStorage";

const placeholderImage = require('../assets/images/sample.png')

const Room = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "Room">>();
    const { room, itemId } = route.params as RoomScreenParams;
    const initialImageSource = room.image ? getImageSource(room.image) : placeholderImage;
    const { selectedImg, openGalleryAsync, openCameraAsync } = useImageHandler();

    const [imageSource, setImageSource] = useState(initialImageSource);
    const [isImageMaximized, setIsImageMaximized] = useState(false);
    const [highlightedItemId, setHighlightedItemId] = useState<string | number[] | null>(null);


    useEffect(() => {
        if (selectedImg) {
            // This will run after image is selected and saved
            setImageSource(selectedImg);
            room.image = selectedImg;
        }

        if (route.params.itemId) {
            setHighlightedItemId(route.params.itemId);
            setIsImageMaximized(true);
            console.log("Item ID:", itemId);

        }
    }, [selectedImg, route.params.itemId]);

    // TODO replace with openActionSheet?
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
                    openCameraAsync(room)
                } else if (buttonIndex === 2) {
                    openGalleryAsync(room)
                }
            },
        );

    const handleMarkerUpdate = (updatedItems: Item[]) => {
        room.items = updatedItems;
        saveRoom(room).then(() => {
            //setItems(updatedItems);
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
                    fetchedRoom={room}
                    navigation={navigation}
                    openActionSheetAsync={openActionSheetAsync}/>
            </ScrollView>

            {/* Modal for maximized image */}
            <ImageModal
                visible={isImageMaximized}
                onClose={() => setIsImageMaximized(false)}
                selectedImage={imageSource}
                room={room}
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