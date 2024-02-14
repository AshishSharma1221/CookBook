import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Linking } from 'react-native';

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      if (recipe[ingredientKey]) {
        ingredients.push(
          <Text key={i} style={styles.ingredient}>
            {recipe[ingredientKey]} - {recipe[measureKey]}
          </Text>
        );
      }
    }
    return ingredients;
  };

  return (
    <ImageBackground source={{ uri: recipe.strMealThumb }} style={styles.backgroundImage} opacity={0.7}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.recipeName}>{recipe.strMeal}</Text>
          <Text style={styles.category}>Category: {recipe.strCategory}</Text>
          <Text style={styles.area}>Area: {recipe.strArea}</Text>
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          {renderIngredients()}
          <Text style={styles.instructionsTitle}>Instructions: </Text> 
          <Text style={styles.instructions}>{recipe.strInstructions}</Text>
          {recipe.strYoutube && (
            <TouchableOpacity
              style={styles.youtubeButton}
              onPress={() => Linking.openURL(recipe.strYoutube)}
            >
              <Text style={styles.youtubeButtonText}>Watch on YouTube</Text>
            </TouchableOpacity>
          )}
          {recipe.strSource && (
            <TouchableOpacity style={styles.sourceButton} onPress={() => Linking.openURL(recipe.strSource)}>
              <Text style={styles.sourceButtonText}>View Recipe Source</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  category: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: 'white',
  },
  area: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
  instructions: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
  instructionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  ingredientsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  ingredient: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: 'white',
  },
  youtubeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  youtubeButtonText: {
    color: '#282828',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sourceButton: {
    backgroundColor: '#373F51',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  sourceButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecipeDetailsScreen;
