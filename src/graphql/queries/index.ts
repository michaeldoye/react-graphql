import gql from "graphql-tag";
import client from "../client";

const getAllNews = (): Promise<any> => {
    return client
        .query({
            query: gql`
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
    `
    });
};

export default getAllNews;