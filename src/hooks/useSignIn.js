import {useMutation} from "@apollo/client";
import {GET_USER_TOKEN} from "../graphql/queries";

const useSignIn = () => {
	const [mutate, result] = useMutation(GET_USER_TOKEN);

	const signIn = async ({ username, password }) => {
		console.log(username, password);
		const {data} = await mutate({ variables: { username, password }});
		return data;
	};

	return [signIn, result];
};

export default useSignIn;