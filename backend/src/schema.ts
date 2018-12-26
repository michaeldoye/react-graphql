import { makeExecutableSchema } from "graphql-tools";

// Construct a schema, using GraphQL schema language
// https://www.apollographql.com/docs/graphql-tools/generate-schema.html
const typeDefs = [
  `
    type FeedItems {
        title: String
        link: String
        image: String
        pubDate: String
        content: String
        contentSnippet: String
        categories: [String]
    }

    type Feed {
        title: String
        items: [FeedItems]
    }

    type Query {
        newsFeed(size: String, lang: String): Feed
    }

    schema {
        query: Query
    }
`,
];

// https://www.apollographql.com/docs/graphql-tools/resolvers.html
// https://www.apollographql.com/docs/graphql-tools/resolvers.html#Resolver-function-signature
const resolvers = {
  Query: {
    newsFeed: (obj, args) => {
      return obj.newsFeed(
        {
          lang: args.lang,
          size: args.size,
        },
        null,
      );
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
