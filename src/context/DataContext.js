import createDataContext from "./createDataContext";
import { auth, db } from "../firebase/config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { navigate } from "../navigationService";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import catchFirebaseError from "../components/CatchFirebaseError";

const dataReducer = (state, action) => {
	switch (action.type) {
		case "signin":
			return { errorMessage: "", user: action.payload };
		case "signup":
			return { errorMessage: "", user: action.payload };
		case "add_error":
			return { ...state, errorMessage: action.payload };
		case "clear_error_message":
			return { ...state, errorMessage: "" };
		default:
			return state;
	}
};

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: "clear_error_message" });
};

const isSignedIn = (dispatch) => () => {
	onAuthStateChanged(auth, (userCred) => {
		if (userCred) {
			dispatch({ type: "signin", payload: userCred });
			navigate("Home");
		} else {
			navigate("Registration");
		}
	});
};

const signin =
	(dispatch) =>
	({ email, password }) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log("> signInWithEmailAndPassword");

				// Signed in
				const user = userCredential.user;
				dispatch({ type: "signin", payload: user });
				navigate("Index");
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);
				if (errorCode === "auth/wrong-password") {
					dispatch({
						type: "add_error",
						payload: "Incorrect Password",
					});
				} else if (errorCode === "auth/invalid-email") {
					dispatch({
						type: "add_error",
						payload: "Invalid Email",
					});
				} else {
					dispatch({
						type: "add_error",
						payload: error.code,
					});
				}
			});
	};

const signup =
	(dispatch) =>
	({ fullName, email, password }) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				console.log("> createUserWithEmailAndPassword");
				// Signed in
				const user = userCredential.user;
				const uid = user.uid;
				// create user data to update
				const userData = {
					id: uid,
					email,
					fullName,
				};
				// get doc
				const docRef = doc(db, "users", uid);
				// update doc
				await setDoc(docRef, userData, { merge: true }).then(() => {
					// success
					console.log("> Success");
					console.log(userData);
				});

				dispatch({ type: "signup", payload: user });
				navigate("Registration");
			})
			.catch((error) => {
				const code = error.code;
				if (code === "auth/email-already-in-use") {
					dispatch({
						type: "add_error",
						payload: "Email already in use",
					});
				} else if (code === "auth/invalid-email") {
					dispatch({
						type: "add_error",
						payload: "Invalid email",
					});
				} else if (code === "auth/weak-password") {
					dispatch({
						type: "add_error",
						payload: "Weak password",
					});
				} else {
					dispatch({
						type: "add_error",
						payload: error.code,
					});
				}
			});
	};

const signout = (dispatch) => () => {
	signOut(auth)
		.then(() => {
			dispatch({ type: "signin" });
			navigate("Signin");
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: "add_error",
				payload: err.code,
			});
		});
};

export const { Context, Provider } = createDataContext(
	dataReducer,
	{ signup, signin, isSignedIn, signout, clearErrorMessage },
	{ user: null, errorMessage: "" }
);
