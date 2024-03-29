import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeListScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const sectionListRef = useRef(null);
  const [orientation, setOrientation] = useState('portrait');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const navigation = useNavigation(); 
  const [availableLetters, setAvailableLetters] = useState([...alphabet]);

  useEffect(() => {
    fetchRecipes();
    const getOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width < height ? 'portrait' : 'landscape');
    };
    getOrientation();
    const dimensionsChangeHandler = () => {
      getOrientation();
    };
    Dimensions.addEventListener('change', dimensionsChangeHandler);
    return () => {};
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      let currentLetter = 'a';
      while (currentLetter <= 'z') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${currentLetter}`);
        const data = await response.json();
        if (data.meals) {
          setRecipes(prevRecipes => [...prevRecipes, ...data.meals]);
        }
        currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedRecipes = () => {
    const sectionMap = recipes.reduce((acc, recipe) => {
      const firstLetter = recipe.strMeal.charAt(0).toUpperCase();
      acc[firstLetter] = acc[firstLetter] || [];
      acc[firstLetter].push(recipe);
      return acc;
    }, {});

    const sections = Object.entries(sectionMap)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([letter, data], index) => ({ title: letter, data, index }));

    return sections;
  };

  const scrollToSection = (index) => {
    if (sectionListRef.current && index !== undefined) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0, 
        animated: true, 
      });
    }
  };  

  const renderSectionHeader = ({ section }) => (
    <TouchableOpacity style={styles.sectionHeader} onPress={() => scrollToSection(section.index)}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
      <Text style={styles.recipeName}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe }); 
  };

  const handleLetterPress = (letter) => {
    const sections = groupedRecipes();
    const sectionIndex = sections.findIndex(section => section.title === letter);
    if (sectionIndex !== -1) {
      scrollToSection(sectionIndex);
    } else {
      console.warn(`Section index not found for letter: ${letter}`);
      console.log(groupedRecipes());
    }
    const availableLetters = sections.map(section => section.title);
    const filteredAlphabet = alphabet.split('').filter(letter => availableLetters.includes(letter));
    setAvailableLetters(filteredAlphabet);
  };  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={orientation === 'portrait' ? require('../Images/portrait_bg.png') : require('../Images/landscape_bg.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <SectionList
            ref={sectionListRef}
            sections={groupedRecipes()}
            keyExtractor={(item, index) => item.idMeal + index}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
          />
          {loading && <Text>Loading...</Text>}
          <View style={styles.sliderContainer}>
            {availableLetters.map(letter => (
              <TouchableOpacity
                key={letter}
                style={styles.sliderItem}
                onPress={() => handleLetterPress(letter)}
              >
                <Text style={styles.sliderItemText}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  recipeItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recipeName: {
    fontSize: 16,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    paddingTop: 1, 
    width: 40, 
  },
  sliderItem: {
    paddingVertical: 4,
  },
  sliderItemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipeListScreen;
