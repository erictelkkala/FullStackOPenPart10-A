import {SignInForm, validationSchema} from "../components/SignIn";
import {fireEvent, render, waitFor} from "@testing-library/react-native";
import {Formik} from "formik";
import {View} from "react-native";

const SignInFormContainer = ({onSubmit}) => {
	const initialValues = {
		username: "",
		password: "",
	}
	return (
		<View style={{backgroundColor: "white"}}>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{({handleSubmit}) => <SignInForm onSubmit={handleSubmit} /> }
			</Formik>
		</View>
	);
}

describe('SignIn', () => {
	describe('SignInContainer', () => {
		it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
			const onSubmit = jest.fn();
			// render the SignInContainer component, fill the text inputs and press the submit button
			const formComponent = render(<SignInFormContainer onSubmit={onSubmit} />);

			// Get the components by testIDs
			const usernameInput = formComponent.getByTestId('usernameInput');
			const passwordInput = formComponent.getByTestId('passwordInput');
			const submitButton = formComponent.getByTestId('submitButton');

			fireEvent.changeText(usernameInput, 'root');
			fireEvent.changeText(passwordInput, 'secret');
			fireEvent.press(submitButton);

			await waitFor(() => {
				// expect the onSubmit function to have been called once and with a correct first argument
				expect(onSubmit).toHaveBeenCalledTimes(1);
				expect(onSubmit.mock.calls[0][0]).toEqual({
					password: 'secret',
					username: 'root'
				});
			});
		});
	});
});