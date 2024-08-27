import AsyncStorage from '@react-native-async-storage/async-storage';
import { Room } from 'types';
import { getImageSource } from "@utils/convertImageType";

// Functions to create/update and delete in AsyncStorage
export const getRooms = async (): Promise<Room[]> => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const rooms = await AsyncStorage.multiGet(keys);

        return rooms.map(([key, value]) => {
            if (value) {
                const jsonValue = JSON.parse(value);
                return {
                    ...jsonValue,
                    image: getImageSource(jsonValue.image),
                };
            }
            return null;
        }).filter(room => room !== null);
    } catch (e) {
        console.error('Error getting rooms from AsyncStorage:', e);
        return [];
    }
};

export const getRoom = async (id: string): Promise<Room | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(id);
        if (jsonValue != null) {
            const parsedValue = JSON.parse(jsonValue);
            return {
                ...parsedValue,
                image: getImageSource(parsedValue.image),
            };
        }
        return null;
    } catch (e) {
        console.error('Error getting room from AsyncStorage:', e);
        return null;
    }
};

export const saveRoom = async (room: Room): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(room);
        await AsyncStorage.setItem(room.id as string, jsonValue);

    } catch (e) {
        console.error('Error saving rooms to AsyncStorage:', e);
    }
}

export const deleteRoom = async (id: string)=> {
    try {
        await AsyncStorage.removeItem(id);
    } catch (error) {
        console.log(error);
    }
};

export const updateRoom = async (room: Room): Promise<void> => {
    console.log("old room", room)
    try {
        // Remove empty `markers` arrays from all items in the room
        const cleanedRoom = {
            ...room,
            items: room.items.map(item => {
                const { markers, ...rest } = item;  // Destructure item to remove markers field
                return rest;
            }),
        };

        // Convert cleaned room object to JSON string
        const jsonValue = JSON.stringify(cleanedRoom);
        await AsyncStorage.setItem(room.id as string, jsonValue);
        console.log("new room", jsonValue)


    } catch (e) {
        console.error('Error saving room to AsyncStorage:', e);
    }
}