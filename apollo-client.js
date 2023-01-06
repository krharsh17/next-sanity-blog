import { ApolloClient, InMemoryCache } from "@apollo/client";

const defaultOptions = {
   watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
   },
   query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
   },
 }

const client = new ApolloClient({
   uri: "https://1errwial.api.sanity.io/v1/graphql/production/default",
   cache: new InMemoryCache(),
   defaultOptions: defaultOptions
});

export default client;