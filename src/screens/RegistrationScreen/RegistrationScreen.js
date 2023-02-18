import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegistrationScreen = () => {
	const [error, setError] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const onFooterLinkPress = () => {
		console.log("> onFooterLinkPress");
	};

	const onRegisterPress = () => {
		console.log("> onRegisterPress");
		// error checks
		if (fullName === "") {
			setError("Full Name is mandatory");
			return;
		} else if (email === "") {
			setError("Email is mandatory");
			return;
		} else if (password === "" || confirmPassword === "") {
			setError("Password is mandatory");
			return;
		} else if (password != confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		// passed checks, create account
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (response) => {
				console.log("> createUserWithEmailAndPassword");
				setError("Processing...");
				const uid = response.user.uid;
				const user = response.user;
				const userData = {
					id: uid,
					email,
					fullName,
				};
				const docRef = doc(db, "users", uid);
				await setDoc(docRef, userData, { merge: true }).then(() => {
					console.log("> Success");
					setError("Success");
					console.log(userData);
				});
			})
			.catch((error) => {
				if (error) {
					const errorCode = error.code;
					const errorMessage = error.message;
					setError(errorMessage);
				}
			});
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: "100%" }}
				keyboardShouldPersistTaps="always"
			>
				{error && (
					<View style={styles.error}>
						<Text>{error}</Text>
					</View>
				)}

				<TextInput
					style={styles.input}
					placeholder="Full Name"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setFullName(text)}
					value={fullName}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
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
				<TouchableOpacity
					style={styles.button}
					onPress={() => onRegisterPress()}
				>
					<Text style={styles.buttonTitle}>Create account</Text>
				</TouchableOpacity>
				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						Already got an account?{" "}
						<Text onPress={onFooterLinkPress} style={styles.footerLink}>
							Log in
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};

export default RegistrationScreen;
