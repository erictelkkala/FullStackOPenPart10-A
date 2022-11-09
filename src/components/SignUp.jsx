import * as yup from 'yup';
import { View, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import FormikTextInput from "./FormikTextInput";
import {Formik} from "formik";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from 'react-router-native';
import { ErrorMessage } from './ReviewForm';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';


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

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, 'The username must be at least 3 characters long')
		.required('Username is required'),
	password: yup
		.string()
		.min(5, 'The password must be at least 5 characters long')
		.required('Password is required'),
    // Confirm that the password and passwordConfirmation are the same
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')
});

const SignUpForm = ({onSubmit}) => {
	return (
		<View style={styles.formContainer} fullwidth testID={"SignInForm"}>
			<FormikTextInput name={"username"} placeholder={"Username"} style={styles.inputField} testID={"usernameInput"}/>
			<FormikTextInput name={"password"} placeholder={"Password"} style={styles.inputField} secureTextEntry testID={"passwordInput"}/>
            <FormikTextInput name={"passwordConfirmation"} placeholder={"Password Confirmation"} style={styles.inputField} secureTextEntry testID={"passwordConfirmationInput"}/>
			<Pressable onPress={onSubmit} style={styles.submitButton} testID={"submitButton"}>
				<Text fontSize={"subheading"} style={{marginVertical: 10, color: "white"}}>Sign up</Text>
			</Pressable>
		</View>
	)
};

const SignUp = () => {
	// useNavigate hook
	const navigate = useNavigate();

	// Hooks
	const [signUp, {error}] = useSignUp();
	const [signIn] = useSignIn();

	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = async (values) => {
		const { username, password } = values;
		try {
			// Sign up the user
			await signUp({ username, password });

			//  If the username is already taken, the server will return an error
			if (!error) {
				console.log('Sign up successful for: ', username);

				// Sign in the user
				await signIn({ username, password });
				// Navigate to the main page on a successful sign in
				navigate('/');

			} else {
				setErrorMessage('Username is already taken');
				setTimeout(() => {
					setErrorMessage('');
				}, 5000);
			}
		} catch (e) {
			setErrorMessage(e.message);
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
		}
	};

	const initialValues = {
		username: '',
		password: ''
	}

	return (
		<View style={{backgroundColor: "white"}}>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} /> }
			</Formik>
			{errorMessage ? ErrorMessage(errorMessage) : null}
		</View>
	)
}

export default SignUp;