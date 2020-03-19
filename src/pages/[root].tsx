import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import Default from '../layouts/default';
import withApollo from '../../lib/apollo';

const query = gql`
	query Pages($slug: [String]) {
		entries(slug: $slug) {
			title
		}
	}
`;

const Preview = () => {
	const { data } = useQuery(query, {
		variables: {
			slug: useRouter().query.root,
		},
	});

	if (!data) {
		return <></>;
	}

	const {
		entries: [{ title }],
	} = data;

	return (
		<Default>
			<h2>{title}</h2>
		</Default>
	);
};

export default withApollo(Preview);
