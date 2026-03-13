import { atomWithStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialNames = ["John Smith", "Cindy Doe", "Lewis Long", "Claude Wilde"];

export const favoritesAtom = atomWithStorage('favorites', new Set(initialNames), {
    getItem: async (key) => {
        try {
            const stored = await AsyncStorage.getItem(key);
            return stored ? new Set(JSON.parse(stored)) : new Set(initialNames);
        } catch {
            return new Set(initialNames);
        }
    },
    setItem: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify([...value]));
        } catch {
            // ignore
        }
    },
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch {
            // ignore
        }
    },
});