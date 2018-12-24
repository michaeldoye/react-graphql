import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
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
    getNewsFeed: Feed
  }
`);
