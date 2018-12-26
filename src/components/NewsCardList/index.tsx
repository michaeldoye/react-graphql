import React from "react";
import { Query } from "react-apollo";
import { NEWS_FEED_QUERY } from "../../graphql/queries";
import { NewsCard } from "./NewsCard";
import { Loader } from "../Loader";
import "./NewsCardList.scss";

export const NewsCardList = ({ querySize, language }: any) => (
    <Query
        query={NEWS_FEED_QUERY}
        variables={{ size: querySize, lang: language }}
    >
        {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <p>Error :(</p>;

            return data.newsFeed.items.map((item: any, idx: number) => (
                <div className="card-wrapper" key={idx}>
                    <NewsCard item={item} />
                </div>
            ));
        }}
    </Query>
);
