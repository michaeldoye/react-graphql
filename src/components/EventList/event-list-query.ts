import gql from "graphql-tag";

export const ListEvents = gql`
    query ListEvents {
        listEvents {
            items {
                id
                name
                when
                where
                description
                comments(limit: 100) {
                    items {
                        content
                        commentId
                        createdAt
                    }
                }
            }
        }
    }
`;

export const GetComments = gql`
    query GetCommnets($eventId: String!) {
        getComments(eventId: $eventId) {
            content
            createdAt
        }
    }
`;

export const DeleteEvent = gql`
    mutation DeleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            id
            name
        }
    }
`;
