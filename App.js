import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "./src/context/DataContext";
import { setNavigator } from "./src/navigationService";
import InitialScreen from "./src/screens/InitialScreen/InitialScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen/NotificationsScreen";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";

// app stack
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		// // Use a Provider to pass the current theme to the tree below.
		// https://codereview.stackexchange.com/questions/274541/react-native-login-sign-up-and-sign-out-using-firebase-project
		<Provider>
			<NavigationContainer
				ref={(navigator) => {
					setNavigator(navigator);
				}}
			>
				<Stack.Navigator>
					<Stack.Screen name="Initial" component={InitialScreen} />
					<Stack.Screen name="Registration" component={RegistrationScreen} />
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Notifications" component={NotificationsScreen} />
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen name="Settings" component={SettingsScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
