import AsyncStorage from '@react-native-async-storage/async-storage';
import {Item} from '../types/Item';

const ITEMS_KEY = '@rooms';

// Function to retrieve items from AsyncStorage
export const getItems = async (): Promise<Item[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(ITEMS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error getting items from AsyncStorage:', e);
        return [];
    }
};

// Function to save items to AsyncStorage
export const saveItems = async (items: Item[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem(ITEMS_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving items to AsyncStorage:', e);
    }
};