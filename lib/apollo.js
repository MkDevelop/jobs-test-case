import { withApollo } from "next-apollo";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: "",
    },
  });

  return forward(operation);
});

const httpLink = new HttpLink({ uri: "https://api.graphql.jobs/" });

const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default withApollo(apolloClient);
