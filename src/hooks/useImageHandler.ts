import {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {Alert, ImageSourcePropType} from "react-native";

export const useImageHandler = () => {
    const [selectedImg, setSelectedImage] = useState<ImageSourcePropType | null>(null);

    const openGalleryAsync = async () => {
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
            setSelectedImage(result.assets[0].uri);
        } else {
            Alert.alert('No image selected.');
        }
    }

    const openCameraAsync = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission Denied", "Allow this app access to your camera");
            return;
        }

        let result: any = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            Alert.alert('No image selected.');
        }
    }

    return { selectedImg, openGalleryAsync, openCameraAsync };
}
