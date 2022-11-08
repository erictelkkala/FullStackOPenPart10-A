import {useMutation} from "@apollo/client";
import {CREATE_REVIEW} from "../graphql/mutations";

const useReviewSubmit = () => {
    const [submitReview, {data}] = useMutation(CREATE_REVIEW);

    const createReview = async ({ repositoryName, ownerName, rating, text }) => {
        // call the mutate function here with the right arguments
        const { data } = await submitReview({
        variables: { repositoryName, ownerName, rating, text }
        });
        return data;
    };

    return [createReview, data];
}

export default useReviewSubmit;