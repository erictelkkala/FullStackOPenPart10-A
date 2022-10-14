import {useApolloClient, useMutation} from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';
import {GET_USER_TOKEN} from "../graphql/mutations";


const useSignIn = () => {
	const authStorage = useAuthStorage();

	const [mutate, result] = useMutation(GET_USER_TOKEN, {
		fetchPolicy: 'no-cache',
	});

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