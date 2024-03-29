import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SplashScreen from '../Screens/SplashScreen';
import RecipeListScreen from '../Screens/RecipeListScreen';
import RecipeDetailsScreen from '../Screens/RecipeDetailsScreen';
import CategoriesScreen from '../Screens/CategoriesScreen'; 
import FilteredRecipes from '../Screens/FilteredRecipes';
import SearchScreen from '../Screens/SearchScreen';
import PhotoGalleryScreen from '../Screens/PhotoGalleryScreen';
import SignInScreen from '../Screens/SignInScreen';
import UserProfileScreen from '../Screens/UserProfileScreen';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();

const RecipeListStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="RecipeList"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{ title: 'CookBook' }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={({ route }) => ({ title: route.params.recipe.strMeal })}
      />
      <Stack.Screen 
        name="FilteredRecipes"
        component={FilteredRecipes}
        options={({ route }) => ({ title: route.params.category })}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainStack"
            component={MainStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const MainStack = () => {
  const theme = useTheme();
  return (
    <MaterialBottomTab.Navigator
      initialRouteName="Recipes"
      shifting={true}
      barStyle={{ backgroundColor: theme.colors.primary }}
    >
      <MaterialBottomTab.Screen
        name="Recipes"
        component={RecipeListStack}
        options={{
          tabBarIcon: 'home',
          tabBarLabel: 'Recipes',
        }}
      />
      <MaterialBottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: 'magnify',
          tabBarLabel: 'Search',
        }}
      />
      <MaterialBottomTab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="bars" size={20} color={color} />,
          tabBarLabel: 'Categories',
        }}
      />

      <MaterialBottomTab.Screen
        name="PhotoGallery"
        component={PhotoGalleryScreen}
        options={{
          tabBarIcon: 'image',
          tabBarLabel: 'Gallery',
        }}
      />

      <MaterialBottomTab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: 'account',
          tabBarLabel: 'Profile',
        }}
      />
    </MaterialBottomTab.Navigator>
  );
};

export default App;
