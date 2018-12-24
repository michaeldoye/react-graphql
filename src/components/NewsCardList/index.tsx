import React from "react";
import { Query } from "react-apollo";
import { NEWS_FEED_QUERY } from "../../graphql/queries";
import { NewsCard } from "./NewsCard";

export const NewsCardList = () => (
    <Query query={NEWS_FEED_QUERY}>

        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.getNewsFeed.items.map((item: any, idx: number) => (
                <div className="card-wrapper" key={idx}>
                    <NewsCard item={item} />
                </div>
            ));
        }}
    </Query>
);
