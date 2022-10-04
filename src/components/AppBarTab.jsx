import {Pressable, Text, StyleSheet} from "react-native";
import {Link} from "react-router-native";

const styles = StyleSheet.create({
	text: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'white',
		paddingHorizontal: 10
	}
});

const AppBarTab = (props) => {
	return (
		<Pressable hitSlop={3}>
			<Link to={props.navigateTo}>
				<Text style={styles.text}>
					{props.text}
				</Text>
			</Link>
		</Pressable>
	);
};

export default AppBarTab