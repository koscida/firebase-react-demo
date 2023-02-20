import React, { useState, useContext, useEffect } from "react";
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import catchFirebaseError from "../../components/CatchFirebaseError";
import { Context } from "../../context/DataContext";
import styles from "../styles";

const RegistrationScreen = ({ navigation }) => {
	const { state, signin, signup, clearErrorMessage } = useContext(Context);
	// const [error, setError] = useState("");
	const [isRegistering, setIsRegistering] = useState(true);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		return navigation.addListener("focus", () => {
			clearErrorMessage();
		});
	}, [navigation]);

	const onFooterLinkPress = () => {
		console.log("> onFooterLinkPress");
		setIsRegistering(!isRegistering);
	};

	const onSubmit = () => {
		isRegistering ? signup(fullName, email, password) : signin(email, password);
	};

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<KeyboardAwareScrollView
					style={{ flex: 1, width: "100%" }}
					keyboardShouldPersistTaps="always"
				>
					{state.errorMessage && (
						<View>
							<Text style={styles.error}>{state.errorMessage}</Text>
						</View>
					)}

					{isRegistering && (
						<TextInput
							style={styles.input}
							placeholder="Full Name"
							placeholderTextColor="#aaaaaa"
							onChangeText={(text) => setFullName(text)}
							value={fullName}
							underlineColorAndroid="transparent"
							autoCapitalize="none"
						/>
					)}

					<TextInput
						style={styles.input}
						placeholder="E-mail"
						placeholderTextColor="#aaaaaa"
						onChangeText={(text) => setEmail(text)}
						value={email}
						underlineColorAndroid="transparent"
						autoCapitalize="none"
					/>
					<TextInput
						style={styles.input}
						placeholderTextColor="#aaaaaa"
						secureTextEntry
						placeholder="Password"
						onChangeText={(text) => setPassword(text)}
						value={password}
						underlineColorAndroid="transparent"
						autoCapitalize="none"
					/>
					{isRegistering && (
						<TextInput
							style={styles.input}
							placeholderTextColor="#aaaaaa"
							secureTextEntry
							placeholder="Confirm Password"
							onChangeText={(text) => setConfirmPassword(text)}
							value={confirmPassword}
							underlineColorAndroid="transparent"
							autoCapitalize="none"
						/>
					)}

					<TouchableOpacity style={styles.button} onPress={onSubmit}>
						<Text style={styles.buttonTitle}>Create account</Text>
					</TouchableOpacity>

					<View style={styles.footerView}>
						<Text style={styles.footerText}>
							{isRegistering ? (
								<>
									Already got an account?{" "}
									<Text onPress={onFooterLinkPress} style={styles.footerLink}>
										Log in
									</Text>
								</>
							) : (
								<>
									Need to create an account?{" "}
									<Text onPress={onFooterLinkPress} style={styles.footerLink}>
										Create Account
									</Text>
								</>
							)}
						</Text>
					</View>
				</KeyboardAwareScrollView>
			</View>
		</SafeAreaView>
	);
};

export default RegistrationScreen;
