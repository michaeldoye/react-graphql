import * as moment from "moment";
import * as Parser from "rss-parser";
import { IRssFeedItem, IRssFeedJson, NEWS_ENDPOINT_XML } from "./constants";
import { getImageUrlFromString, maybeTranslate } from "./helpers";

const parser = new Parser();

export const rootValue = {
    newsFeed: async ({ size, lang }): Promise<IRssFeedJson> => {
        const feed = await parser.parseURL(NEWS_ENDPOINT_XML);

        const newsArticles = feed.items.map((item: IRssFeedItem) => {
            if (!item) {
                return;
            }
            item.image = getImageUrlFromString(item.content);
            item.pubDate = moment(new Date(item.pubDate)).fromNow();
            item.content = maybeTranslate(lang, item, "content");
            item.title = maybeTranslate(lang, item, "title");
            return item;
        });

        return {
            items: newsArticles.slice(0, Number(size)),
            title: feed.title,
        };
    },
};
