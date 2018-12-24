import gql from "graphql-tag";

export const NEWS_FEED_QUERY = gql`
    {
        getNewsFeed {
            title,
            items {
                title
                link
                image
                pubDate
                content
                contentSnippet
            }
        }
    }
`;
