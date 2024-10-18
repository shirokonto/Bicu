import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import { decode } from 'base64-arraybuffer';
import pako from 'pako';
import { Alert, ImageSourcePropType } from "react-native";
import { Item, Room } from "types";
// @ts-ignore
import { colorPalette } from "constants";

const base64ToUint8Array = (base64: string): Uint8Array => {
    const buffer = decode(base64);
    return new Uint8Array(buffer);
};

const getColorNameFromRGB = (r: number, g: number, b: number): string => {
    let minDistance = Infinity;
    let closestColorName = 'UNKNOWN';

    for (const color of colorPalette) {
        const [red, green, blue] = color.rgb;
        // Calculate Euclidean distance in RGB space
        const distance = Math.sqrt(
            Math.pow(r - red, 2) +
            Math.pow(g - green, 2) +
            Math.pow(b - blue, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestColorName = color.name;
        }
    }

    return closestColorName;
};

export const useImageHandler = () => {
    const [selectedImg, setSelectedImg] = useState<ImageSourcePropType | undefined>(undefined);

    const openGalleryAsyncRoom = async (entity: Room, updateImageCallback: (uri: string) => void) => {
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
            updateImageCallback(imageUri); // No dominant color detection for Room
            setSelectedImg({ uri: imageUri });
        } else {
            Alert.alert('No image selected.');
        }
    }

    const openCameraAsyncRoom = async (entity: Room, updateImageCallback: (uri: string) => void) => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission Denied", "Allow this app access to your camera");
            return;
        }

        let result: any = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            updateImageCallback(imageUri);
            setSelectedImg({ uri: imageUri });
        } else {
            Alert.alert('No image selected.');
        }
    }

    const openGalleryAsyncItem = async (entity: Item, updateImageCallback: (uri: string, dominantColor?: string) => void) => {
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
            const dominantColor = await detectDominantColor(imageUri);
            updateImageCallback(imageUri, dominantColor);
        } else {
            Alert.alert('No image selected.');
        }
    }

    const openCameraAsyncItem = async (entity: Item, updateImageCallback: (uri: string, dominantColor?: string) => void) => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission Denied", "Allow this app access to your camera");
            return;
        }

        let result: any = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const dominantColor = await detectDominantColor(imageUri);
            updateImageCallback(imageUri, dominantColor);
        } else {
            Alert.alert('No image selected.');
        }
    }

    const detectDominantColor = async (imageUri: string): Promise<string | undefined> => {
        try {
            // Resize image to 1x1 pixel and save as PNG
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width: 1, height: 1 } }],
                { base64: true, format: ImageManipulator.SaveFormat.PNG }
            );

            if (manipulatedImage.base64) {
                const imageData = base64ToUint8Array(manipulatedImage.base64);
                return getColorFromPNGData(imageData);
            }
        } catch (error) {
            console.error("Dominant color detection failed:", error);
        }
        return 'rgb(255, 255, 255)'; // Fallback to white when failing to detect color
    };

    // Not really working
    const getColorFromPNGData = (pngData: Uint8Array): string => {
        // Parse PNG data to get the pixel color
        const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
        for (let i = 0; i < pngSignature.length; i++) {
            if (pngData[i] !== pngSignature[i]) {
                console.error('Not a valid PNG file');
                return 'rgb(255, 255, 255)';
            }
        }

        let offset = 8; // Skip PNG signature

        while (offset < pngData.length) {
            const length = readUInt32BE(pngData, offset);
            const type = String.fromCharCode(
                pngData[offset + 4],
                pngData[offset + 5],
                pngData[offset + 6],
                pngData[offset + 7]
            );

            if (type === 'IDAT') {
                const compressedData = pngData.slice(offset + 8, offset + 8 + length);

                // Decompress image data using pako (a zlib port)
                const decompressedData = pako.inflate(compressedData);

                // For 1x1 image, decompressed data should be minimal
                const r = decompressedData[1];
                const g = decompressedData[2];
                const b = decompressedData[3];

                return getColorNameFromRGB(r, g, b);
            } else {
                offset += 8 + length + 4;
            }
        }

        console.error('IDAT chunk not found');
        return "WHITE";
    };

    const readUInt32BE = (buffer: Uint8Array, offset: number): number => {
        return (
            (buffer[offset] << 24) |
            (buffer[offset + 1] << 16) |
            (buffer[offset + 2] << 8) |
            buffer[offset + 3]
        ) >>> 0;
    };

    return { selectedImg, openGalleryAsyncItem, openCameraAsyncItem, openGalleryAsyncRoom, openCameraAsyncRoom };
}
