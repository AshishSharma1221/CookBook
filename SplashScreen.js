import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import RecipeListScreen from './RecipeListScreen';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./splash-screen.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  return <RecipeListScreen />;
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
});

export default SplashScreen;
