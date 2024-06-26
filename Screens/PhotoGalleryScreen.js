import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Modal, SafeAreaView, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PhotoGalleryScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setIngredients(data.meals || []);
      setFilteredIngredients(data.meals || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = ingredients.filter((ingredient) =>
      ingredient.strIngredient.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };

  const handleIngredientPress = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
  };

  const renderIngredientItem = ({ item }) => (
    <TouchableOpacity style={styles.ingredientItem} onPress={() => handleIngredientPress(item)}>
      <Image source={{ uri: `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }} style={styles.ingredientImage} />
      <Text style={[styles.ingredientName, isDarkMode && styles.ingredientNameDark]}>{item.strIngredient}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
          placeholder="Search ingredients..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredIngredients}
        keyExtractor={(item) => item.strIngredient}
        renderItem={renderIngredientItem}
        contentContainerStyle={styles.listContent}
      />
      <Modal visible={!!selectedIngredient} transparent={true} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {selectedIngredient && (
                  <>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                      <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <Image source={{ uri: `https://www.themealdb.com/images/ingredients/${selectedIngredient.strIngredient}.png` }} style={styles.modalImage} />
                    <Text style={[styles.modalIngredientName, isDarkMode && styles.modalIngredientNameDark]}>{selectedIngredient.strIngredient}</Text>
                    <Text style={[styles.modalIngredientDescription, isDarkMode && styles.modalIngredientDescriptionDark]}>{selectedIngredient.strDescription}</Text>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerDark: {
    backgroundColor: '#000',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchInputDark: {
    backgroundColor: '#333',
    color: '#fff',
  },
  listContent: {
    padding: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientNameDark: {
    color: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalIngredientName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalIngredientNameDark: {
    color: '#fff',
  },
  modalIngredientDescription: {
    fontSize: 16,
  },
  modalIngredientDescriptionDark: {
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
});

export default PhotoGalleryScreen;
