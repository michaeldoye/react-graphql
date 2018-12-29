import React from "react";
import { ApolloProvider } from "react-apollo";
import TopBar from "./components/TopBar/TopBar";
import { HomePage } from "./pages/HomePage";
import { ApolloCache } from "apollo-cache";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { GRAPHQL_ENDPOINT } from "./shared/constants";

const client = new ApolloClient({
    cache: new InMemoryCache() as ApolloCache<NormalizedCacheObject>,
    link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
});

export const App = () => {
    return (
        <div className="App">
            <ApolloProvider client={client}>
                <TopBar />
                <HomePage />
            </ApolloProvider>
        </div>
    );
};
