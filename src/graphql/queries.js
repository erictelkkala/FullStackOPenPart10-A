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

// other queries...