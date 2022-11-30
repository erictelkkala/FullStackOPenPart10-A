import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_SINGLE_REPOSITORY} from "../graphql/queries";

const useSingleRepository = (id) => {
	// console.log("useSingleRepository id:", id);
	const [repository, setRepository] = useState();
	const {data, error, loading, fetchMore} = useQuery(GET_SINGLE_REPOSITORY, {
		// The first 4 results are visible on Android, so that's a good number to fetch
		variables: {id: id, first: 4},
	});

	const handleFetchMore = () => {

		// console.log(data.repository);
		const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
	
		if (!canFetchMore) {
			return;
		}
	
		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
			},
		});
	};

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

	return {repository, loading, error, fetchMore: handleFetchMore};
}

export default useSingleRepository;