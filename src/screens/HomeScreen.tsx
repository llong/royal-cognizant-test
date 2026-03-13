import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../atoms/favorites';

type RootStackParamList = {
  Home: undefined;
  Details: { name: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const initialNames = ["John Smith", "Cindy Doe", "Lewis Long", "Claude Wilde"];

export default function HomeScreen({ navigation }: Props) {
  const [namesSet, setNamesSet] = useAtom(favoritesAtom);
  const [textInput, setTextInput] = useState("");

  const names = Array.from(namesSet);

  const handleAdd = () => {
    const namesArray = Array.from(namesSet);
    const existingIndex = namesArray.findIndex(name => name.toLowerCase() === textInput.toLowerCase());
    const newSet = new Set(namesSet);
    if (existingIndex !== -1) {
      newSet.delete(namesArray[existingIndex]);
    } else {
      newSet.add(textInput);
    }
    setNamesSet(newSet);
    setTextInput("");
  };

  const handleDelete = () => {
    const namesArray = Array.from(namesSet);
    namesArray.pop();
    setNamesSet(new Set(namesArray));
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Pressable onPress={() => navigation.navigate('Details', { name: item })}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ flex: 1, gap: 20 }}
        data={names}
        keyExtractor={item => item}
        renderItem={renderItem}
      />
      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="Add name"
          value={textInput}
          onChangeText={text => setTextInput(text)}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.addButton]} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  inputSection: {
    marginTop: 20,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  itemText: {
    fontSize: 16,
  },
  chevron: {
    fontSize: 20,
    color: 'gray',
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
