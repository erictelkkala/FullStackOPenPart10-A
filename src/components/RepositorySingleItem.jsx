import {  Linking, Pressable, StyleSheet, View} from "react-native";
import Text from "./Text"
import theme from "../theme";
import { RepositoryItemHeader, RepositoryStats, LanguageBlock} from "./RepositoryItem";

const styles =StyleSheet.create({
	container: {
		flexDirection: "column",
		flexGrow: 0,
		padding: 15,
		backgroundColor: "white"
	},
	gitHubButton: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginTop: 10,
		justifyContent: "center",
		alignItems: "center"
	}
})


const RepositoryItem = ({item}) => {
	return (
		<View style={styles.container} testID={"repositoryItem"}>
			<RepositoryItemHeader item={item} />
			<LanguageBlock language={item.language} />
			<RepositoryStats item={item} />
			<Pressable style={styles.gitHubButton} onPress={() => Linking.openURL(item.url)}>
				<Text style={{color: "white"}} fontWeight={"bold"}>Open in GitHub</Text>
			</Pressable>
		</View>
	)
}

export default RepositoryItem