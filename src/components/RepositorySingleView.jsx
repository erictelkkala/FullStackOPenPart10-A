import useSingleRepository from "../hooks/useSingleRepository";
import Text from "./Text";
import {useParams} from "react-router-native";
import RepositorySingleItem from "./RepositorySingleItem";

const RepositorySingleView = () => {
	// Get the id of the repository from the URL
	const id = useParams().id;
	const { repository, loading, fetchMore } = useSingleRepository(id);

	if (loading || !repository) {
		return <Text>Loading...</Text>;
	} else {
		// console.log("repository", repository);
		return(
			<RepositorySingleItem item={repository} fetchMore={fetchMore} />
		);
	}
}

export default RepositorySingleView;