import AsyncStorage from '@react-native-async-storage/async-storage';
import {Room} from '../types/Room';

// Function to retrieve rooms from AsyncStorage
export const getRooms = async (): Promise<Room[]> => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const rooms = await AsyncStorage.multiGet(keys);

        return rooms.map(([key, value]) => {
            return value ? JSON.parse(value) : null;
        }).filter(room => room !== null);
    } catch (e) {
        console.error('Error getting rooms from AsyncStorage:', e);
        return [];
    }
};

export const getRoom = async (id: string): Promise<Room | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(id);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
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
