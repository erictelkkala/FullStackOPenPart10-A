import { useMutation} from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
    const [mutate, {data, loading, error}] = useMutation(CREATE_USER);

    const signUp = async ({ username, password }) => {
        try{
            await mutate({ variables: { username, password }});
            return data;
        } catch (e) {
            console.log('Error when signing up:', e);
        }
    }

    return [signUp, {loading, error}];
};

export default useSignUp;