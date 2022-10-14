import useAuthStorage from "../hooks/useAuthStorage";
import {Alert, Pressable} from "react-native";
import apolloClient from "../utils/apolloClient";
import Text from "./Text";
import {StyleSheet} from "react-native";
import theme from "../theme";
import {useNavigate} from "react-router-native";

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
const authStorage = useAuthStorage();
const navigate = useNavigate();
const client = apolloClient();
const signOut = async () => {
	try{
		await authStorage.removeAccessToken();
		await client.resetStore();
		navigate("/");
		} catch (e) {
			Alert.alert(e.message);
		}
};

return (
	<Pressable onPress={signOut} style={styles.submitButton}>
		<Text fontSize={"subheading"} style={{marginVertical: 10, color: "white"}}>Sign out</Text>
	</Pressable>
);
};

export default SignOut;