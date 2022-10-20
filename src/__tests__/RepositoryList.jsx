import {RepositoryListContainer} from "../components/RepositoryList";
import {render} from "@testing-library/react-native";

const Container = ({repositories}) => {
	return <RepositoryListContainer repositories={repositories} />;
}
describe('RepositoryList', () => {
	describe('RepositoryListContainer', () => {
		it('renders repository information correctly', () => {
			const repositories = {
				totalCount: 8,
				pageInfo: {
					hasNextPage: true,
					endCursor:
						'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
					startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
				},
				edges: [
					{
						node: {
							id: 'jaredpalmer.formik',
							fullName: 'jaredpalmer/formik',
							description: 'Build forms in React, without the tears',
							language: 'TypeScript',
							forksCount: 1619,
							stargazersCount: 21856,
							ratingAverage: 88,
							reviewCount: 3,
							ownerAvatarUrl:
								'https://avatars2.githubusercontent.com/u/4060187?v=4',
						},
						cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
					},
					{
						node: {
							id: 'async-library.react-async',
							fullName: 'async-library/react-async',
							description: 'Flexible promise-based React data loader',
							language: 'JavaScript',
							forksCount: 69,
							stargazersCount: 1760,
							ratingAverage: 72,
							reviewCount: 3,
							ownerAvatarUrl:
								'https://avatars1.githubusercontent.com/u/54310907?v=4',
						},
						cursor:
							'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
					},
				],
			};
			// Add your test code here
			const repositoryItems = render(<Container repositories={repositories} />);
			const [firstItem, secondItem] = repositoryItems.getAllByTestId('repositoryItem');

			// First item

			// NAME
			expect(firstItem).toHaveTextContent('jaredpalmer/formik');
			// DESCRIPTION
			expect(firstItem).toHaveTextContent('Build forms in React, without the tears');
			// LANGUAGE
			expect(firstItem).toHaveTextContent('TypeScript');
			// RATING
			expect(firstItem).toHaveTextContent(88);
			// STARS
			// Since the likes are formatted to pretty, we need to look for the formatted number
			expect(firstItem).toHaveTextContent('21.9k');
			// FORKS
			expect(firstItem).toHaveTextContent('1.6k');
			// REVIEWS
			expect(firstItem).toHaveTextContent(3);

			// Second item, same as above
			expect(secondItem).toHaveTextContent('async-library/react-async');
			expect(secondItem).toHaveTextContent('Flexible promise-based React data loader');
			expect(secondItem).toHaveTextContent('JavaScript');
			expect(secondItem).toHaveTextContent(72);
			expect(secondItem).toHaveTextContent('1.8k');
			expect(secondItem).toHaveTextContent(69);
			expect(secondItem).toHaveTextContent(3);

		});
	});
});