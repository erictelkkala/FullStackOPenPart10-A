import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: Constants.statusBarHeight * 1.5,
		padding: Constants.statusBarHeight,
		backgroundColor: '#24292e',
		alignContent: "center"
	}
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<AppBarTab text={'Repositories'} />
		</View>
	);
};

export default AppBar;