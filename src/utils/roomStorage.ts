import AsyncStorage from '@react-native-async-storage/async-storage';
import {Room} from '../types/Room';

const ROOMS_KEY = '@rooms';

// Function to retrieve rooms from AsyncStorage
export const getRooms = async (): Promise<Room[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(ROOMS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error getting rooms from AsyncStorage:', e);
        return [];
    }
};

// Function to save rooms to AsyncStorage
export const saveRooms = async (rooms: Room[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(rooms);
        await AsyncStorage.setItem(ROOMS_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving rooms to AsyncStorage:', e);
    }
};
