import * as moment from "moment";
import fetch from "node-fetch";
import * as Parser from "rss-parser";
import {
    NEWS_ENDPOINT_XML,
    TRANSLATE_API_KEY,
    TRANSLATE_ENDPOINT_JSON,
} from "./constants";

const parser = new Parser();

export const rootValue = {
    newsFeed: async ({ size, lang }): Promise<any> => {
        const feed = await parser.parseURL(NEWS_ENDPOINT_XML);
        const regEx = /https?([^"\s]+)"?[^>]*.jpg/;

        const newsArticles = feed.items.map((item) => {
            if (!item) {
                return;
            }
            item.image = regEx.exec(item.content)[0];
            item.pubDate = moment(new Date(item.pubDate)).fromNow();
            item.content =
                !lang || lang === "en"
                    ? item.content
                    : translate(lang, item.content);
            return item;
        });

        return {
            items: newsArticles.slice(0, parseInt(size, 10)),
            title: feed.title,
        };
    },
};

async function translate(lang: string, str: string): Promise<any> {
    // https://cloud.google.com/translate/v2/getting_started
    const url =
        TRANSLATE_ENDPOINT_JSON +
        "?key=" +
        TRANSLATE_API_KEY +
        "&source=en" +
        "&target=" +
        lang +
        "&q=" +
        encodeURIComponent(str);
    const fetchTranslation = await fetch(url);
    const translated = await fetchTranslation.json();

    return translated.data.translations[0].translatedText;
}
