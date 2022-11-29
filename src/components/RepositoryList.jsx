import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import React from 'react';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

export const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		return (
			<View>
				<Searchbar
					placeholder="Search"
					onChangeText={this.props.setSearchQuery}
					value={this.props.searchQuery}
				/>
				<Picker
					testID='orderByPicker'
					selectedValue={this.props.selectedValue}
					onValueChange={this.props.onSort}
				>
					<Picker.Item label="Latest repositories" value="Latest" />
					<Picker.Item label="Highest rated repositories" value="Highest" />
					<Picker.Item label="Lowest rated repositories" value="Lowest" />
				</Picker>
			</View>
		);
	};

	repositoryNodes = () => {
		const props = this.props;
		// console.log(repositories);
		const repositoryNodes = props.repositories
		? props.repositories.edges.map(edge => edge.node)
		: [];

		return ({repositoryNodes});
		// console.log('repositoryNodes:', repositoryNodes);
	};

	render() {
		return (
			// Render the list of repositories
			// Set the key to the fullName of the repository
			<FlatList
				data={this.repositoryNodes().repositoryNodes}
				ListHeaderComponent={this.renderHeader}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => <RepositoryItem item={item} />}
				keyExtractor={item => item.fullName}
			/>
		);
	}
}

const RepositoryList = () => {
	const [selectedValue, setSelectedValue] = useState("Latest");
	const [orderBy, setOrderBy] = useState(["CREATED_AT", "DESC"]);
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

	// Query the API with arguments
	const { repositories, loading } = useRepositories({ orderBy: orderBy[0], orderDirection: orderBy[1], searchKeyword: debouncedSearchQuery });
	// console.log(repositories);


	// Wait for the data to be fetched
	if (loading && !repositories) {
		return <Text>Loading...</Text>;
	} else {
		return <RepositoryListContainer
			repositories={repositories}
			searchQuery={searchQuery}
			setSearchQuery={setSearchQuery}
			selectedValue={selectedValue}
			onSort={(itemValue) => {
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
		/>;
	}
};

export default RepositoryList;