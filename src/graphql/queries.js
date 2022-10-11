import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query GetRepositories {
        repositories {
            edges {
                node {
                    fullName
                    reviewCount
                    ratingAverage
                    stargazersCount
                    forksCount
                    ownerAvatarUrl
                    description
                    language
                }
            }
        }
    }
`;

export const GET_USER_TOKEN = gql`
	mutation SignIn($username: String!, $password: String!) {
		authenticate(credentials: { username: $username, password: $password }) {
			accessToken
		}
	}
`;