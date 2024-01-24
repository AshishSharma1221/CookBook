
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
function HomeScreen() {
return (
<View style={styles.container}>
<Text style={styles.text}>Home Data</Text>
</View>
);
}
function SearchScreen() {
return (
<View style={styles.container}>
<Text style={styles.text}>Search Data </Text>
</View>
);
}
function ProfileScreen() {
return (
<View style={styles.container}>
<Text style={styles.text}>Profile Data</Text>
</View>
);
}
const Tab = createBottomTabNavigator();
export default function ReactNavigationBottomTabs() {
return (
  <NavigationContainer>
<Tab.Navigator
tabBarOptions={
{
// Default Color is blue you can change it by following props
// activeTintColor: '#ff4757',
// inactiveTintColor: '#ff6b81',
// Default Background Color is white you can change it by following props
// activeBackgroundColor: '#ced6e0',
// inactiveBackgroundColor: '#ced6e0',
}
}
>
<Tab.Screen
name='Home'
component={HomeScreen}
options={{
tabBarIcon: ({ color, size }) => (
<Icon name='home' color={color} size={size} />
),
}}
/>
<Tab.Screen
name='Search'
component={SearchScreen}
options={{
tabBarIcon: ({ color, size }) => (
<Icon name='message' color={color} size={size} />
),
}}
/>
<Tab.Screen
name='Profile'
component={ProfileScreen}
options={{
tabBarIcon: ({ color, size }) => (
<Icon name='person' color={color} size={size} />
),
}}
/>
</Tab.Navigator>
</NavigationContainer>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
},
text: {
fontSize: 40,
fontWeight: 'bold',
},
});