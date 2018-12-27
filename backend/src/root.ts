// @ts-ignore
import * as Parser from "rss-parser";
import { IRssFeedItem, IRssFeedJson, NEWS_ENDPOINT_XML } from "./constants";
import {
    getImageUrlFromString,
    getTimeFromNow,
    maybeTranslate,
    translate,
} from "./helpers";

const parser = new Parser();

export const rootValue = {
    newsFeed: async ({ size, lang }: any): Promise<IRssFeedJson> => {
        const feed = await parser.parseURL(NEWS_ENDPOINT_XML);

        const newsArticles = feed.items.map((item: IRssFeedItem) => {
            if (!item) {
                return;
            }
            item.image = getImageUrlFromString(item.content);
            item.pubDate = getTimeFromNow(item.pubDate);
            item.content = translate(lang, item.content);
            item.title = translate(lang, item.title);
            return item;
        });

        return {
            items: newsArticles.slice(0, Number(size)),
            title: feed.title,
        };
    },
};
