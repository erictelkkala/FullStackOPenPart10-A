import {Image, Pressable, StyleSheet, View} from "react-native";
import Text from "./Text"
import { useNavigate} from "react-router-native";
import theme from "../theme";

const styles =StyleSheet.create({
	container: {
		flexDirection: "column",
		flexGrow: 0,
		padding: 15,
		backgroundColor: "white"
	}
})

const ItemHeaderStyles = StyleSheet.create({
	repositoryPicture: {
		width: 60,
		height: 60,
		borderRadius: 10,
		padding: 10
	},
	pictureContainer: {
		flexGrow: 0,
		paddingRight: 15
	},
	itemHeaderContainer: {
		flexDirection: 'row',
		flexShrink: 1
	},
	textContainer: {
		justifyContent: "space-around",
		flexDirection: "column",
		flexShrink: 1
	},
	languageBlock : {
		//Align the block to start at the same point as the name and description
		paddingLeft: 75,
		paddingTop: 10,
		flexDirection: "row"
	},
	languageBlockText : {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 2.5,
		paddingBottom: 2.5,
		color: "white",
	}
})

const StatStyles = StyleSheet.create({
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		paddingTop: 10
	},
	valueContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	}
})

export const RepositoryItemHeader = ({item}) => {
	const navigate = useNavigate();
	return (
		<Pressable onPress={() => navigate(`/${item.id}`)}>
			<View style={ItemHeaderStyles.itemHeaderContainer} testID={"repositoryItemHeader"}>
				<View style={ItemHeaderStyles.pictureContainer}>
					<Image style={ItemHeaderStyles.repositoryPicture} source={{uri: item.ownerAvatarUrl}} />
				</View>
				<View style={ItemHeaderStyles.textContainer}>
					<Text fontWeight={"bold"} fontSize={"subheading"}>
						{item.fullName}
					</Text>
					<Text color={"textSecondary"}>
						{item.description}
					</Text>
				</View>
			</View>
		</Pressable>
	)
}

export const LanguageBlock = ({language}) => {
	return (
		<View style={ItemHeaderStyles.languageBlock} testID={"repositoryItemLanguage"}>
			<Text style={ItemHeaderStyles.languageBlockText}>
				{language}
			</Text>
		</View>
	)
}

export const RepositoryStats = ({item}) => {
	let stargazers = 0;
	let forks = 0;

	//If there is more than 1000 startgazers, divide the number by 1000 for a better format later on
	if (item.stargazersCount > 1000) {
		stargazers = item.stargazersCount/1000
	} else {
		stargazers = item.stargazersCount
	}

	//Do the same for forks
	if (item.forksCount > 1000) {
		forks = item.forksCount/1000
	} else {
		forks = item.forksCount
	}
	return (
		<View style={StatStyles.statsContainer} testID={"RepositoryItemStats"}>
			<View style={StatStyles.valueContainer}>
				<Text fontWeight={"bold"} color={"textPrimary"}>
					{stargazers.toFixed(1)}k
				</Text>
				<Text>
					Stars
				</Text>
			</View>
			<View style={StatStyles.valueContainer}>
				<Text fontWeight={"bold"} color={"textPrimary"}>
					{forks.toFixed(1)}k
				</Text>
				<Text>
					Forks
				</Text>
			</View>
			<View style={StatStyles.valueContainer}>
				<Text fontWeight={"bold"} color={"textPrimary"}>
					{item.reviewCount}
				</Text>
				<Text>
					Reviews
				</Text>
			</View>
			<View style={StatStyles.valueContainer}>
				<Text fontWeight={"bold"} color={"textPrimary"}>
					{item.ratingAverage}
				</Text>
				<Text>
					Rating
				</Text>
			</View>
		</View>
	)
}

const RepositoryItem = ({item}) => {
	return (
		<View style={styles.container} testID={"repositoryItem"}>
			<RepositoryItemHeader item={item} />
			<LanguageBlock language={item.language} />
			<RepositoryStats item={item} />
		</View>
	)
}

export default RepositoryItem