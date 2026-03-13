import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextType {
    favorites: Set<string>;
    addFavorite: (name: string) => void;
    removeFavorite: (name: string) => void;
    isFavorite: (name: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = 'favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const stored = await AsyncStorage.getItem(FAVORITES_KEY);
                if (stored) {
                    setFavorites(new Set(JSON.parse(stored)));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };
        loadFavorites();
    }, []);

    const saveFavorites = async (newFavorites: Set<string>) => {
        try {
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...newFavorites]));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    const addFavorite = (name: string) => {
        const newFavorites = new Set(favorites);
        newFavorites.add(name);
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const removeFavorite = (name: string) => {
        const newFavorites = new Set(favorites);
        newFavorites.delete(name);
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const isFavorite = (name: string) => favorites.has(name);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};