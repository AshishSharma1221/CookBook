import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, useColorScheme } from 'react-native';

const SearchBar = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('name');

  useEffect(() => {
    // Perform any dark mode or light mode specific actions here
    // This useEffect will be triggered whenever the color scheme changes
    console.log('Current color scheme:', colorScheme);
  }, [colorScheme]);

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
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.safeAreaDark]}>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <View style={[styles.searchContainer, isDarkMode && styles.searchContainerDark]}>
          <TextInput
            style={[styles.input, isDarkMode && styles.inputDark]}
            placeholder={`Search by ${searchType === 'name' ? 'name' : 'ingredient'}...`}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
          />

          <TouchableOpacity style={[styles.searchButton, isDarkMode && styles.searchButtonDark]} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.toggleContainer, isDarkMode && styles.toggleContainerDark]}>
          <TouchableOpacity
            style={[styles.toggleButton, searchType === 'name' && styles.toggleButtonActive, isDarkMode && styles.toggleButtonDark]}
            onPress={() => setSearchType('name')}
          >
            <Text style={[styles.toggleButtonText, isDarkMode && styles.toggleButtonTextDark]}>Search by Name</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, searchType === 'ingredient' && styles.toggleButtonActive, isDarkMode && styles.toggleButtonDark]}
            onPress={() => setSearchType('ingredient')}
          >
            <Text style={[styles.toggleButtonText, isDarkMode && styles.toggleButtonTextDark]}>Search by Ingredient</Text>
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 ? (
          <FlatList
            style={[styles.list, isDarkMode && styles.listDark]}
            data={searchResults}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.item, isDarkMode && styles.itemDark]} onPress={() => handleRecipePress(item)}>
                <Image source={{ uri: item.strMealThumb }} style={styles.thumbnail} />
                <Text style={[styles.itemText, isDarkMode && styles.itemTextDark]}>{item.strMeal}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={[styles.placeholderContainer, isDarkMode && styles.placeholderContainerDark]}>
            <Text style={[styles.placeholderText, isDarkMode && styles.placeholderTextDark]}>No search results</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeAreaDark: {
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#222',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchContainerDark: {
    borderColor: '#444',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    color: '#333',
  },
  inputDark: {
    backgroundColor: '#333',
    borderColor: '#666',
    color: '#eee',
  },
  searchButton: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  searchButtonDark: {
    backgroundColor: '#444',
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
  toggleContainerDark: {
    borderColor: '#444',
    borderTopWidth: 1,
    paddingTop: 10,
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
  toggleButtonDark: {
    backgroundColor: '#444',
  },
  toggleButtonText: {
    color: '#000',
    fontSize: 16,
  },
  toggleButtonTextDark: {
    color: '#eee',
  },
  list: {
    marginTop: 20,
  },
  listDark: {
    backgroundColor: '#333',
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
  itemDark: {
    backgroundColor: '#444',
    borderColor: '#666',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  itemTextDark: {
    color: '#eee',
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
  placeholderContainerDark: {
    borderColor: '#444',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  placeholderText: {
    fontSize: 20,
    marginBottom: 20,
  },
  placeholderTextDark: {
    color: '#eee',
  },
});

export default SearchBar;
