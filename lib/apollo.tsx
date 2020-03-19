/*eslint-disable*/

import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import {
	InMemoryCache,
	IntrospectionFragmentMatcher,
	NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { getLivePreviewToken } from './utils/getLivePreviewToken';
// import { Agent } from 'https';

let apolloClient: null | ApolloClient<NormalizedCacheObject> = null;

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, path: string) {
	// Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
	const token = getLivePreviewToken(path);

	// Use IntrospectionFragmentMatcher to auto add types to avoid the following warning
	// `You are using the simple (heuristic) fragment matcher,
	// but your queries contain union or interface types.
	// Apollo Client will not be able to accurately map fragments.`
	const fragmentMatcher = new IntrospectionFragmentMatcher({
		introspectionQueryResultData: {
			__schema: {
				types: [], // no types, you may need to add types later
			},
		},
	});

	return new ApolloClient({
		ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
		link: new HttpLink({
			uri: token
				? `${process.env.GRAPHQL_ENDPOINT}?token=${token}`
				: process.env.GRAPHQL_ENDPOINT, // If token its truthy replace the url with a token appended one
			credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
			fetch,
			headers: {
				authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`, // Use the Access Token as Authentication
			},
		}),
		cache: new InMemoryCache({ fragmentMatcher }).restore(initialState),
	});
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState, path: string) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (typeof window === 'undefined') {
		return createApolloClient(initialState, path);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = createApolloClient(initialState, path);
	}

	return apolloClient;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export default function withApollo(PageComponent, { ssr = true } = {}) {
	const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
		// Pass the url to init client with dynamic live preview support TODO: Url is depricated
		const client =
			apolloClient || initApolloClient(apolloState, pageProps.url.asPath);

		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
			</ApolloProvider>
		);
	};

	// Set the correct displayName in development
	if (process.env.NODE_ENV !== 'production') {
		const displayName =
			PageComponent.displayName || PageComponent.name || 'Component';

		if (displayName === 'App') {
			console.warn('This withApollo HOC only works with PageComponents.');
		}

		WithApollo.displayName = `withApollo(${displayName})`;
	}

	if (ssr || PageComponent.getInitialProps) {
		WithApollo.getInitialProps = async (ctx) => {
			const { AppTree } = ctx;

			// Initialize ApolloClient, add it to the ctx object so
			// we can use it in `PageComponent.getInitialProp`.
			// Pass the url string from context to init client with dynamic live preview support
			const apolloClient = (ctx.apolloClient = initApolloClient(
				null,
				ctx.req ? ctx.req.url : ctx.asPath
			));

			// Run wrapped getInitialProps methods
			let pageProps = {};
			if (PageComponent.getInitialProps) {
				pageProps = await PageComponent.getInitialProps(ctx);
			}

			// Only on the server:
			if (typeof window === 'undefined') {
				// When redirecting, the response is finished.
				// No point in continuing to render
				if (ctx.res && ctx.res.finished) {
					return pageProps;
				}

				// Only if ssr is enabled
				if (ssr) {
					try {
						// Run all GraphQL queries
						const { getDataFromTree } = await import(
							'@apollo/react-ssr'
						);
						await getDataFromTree(
							<AppTree
								pageProps={{
									...pageProps,
									apolloClient,
								}}
							/>
						);
					} catch (error) {
						// Prevent Apollo Client GraphQL errors from crashing SSR.
						// Handle them in components via the data.error prop:
						// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
						console.error(
							'Error while running `getDataFromTree`',
							error
						);
					}

					// getDataFromTree does not call componentWillUnmount
					// head side effect therefore need to be cleared manually
					Head.rewind();
				}
			}

			// Extract query data from the Apollo store
			const apolloState = apolloClient.cache.extract();

			return {
				...pageProps,
				apolloState,
			};
		};
	}

	return WithApollo;
}
