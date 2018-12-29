import gql from "graphql-tag";

export const getNewsFeed = gql`
    query News($size: String!, $lang: String!) {
        newsFeed(size: $size, lang: $lang) {
            title
            items {
                title
                link
                image
                pubDate
                content
                primaryLink
                secondaryLink
            }
        }
    }
`;