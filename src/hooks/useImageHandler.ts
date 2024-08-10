import {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {Alert, ImageSourcePropType} from "react-native";
import {Room} from "../types";
import {saveRoom} from "../utils/roomStorage";

export const useImageHandler = () => {
    const [selectedImg, setSelectedImg] = useState<ImageSourcePropType | undefined>(undefined);

    const openGalleryAsync = async (room : Room) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission Denied", "Allow this app access to your photos");
            return;
        }

        let result: any = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            await handleAddRoomImage(room, imageUri)
            setSelectedImg({ uri: imageUri });
        } else {
            Alert.alert('No image selected.');
        }
    }

    const openCameraAsync = async (room : Room) => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission Denied", "Allow this app access to your camera");
            return;
        }

        let result: any = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            await handleAddRoomImage(room, imageUri)
            setSelectedImg({ uri: imageUri });
        } else {
            Alert.alert('No image selected.');
        }
    }

    const handleAddRoomImage = async (room : Room, imageUri : string) => {
        try {
            const updatedRoom: Room = {
            ...room,
            image: imageUri
        };

            saveRoom(updatedRoom)
                .then(r => console.log("Room Image successfully saved", r))
        } catch (error) {
            Alert.alert('Error', 'Failed to update room image.');
        }
    }

    return { selectedImg, openGalleryAsync, openCameraAsync };
}
