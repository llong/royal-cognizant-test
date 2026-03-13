import { atomWithStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const favoritesAtom = atomWithStorage('favorites', new Set<string>(), {
    getItem: async (key) => {
        try {
            const stored = await AsyncStorage.getItem(key);
            return stored ? new Set(JSON.parse(stored)) : new Set<string>();
        } catch {
            return new Set<string>();
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