import Text from "./Text";
import {Pressable, StyleSheet, View} from "react-native";
import FormikTextInput from "./FormikTextInput";
import {Formik} from "formik";
import theme from "../theme";
import * as yup from 'yup';

import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";


export const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, 'The username must be at least 3 characters long')
		.required('Username is required'),
	password: yup
		.string()
		.min(5, 'The password must be at least 5 characters long')
		.required('Password is required'),
});

const styles = StyleSheet.create({
	formContainer: {
		marginHorizontal: 10,
		marginVertical: 5,
	},
	submitButton: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 5
	},
	inputField: {
		borderStyle: "solid",
		borderColor: theme.colors.textSecondary,
		borderWidth: 1,
		borderRadius: 5,
		marginVertical: 10,
		height: 35,
		padding: 10,
		placeholderTextColor: theme.colors.textSecondary
	}
})

export const SignInForm = ({onSubmit}) => {
	return (
		<View style={styles.formContainer} fullwidth testID={"SignInForm"}>
			<FormikTextInput name={"username"} placeholder={"Username"} style={styles.inputField} testID={"usernameInput"}/>
			<FormikTextInput name={"password"} placeholder={"Password"} style={styles.inputField} secureTextEntry testID={"passwordInput"}/>
			<Pressable onPress={onSubmit} style={styles.submitButton} testID={"submitButton"}>
				<Text fontSize={"subheading"} style={{marginVertical: 10, color: "white"}}>Sign in</Text>
			</Pressable>
		</View>
	)
};

const SignIn = () => {
	// Declare the hook
	const [signIn] = useSignIn();
	// useNavigate hook
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		// Get the username and password from the values
		const {username, password} = values;
		try {
			// Try to sign in
			await signIn({ username, password });
			// Navigate to the main page on a successful sign in
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	};

	const initialValues = {
		username: '',
		password: ''
	}

	return (
		<View style={{backgroundColor: "white"}}>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{({handleSubmit}) => <SignInForm onSubmit={handleSubmit} /> }
			</Formik>
		</View>
	)
}

export default SignIn;