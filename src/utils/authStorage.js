import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
	constructor(namespace = 'auth') {
		this.namespace = namespace;
	}

	async getAccessToken() {
		try {
			// Get the access token for the storage
			const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`);
			return accessToken ? JSON.parse(accessToken) : [];
		} catch (e) {
			console.log(e);
		}
	}

	async setAccessToken(accessToken) {
		try {
		// Add the access token to the storage
		const accessTokenString = JSON.stringify(accessToken);
		await AsyncStorage.setItem(`${this.namespace}:token`, accessTokenString);
		} catch (e) {
			console.log(e);
		}
	}

	async removeAccessToken() {
		try {
			// Remove the access token from the storage
			await AsyncStorage.removeItem(`${this.namespace}:token`);
		} catch (e) {
			console.log(e);
		}
	}
}

export default AuthStorage;