import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link } from "@react-navigation/native";

import styles from "../styles";

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: "100%" }}
				keyboardShouldPersistTaps="always"
			>
				<Link to={{ screen: "Notifications" }} style={styles.footerLink}>
					Notifications
				</Link>
				<Link to={{ screen: "Profile" }} style={styles.footerLink}>
					Profile
				</Link>
				<Link to={{ screen: "Settings" }} style={styles.footerLink}>
					Settings
				</Link>
			</KeyboardAwareScrollView>
		</View>
	);
};

export default HomeScreen;
