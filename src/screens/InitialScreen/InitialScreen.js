import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Context } from "../../context/DataContext";

const InitialScreen = () => {
	const { isSignedIn } = useContext(Context);
	useEffect(() => {
		isSignedIn();
	}, []);
	return null;
};

export default InitialScreen;

const styles = StyleSheet.create({});
