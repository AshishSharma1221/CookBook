import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

const SearchBar = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('name');

  const handleSearch = async () => {
    try {
      let apiUrl = '';
      if (searchType === 'name') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      } else if (searchType === 'ingredient') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
      }

      const response = await fetch(apiUrl);

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
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Search by ${searchType === 'name' ? 'name' : 'ingredient'}...`}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, searchType === 'name' && styles.toggleButtonActive]}
            onPress={() => setSearchType('name')}
          >
            <Text style={styles.toggleButtonText}>Search by Name</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, searchType === 'ingredient' && styles.toggleButtonActive]}
            onPress={() => setSearchType('ingredient')}
          >
            <Text style={styles.toggleButtonText}>Search by Ingredient</Text>
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 ? (
          <FlatList
            style={styles.list}
            data={searchResults}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleRecipePress(item)}>
                <Image source={{ uri: item.strMealThumb }} style={styles.thumbnail} />
                <Text style={styles.itemText}>{item.strMeal}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>No search results</Text>
          </View>
        )}
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
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  toggleButtonActive: {
    backgroundColor: '#007bff',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 20,
    marginBottom: 20,
  },
  placeholderImage: {
    width: 200,
    height: 200,
  },
});

export default SearchBar;
