import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT ||
    process.env.WORDPRESS_API_URL ||
    'https://cms.theportfolioliving.com/graphql';

const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
