import {StyleSheet, TextInput as NativeTextInput} from 'react-native';

const TextInput = ({ style, error, ...props }) => {
	const textInputStyle = [style];
	const styles = StyleSheet.create({
		errorStyle: {
			borderColor: 'red'
		}
	})

	// If there are no errors, return the InputField without error styling
	if (!error) {
		return (
			<NativeTextInput style={textInputStyle} {...props} />
		)
	} else {
		return (
			<NativeTextInput style={[textInputStyle, styles.errorStyle]} {...props} />
		)
	}
};

export default TextInput;