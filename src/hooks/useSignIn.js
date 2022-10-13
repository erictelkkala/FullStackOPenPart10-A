import {useApolloClient, useMutation} from "@apollo/client";
import {GET_USER_TOKEN} from "../graphql/queries";
import useAuthStorage from '../hooks/useAuthStorage';


const useSignIn = () => {
	const authStorage = useAuthStorage();

	const [mutate, result] = useMutation(GET_USER_TOKEN);

	// useApolloClient hook
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		try{
			// console.log(username, password);
			const {data} = await mutate({ variables: { username, password }});
			// console.log(data);
			// Set the access token to the storage
			await authStorage.setAccessToken(data.authenticate.accessToken);

			// Reset the apollo cache
			await apolloClient.resetStore();

			return data;
		} catch (e) {
			console.log(e);
		}
	};

	return [signIn, result];
};

export default useSignIn;