import {useApolloClient} from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
	const apolloClient = useApolloClient();
	const authStorage = useAuthStorage();

	/*
	* It seems that the sign-out function needs to be a hook, otherwise it won't refetch the ME query
	* Tried everything, but the cache can be successfully cleared, but the ME query won't refetch any other way
	 */
	return async () => {
		try {
			// Remove the access token from the storage
			await authStorage.removeAccessToken();
			// Reset the apollo cache
			await apolloClient.resetStore();
		} catch (e) {
			console.log(e);
		}
	};
}

export default useSignOut;