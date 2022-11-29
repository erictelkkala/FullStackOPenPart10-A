import { useState, useEffect } from 'react';
import {GET_REPOSITORIES} from "../graphql/queries";
import {useQuery} from "@apollo/client";

const useRepositories = ({orderBy, orderDirection, searchKeyword}) => {
	const [repositories, setRepositories] = useState();
	const {data, error, loading} = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables: {orderBy, orderDirection, searchKeyword}
	});

	// Wait for data to be fetched before rendering
	useEffect(() => {
		if (!loading && !error) {
			try {
				setRepositories(data.repositories);
			} catch (e) {
				console.log(e);
			}
		}
	}, [loading, error, data]);
	

	return { repositories, loading, error};
};

export default useRepositories;