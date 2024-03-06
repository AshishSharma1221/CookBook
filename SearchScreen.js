import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const SearchBar = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.meals || []);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for food recipes..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <Button title="Search" onPress={handleSearch} />

        <FlatList
          style={styles.list}
          data={searchResults}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleRecipePress(item)}>
              <Text>{item.strMeal}</Text>
              {/* Add more details as needed */}
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default SearchBar;
