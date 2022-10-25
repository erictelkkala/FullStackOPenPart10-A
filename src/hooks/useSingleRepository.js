import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_SINGLE_REPOSITORY} from "../graphql/queries";

const useSingleRepository = (id) => {
	// console.log("useSingleRepository id:", id);
	const [repository, setRepository] = useState();
	const {data, error, loading} = useQuery(GET_SINGLE_REPOSITORY, {
		variables: {id: id}
	});

	useEffect(() => {
		if (!loading && !error) {
			try {
				// console.log("data", data);
				setRepository(data.repository);
			} catch (e) {
				console.log(e);
			}
		}
	}, [loading, error, data]);

	return {repository, loading, error};
}

export default useSingleRepository;