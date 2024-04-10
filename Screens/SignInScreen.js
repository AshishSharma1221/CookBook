import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../Firebase/firebase'; 

const SignInScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  const handleSignIn = async () => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('MainStack', { screen: 'RecipeList' });
    } catch (error) {
      console.log('Error signing in:', error.message);
      setErrorMessage('Wrong credentials, Please try again!'); // Setting error message
    }
  };  

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.card, isDarkMode && styles.cardDark]}>
        <Text style={[styles.cardTitle, isDarkMode && styles.cardTitleDark]}>Sign In</Text>
        <Text style={[styles.label, isDarkMode && styles.labelDark]}>Email:</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Text style={[styles.label, isDarkMode && styles.labelDark]}>Password:</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errorMessage && ( // Conditionally rendering error message
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <TouchableOpacity style={[styles.signInButton, isDarkMode && styles.signInButtonDark]} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Subtle background color
  },
  containerDark: {
    backgroundColor: '#000', // Dark background color
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardDark: {
    backgroundColor: '#333', // Dark card background color
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#841584', // Title color
  },
  cardTitleDark: {
    color: '#fff', // Dark title color
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Label color
  },
  labelDark: {
    color: '#fff', // Dark label color
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9', // Input background color
    width: 300, // Fixed width for the input fields
  },
  inputDark: {
    backgroundColor: '#666', // Dark input background color
    color: '#fff', // Dark input text color
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#841584',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signInButtonDark: {
    backgroundColor: '#321f2f', // Dark button background color
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
