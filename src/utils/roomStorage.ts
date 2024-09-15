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
                if (value.toString().includes("Bathroom")) {
                    console.log("room: ", value.toString())
                }
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

export const saveRoom = async (room: Room): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(room);
        await AsyncStorage.setItem(room.id as string, jsonValue);

    } catch (e) {
        console.error('Error saving rooms to AsyncStorage:', e);
    }
}

export const deleteRoom = async (id: string | number[])=> {
    try {
        await AsyncStorage.removeItem(id as string);
    } catch (error) {
        console.log(error);
    }
};