import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.deutschebahn.com//1bahnql/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  // The token is fetched from the environment variables for better security
  const token = process.env.NEXT_PUBLIC_API_KEY

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

