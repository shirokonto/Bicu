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

export const updateRoom = async (room: Room): Promise<void> => {
    try {
        /*const updatedRoom = {
            ...room,
            items: room.items.map(item => {
                const { marker, ...rest } = item; // currently removes stuff from item
                return rest;
            }),
        };*/

        const jsonValue = JSON.stringify(room);
        await AsyncStorage.setItem(room.id as string, jsonValue);
        console.log("new room", jsonValue)

    } catch (e) {
        console.error('Error saving room to AsyncStorage:', e);
    }
}

export const deleteRoom = async (id: string)=> {
    try {
        await AsyncStorage.removeItem(id);
    } catch (error) {
        console.log(error);
    }
};