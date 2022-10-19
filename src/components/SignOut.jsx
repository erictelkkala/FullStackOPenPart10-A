import {Pressable} from "react-native";
import Text from "./Text";
import {StyleSheet} from "react-native";
import theme from "../theme";
import {useNavigate} from "react-router-native";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
	submitButton: {
		backgroundColor: theme.colors.primary,
		padding: 15,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 5
	}
});

const SignOut = () => {
	const navigate = useNavigate();
	// Sign out hook
	const signOutHook = useSignOut();
	const signOut = async () => {
		console.log("Signing out...");
		await signOutHook();
		// Navigate to the home page
		navigate("/");
	};

	return (
		<Pressable onPress={signOut} style={styles.submitButton}>
			<Text fontSize={"subheading"} style={{marginVertical: 10, color: "white"}}>Sign out</Text>
		</Pressable>
	);
};

export default SignOut;