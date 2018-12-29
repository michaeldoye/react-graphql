import fetch from "node-fetch";
import * as moment from "moment";
import {
    IRssFeed,
    IRssFeedItem,
    NEWS_ENDPOINT_XML,
    TRANSLATE_API_KEY,
    TRANSLATE_ENDPOINT_JSON,
} from "../constants";
// @ts-ignore
import * as Parser from "rss-parser";

/**
 * NewsService
 *
 * Fetches the XML RSS feed and converts
 * it to JSON and translates it with the
 * Google Translate API
 */
export class NewsService {
    private _parser: any;

    constructor() {
        this._parser = new Parser();
    }

    public async getNews(size: string, lang: string): Promise<IRssFeed> {
        const feed = await this._parser.parseURL(NEWS_ENDPOINT_XML);
        // Add/transform some props of the news objects
        const newsArticles = this._extendNewsObject(feed.items, lang);
        return {
            items: newsArticles.slice(0, Number(size)),
            title: feed.title,
        };
    }

    private async _translate(lang: any, str: any): Promise<string> {
        // https://cloud.google.com/translate/v2/getting_started
        if (lang !== "en") {
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
        return str;
    }

    private _getImageUrlFromString(str: any): any {
        const regEx = /https?([^"\s]+)"?[^>]*.jpg/;
        return str && regEx.exec(str)![0];
    }

    private _getTimeFromNow(date: any): string {
        // @ts-ignore because moment :(
        return moment(new Date(date)).fromNow();
    }

    private _extendNewsObject(
        newsObj: IRssFeedItem[],
        lang: string
    ): IRssFeedItem[] {
        return newsObj.map((item: IRssFeedItem) => {
            const mutatedObj = {
                primaryLink: this._translate(lang, "Share"),
                secondaryLink: this._translate(lang, "Read More"),
                image: this._getImageUrlFromString(item.content),
                pubDate: this._translate(lang, this._getTimeFromNow(item.pubDate)),
                content: this._translate(lang, item.content),
                title: this._translate(lang, item.title),
            };
            return Object.assign(item, mutatedObj);
        });
    }
}
