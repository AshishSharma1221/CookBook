import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth'; 
import { app } from './firebase'; 

const UserProfileScreen = ({ navigation }) => {
  const auth = getAuth(app); 
  const user = auth.currentUser; 

  const handleSignOut = async () => {
    try {
      await auth.signOut(); 
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>User Profile</Text>
        <Text style={styles.profileText}>Email: {user.email}</Text>
        <Text style={styles.profileText}>Phone: 123-456-7890</Text>
        <Text style={styles.profileText}>User: Test User</Text>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'pink',
  },
  card: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileText: {
    marginBottom: 10,
    fontSize: 18,
  },
});

export default UserProfileScreen;
