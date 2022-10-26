import {FlatList, Linking, Pressable, StyleSheet, View} from "react-native";
import Text from "./Text"
import theme from "../theme";
import { RepositoryItemHeader, RepositoryStats, LanguageBlock} from "./RepositoryItem";
import {ItemSeparator} from "./RepositoryList";
import {format} from "date-fns";

const styles =StyleSheet.create({
	container: {
		flexDirection: "column",
		flexGrow: 0,
		padding: 15,
		marginBottom: 10,
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
	},
	reviewContainer: {
		flexDirection: "row",
		flexGrow: 0,
		padding: 15,
		backgroundColor: "white"
	},
	reviewScore: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		width: 50,
		// borderRadius should be width / 2
		borderRadius: 25,
		borderWidth: 3,
		borderColor: theme.colors.primary,
	},
	reviewInfo: {
		flexDirection: "column",
		flexShrink: 1,
		paddingLeft: 15
	}
})

const ReviewItem = ({review}) => {
	// Format the date to be more readable
	const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");
	return (
		<View style={styles.reviewContainer} testID={"reviewItem"}>
			{/*Place for the review score*/}
			<View style={styles.reviewScore}>
				<Text fontWeight="bold" fontSize={"subheading"} style={{color:theme.colors.primary}} testID={"reviewItemRating"}>{review.rating}</Text>
			</View>
			{/*Rest of the information*/}
			<View style={styles.reviewInfo}>
				<Text fontWeight={"bold"}>{review.user.username}</Text>
				<Text color={"textSecondary"}>{formattedDate}</Text>
				<Text>{review.text}</Text>
			</View>
		</View>
	)
}


const RepositoryInfo = ({item}) => {
	return (
		<View style={styles.container} testID={"repositoryItem"}>
			<RepositoryItemHeader item={item} />
			<LanguageBlock language={item.language} />
			<RepositoryStats item={item} />
			{/*Link to open a browser window to GitHub*/}
			<Pressable style={styles.gitHubButton} onPress={() => Linking.openURL(item.url)}>
				<Text style={{color: "white"}} fontWeight={"bold"}>Open in GitHub</Text>
			</Pressable>
		</View>
	)
}

const RepositoryItem = ({item}) => {
	const reviews = item
		? item.reviews.edges.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={reviews}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <RepositoryInfo item={item} />}
			ItemSeparatorComponent={ItemSeparator}
		/>
	)
}

export default RepositoryItem