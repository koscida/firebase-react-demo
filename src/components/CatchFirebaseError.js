const catchFirebaseError = (error, setError) => {
	if (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
		setError(errorMessage);
	}
};

export default catchFirebaseError;
