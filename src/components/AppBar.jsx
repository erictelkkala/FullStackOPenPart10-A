import {View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: Constants.statusBarHeight * 1.5,
		padding: Constants.statusBarHeight,
		backgroundColor: '#24292e',
	}
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			{/*Makes it possible to scroll the tabs horizontally when they go out of view*/}
			<ScrollView horizontal>
				<AppBarTab text={'Repositories'} navigateTo={"/"} />
				<AppBarTab text={"Sign In"} navigateTo={"/signin"} />
			</ScrollView>
		</View>
	);
};

export default AppBar;