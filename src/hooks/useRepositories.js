import { useState, useEffect } from 'react';
import {GET_REPOSITORIES} from "../graphql/queries";
import {useQuery} from "@apollo/client";

const useRepositories = () => {
	const [repositories, setRepositories] = useState();
	const {data, error, loading} = useQuery(GET_REPOSITORIES)


	const fetchRepositories = async () => {
		try {
			setRepositories(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		data ? setRepositories(data.repositories) : null
	}, [data])

	useEffect(() => {
		fetchRepositories();
		// Seems like ESLint doesn't like useEffect with an empty dependency array
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { repositories, loading, error, refetch: fetchRepositories };
};

export default useRepositories;