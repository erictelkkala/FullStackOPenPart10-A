import {Pressable, View} from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import {StyleSheet} from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "white",
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    inputField: {
        borderStyle: "solid",
        borderColor: theme.colors.textSecondary,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        height: 35,
        padding: 10,
        placeholderTextColor: theme.colors.textSecondary
    }
});

const ReviewFormContainer = ({onSubmit}) => {
    return (
        <View style={styles.formContainer} fullwidth testID={"SignInForm"}>
            <FormikTextInput name={"ownerName"} placeholder={"Repository owner name"} style={styles.inputField} testID={"ownerNameInput"}/>
            <FormikTextInput name={"repositoryName"} placeholder={"Repository name"} style={styles.inputField} testID={"repositoryNameInput"}/>
            <FormikTextInput name={"rating"} placeholder={"Rating between 0 and 100"} style={styles.inputField} testID={"ratingInput"}/>
            <FormikTextInput name={"reviewText"} placeholder={"Review"} style={{textAlignVertical: 'top', ...styles.inputField}} multiline={true} testID={"reviewTextInput"}/>
            <Pressable onPress={onSubmit} style={styles.submitButton} testID={"submitButton"}>
                <Text fontSize={"subheading"} style={{marginVertical: 10, color: "white"}}>Create a review</Text>
            </Pressable>
        </View>
    )
}

export default ReviewFormContainer;