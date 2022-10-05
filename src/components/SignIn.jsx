import Text from "./Text";
import {Pressable, StyleSheet, View} from "react-native";
import FormikTextInput from "./FormikTextInput";
import {Formik} from "formik";
import theme from "../theme";

const onSubmit = (values) => {
	console.log(values);
};

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
	}
})

const SignInForm = ({onSubmit}) => {
	return (
		<View style={styles.formContainer} fullwidth>
			<FormikTextInput name={"username"} placeholder={"Username"} style={styles.inputField}/>
			<FormikTextInput name={"password"} placeholder={"Password"} style={styles.inputField} secureTextEntry />
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text fontSize={"subheading"} style={{marginVertical: 10, color: "white"}}>Sign in</Text>
			</Pressable>
		</View>
	)
};

const SignIn = () => {
	const initialValues = {
		username: '',
		password: ''
	}
	return (
		<View style={{backgroundColor: "white"}}>
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{({handleSubmit}) => <SignInForm onSubmit={handleSubmit} /> }
			</Formik>
		</View>
	)
}

export default SignIn;