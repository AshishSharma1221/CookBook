import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Image, useColorScheme } from 'react-native';

const FilteredRecipes = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const { category } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilteredRecipes();
  }, []);

  const fetchFilteredRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error fetching filtered recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.recipeItem, isDarkMode && styles.recipeItemDark]}
      onPress={() => handleRecipePress(item)}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} />
      <Text style={[styles.recipeName, isDarkMode && styles.recipeNameDark]}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      {loading ? (
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#0000ff'} />
      ) : recipes.length === 0 ? (
        <Text style={[styles.noRecipesText, isDarkMode && styles.noRecipesTextDark]}>
          No recipes found in the "{category}" category.
        </Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderRecipeItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerDark: {
    backgroundColor: '#111',
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recipeItemDark: {
    borderBottomColor: '#888',
  },
  recipeImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  recipeName: {
    fontSize: 16,
  },
  recipeNameDark: {
    color: '#eee',
  },
  noRecipesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noRecipesTextDark: {
    color: '#eee',
  },
});

export default FilteredRecipes;
