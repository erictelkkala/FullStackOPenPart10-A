import {Pressable, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
	text: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'white'
	}
});

const AppBarTab = (props) => {
	return (
		<Pressable hitSlop={3}>
			<Text style={styles.text}>
				{props.text}
			</Text>
		</Pressable>
	);
};

export default AppBarTab