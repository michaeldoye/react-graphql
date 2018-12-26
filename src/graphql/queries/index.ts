import gql from "graphql-tag";

export const NEWS_FEED_QUERY = gql`
    query News($size: String!, $lang: String!) {
        newsFeed(size: $size, lang: $lang) {
            title
            items {
                title
                link
                image
                pubDate
                content
            }
        }
    }
`;
