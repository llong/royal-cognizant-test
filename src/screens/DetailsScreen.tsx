import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';

type RootStackParamList = {
  Home: undefined;
  Details: { name: string };
};

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

export default function DetailsScreen({ navigation, route }: Props) {
  const { name } = route.params;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleToggleFavorite = () => {
    if (isFavorite(name)) {
      removeFavorite(name);
    } else {
      addFavorite(name);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details Screen</Text>
      <Text style={styles.nameText}>Person: {name}</Text>
      <Button
        title={isFavorite(name) ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={handleToggleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'blue',
  },
});
