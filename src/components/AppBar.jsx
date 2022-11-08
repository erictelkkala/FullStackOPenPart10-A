import {View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from "./AppBarTab";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../graphql/queries";


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: Constants.statusBarHeight * 1.5,
		padding: Constants.statusBarHeight,
		backgroundColor: '#24292e',
	}
});

const AppBar = () => {
	// Get the authorized user
	// Also this needs to be updated when the user signs in or out
	const {data} = useQuery(GET_USER, {
		fetchPolicy: 'cache-and-network',
	});

	return (
		<View style={styles.container}>
			{/*Makes it possible to scroll the tabs horizontally when they go out of view*/}
			<ScrollView horizontal>
				<AppBarTab text={'Repositories'} navigateTo={"/"} />
				{data?.me === null ?
					<AppBarTab text={"Sign in"} navigateTo={"/signin"} />
					:
					<>
						<AppBarTab text={"Create a review"} navigateTo={"/createreview"} />
						<AppBarTab text={"Sign out"} navigateTo={"/signout"}/>
					</>
				}
			</ScrollView>
		</View>
	);
};

export default AppBar;