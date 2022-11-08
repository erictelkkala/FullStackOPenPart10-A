import * as yup from 'yup';
import {Formik} from "formik";
import {View} from "react-native";
import Text from "./Text";
import ReviewFormContainer from "./ReviewFormContainer";
import useReviewSubmit from "../hooks/useReviewSubmit";
import {StyleSheet} from "react-native";
import {useState} from "react";
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    errorContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        flexShrink: 1,
    }
});

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().min(0, 'The review score must be 0 or higher').max(100, 'The review score must be 100 or lower').required('Rating is required'),
    reviewText: yup.string().optional(),
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: 50,
    reviewText: '',
}

// This component is used to display an error message
const ErrorMessage = (errorMessage) => {
    // console.log(errorMessage);
    return (
        <View style={styles.errorContainer}>
            <Text fontSize={"subheading"} fontWeight={'bold'} style={{color: "red"}}>{errorMessage}</Text>
        </View>
    )
}

const ReviewForm = () => {
    // Declare the hook
    const [submitReview, data] = useReviewSubmit();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        // Convert the rating to an integer
        const rating = parseInt(values.rating);
        // Get the rest of the values
        const {ownerName, repositoryName, reviewText} = values;
        try {
            // Call the hook and store the result
            await submitReview({ownerName, repositoryName, rating, reviewText});
            // Navigate to the repository page
            navigate(`/${await data.createReview.repositoryId}`);
        } catch (e) {
            setErrorMessage(e.message);
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    }

    return (
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <ReviewFormContainer onSubmit={handleSubmit} />}
            </Formik>
            {errorMessage ? ErrorMessage(errorMessage) : null}
        </View>
    );
}

export default ReviewForm;