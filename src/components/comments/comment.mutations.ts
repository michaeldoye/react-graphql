import gql from "graphql-tag";

export const COMMENT_ON_EVENT = gql`
    mutation CommentOnEvent($eventId: ID!, $content: String!, $createdAt: String!) {
        commentOnEvent(eventId: $eventId, content: $content, createdAt: $createdAt) {
            eventId
            content
            createdAt
        }
    }
`;
