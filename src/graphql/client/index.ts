import { ApolloCache } from 'apollo-cache';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
    cache: new InMemoryCache() as ApolloCache<NormalizedCacheObject>,
    link: new HttpLink({ uri: 'http://localhost/backend' }),
});

export default client;
