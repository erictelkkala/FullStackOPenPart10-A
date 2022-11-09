import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, OrderBy }) => {
	// console.log(repositories);
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	// console.log('repositoryNodes:', repositoryNodes);

	return (
		// Render the list of repositories
		// Set the key to the fullName of the repository
		<FlatList
			data={repositoryNodes}
			ListHeaderComponent={OrderBy}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <RepositoryItem item={item} />}
			keyExtractor={item => item.fullName}
		/>
	);
}

const RepositoryList = () => {
	const [selectedValue, setSelectedValue] = useState("Latest");
	const [orderBy, setOrderBy] = useState(["CREATED_AT", "DESC"]);

	// Query the API with arguments
	const { repositories, loading } = useRepositories({ orderBy: orderBy[0], orderDirection: orderBy[1] });
	// console.log(repositories);


	// OrderBy component
	const OrderBy = () => {
		return (
			<Picker
				testID='orderByPicker'
				selectedValue={selectedValue}
				onValueChange={(itemValue) => {
					// Set the selected value
					setSelectedValue(itemValue);
					// Set the order with a case statement
					switch (itemValue) {
						case 'Latest':
							setOrderBy(["CREATED_AT", "DESC"]);
							break;
						case 'Highest':
							setOrderBy(["RATING_AVERAGE", "DESC"]);
							break;
						case 'Lowest':
							setOrderBy(["RATING_AVERAGE", "ASC"]);
							break;
						default:
							setOrderBy(["CREATED_AT", "DESC"]);
							break;
					}
				}}
			>
				<Picker.Item label="Latest repositories" value="Latest" />
				<Picker.Item label="Highest rated repositories" value="Highest" />
				<Picker.Item label="Lowest rated repositories" value="Lowest" />
			</Picker>
		);
	};

	// Wait for the data to be fetched
	if (loading && !repositories) {
		return <Text>Loading...</Text>;
	} else {
		return <RepositoryListContainer repositories={repositories} OrderBy={OrderBy}/>;
	}
};

export default RepositoryList;