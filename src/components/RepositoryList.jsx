import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
	const { repositories, loading } = useRepositories();
	// console.log(repositories);

	// Wait for the data to be fetched
	if (loading && !repositories) {
		return <Text>Loading...</Text>;
	} else {
		// console.log(repositories);
		const repositoryNodes = repositories
			? repositories.repositories.edges.map(edge => edge.node)
			: [];

		// console.log(repositoryNodes);

		return (
			// Render the list of repositories
			// Set the key to the fullName of the repository
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => <RepositoryItem item={item} />}
				keyExtractor={item => item.fullName}
			/>
		);
	}
};

export default RepositoryList;