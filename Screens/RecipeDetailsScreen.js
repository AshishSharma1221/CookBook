import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Linking, TextInput, Share } from 'react-native';

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [rating, setRating] = useState('');
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

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

  const getIngredientsText = () => {
    let ingredientsText = '';
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      if (recipe[ingredientKey]) {
        ingredientsText += `${recipe[ingredientKey]} - ${recipe[measureKey]}\n`;
      }
    }
    return ingredientsText;
  };

  const submitRating = () => {
    console.log('Rating submitted:', rating);
    setRating('');
    setIsRatingSubmitted(true);
  };

  const shareRecipe = () => {
    const recipeDetails = `Recipe: ${recipe.strMeal}\nCategory: ${recipe.strCategory}\nArea: ${recipe.strArea}\nView Recipe Source: ${recipe.strSource}`;
    
    Share.share({
      message: recipeDetails,
    })
    .then(result => console.log(result))
    .catch(error => console.log(error));
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
          {!isRatingSubmitted && (
            <View style={styles.ratingContainer}>
              <TextInput
                style={[styles.ratingInput, { backgroundColor: 'white' }]} 
                onChangeText={setRating}
                value={rating}
                keyboardType="numeric"
                placeholder="Rate this recipe (1-5)"
              />
              <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
                <Text style={styles.submitButtonText}>Submit Rating</Text>
              </TouchableOpacity>
            </View>
          )}
          {isRatingSubmitted && (
            <Text style={styles.submittedMessage}>Thanks for submitting rating!</Text>
          )}
          <TouchableOpacity style={styles.shareButton} onPress={shareRecipe}>
            <Text style={styles.shareButtonText}>Share Recipe</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'black', 
  },
  submitButton: {
    backgroundColor: '#373F51',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submittedMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  shareButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  shareButtonText: {
    color: '#282828',
    fontSize: 18,
    fontWeight: 'bold',
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
