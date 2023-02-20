import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "../styles";

const ProfileScreen = () => {
	const [error, setError] = useState("");

	// create components...inverse controlled components or something
	const LogoutButton = () => {
		const onLogoutPress = () => {
			console.log("> onLogoutPress");
			// signout
			signOut(auth)
				.then(() => {
					// Sign-out successful.
					console.log("Logout successful");
					// set null user
					setUser(getCurrentUser());
				})
				.catch((error) => catchFirebaseError(error, setError));
		};

		return (
			<TouchableOpacity style={styles.button} onPress={onLogoutPress}>
				<Text style={styles.buttonTitle}>Log out</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: "100%" }}
				keyboardShouldPersistTaps="always"
			>
				<LogoutButton />
			</KeyboardAwareScrollView>
		</View>
	);
};

export default ProfileScreen;
