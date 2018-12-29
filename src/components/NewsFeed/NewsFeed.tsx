import React from "react";
import { Query } from "react-apollo";
import NewsFeedItem from "./NewsFeedItem";
import Loader from "../Loader/Loader";
import "./news-feed.scss";
import { getNewsFeed } from "./news-feed.query";

export interface IRssFeedItem {
    content: string;
    image: string;
    pubDate: string;
    title: string;
    primaryLink: string;
    secondaryLink: string;
}

export const NewsFeed = ({ feedSize, language }: any) => (
    /**
     * https://www.apollographql.com/docs/react/essentials/queries.html#basic
     * For this demo, we are just using queries, for
     * updating data, see:
     * https://www.apollographql.com/docs/react/essentials/mutations.html
     */
    <section className="App__section-news-feed container">
        <Query query={getNewsFeed} variables={{ size: feedSize, lang: language }}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <p>Error :(</p>;

                return data.newsFeed.items.map((item: IRssFeedItem, idx: number) => (
                    <div className="card-wrapper" key={idx}>
                        <NewsFeedItem item={item} />
                    </div>
                ));
            }}
        </Query>
    </section>
);
