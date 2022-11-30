import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from "expo-constants";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
	// Get the IP address from the environment variables
	uri: Constants.manifest.extra.apolloUri,
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				repositories: relayStylePagination(),
			},
		},
		Repository: {
			fields: {
				reviews: relayStylePagination(),
			},
		},
	},
});

const createApolloClient = (authStorage) => {
	const authLink = setContext(async (_, { headers }) => {
		try {
			const token = await authStorage.getAccessToken();
			return {
				headers: {
					...headers,
					authorization: token ? `Bearer ${token}` : "",
				},
			};
		} catch (e) {
			console.log(e);
			return {
				headers: {
					...headers,
				}
			}
		}
	});
	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache
	});
};

export default createApolloClient;