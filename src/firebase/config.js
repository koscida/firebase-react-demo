import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyAr76CqlcApOGvprCHN_mbytGx8wdC7pHY",

	authDomain: "expo-demo-ba2ea.firebaseapp.com",

	projectId: "expo-demo-ba2ea",

	storageBucket: "expo-demo-ba2ea.appspot.com",

	messagingSenderId: "808020676843",

	appId: "1:808020676843:web:de19fb5044efd5ddd56eae",

	measurementId: "G-V5ZV8YVC1T",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
