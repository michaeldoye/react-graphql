import fetch from "node-fetch";
import * as moment from "moment";
import {
    IRssFeed,
    IRssFeedItem,
    NEWS_ENDPOINT,
    TRANSLATE_API_KEY,
    TRANSLATE_ENDPOINT,
} from "../constants";
// @ts-ignore
import * as Parser from "rss-parser";

/**
 * NewsService
 */
export class NewsService {
    /**
     * @public getNews
     *
     * @description
     * Fetches the XML RSS feed and converts it to JSON and translates it with the
     * Google Translate API
     *
     * @param size: string
     * @param lang: string
     * @return Promise<IRssFeed>
     */
    public async getNews(size: string, lang: string): Promise<IRssFeed> {
        const parser = new Parser();
        const feed = await parser.parseURL(NEWS_ENDPOINT);
        // Add/transform some props of the news objects
        const newsArticles = this._extendAndTranslateNewsObject(feed.items, lang);
        return {
            items: newsArticles.slice(0, Number(size)),
            title: feed.title,
        };
    }

    /**
     * @private _translate
     *
     * @description
     * Translates a string using the Google Translate API
     * see: https://cloud.google.com/translate/v2/getting_started
     *
     * @param lang: string
     * @param str: string | Promise<string>
     * @return Promise<string>
     */
    private async _translate(
        lang: string,
        str: string | Promise<string>
    ): Promise<string> {
        if (lang !== "en") {
            const url =
                TRANSLATE_ENDPOINT +
                "?key=" +
                TRANSLATE_API_KEY +
                "&source=en" +
                "&target=" +
                lang +
                "&q=" +
                encodeURIComponent(<string>str);
            const fetchTranslation = await fetch(url);
            const translated = await fetchTranslation.json();

            return translated.data.translations[0].translatedText;
        }
        return str;
    }

    /**
     * @private _getImageUrlFromString
     *
     * @description
     * Extracts the first image from the html content of the
     * RSS feed
     *
     * @param str: string | Promise<string>
     * @return string
     */
    private _getImageUrlFromString(str: string | Promise<string>): string {
        const regEx = /https?([^"\s]+)"?[^>]*.jpg/;
        const imgUrl = regEx.exec(<string>str);
        return imgUrl ? imgUrl[0] : "https://placehold.it/300";
    }

    /**
     * @private _getTimeFromNow
     *
     * @description
     * Transforms the feed item published date to a moment
     * date from now format
     *
     * @param date: string | Promise<string>
     * @return string
     */
    private _getTimeFromNow(date: string | Promise<string>): string {
        // @ts-ignore because moment :(
        return moment(new Date(date)).fromNow();
    }

    /**
     * @private _extendAndTranslateNewsObject
     *
     * @description
     * Adds image and link properties to feed items
     * Translates properties of the news feed items
     *
     * @param newsObj: IRssFeedItem[]
     * @param lang: string
     * @return IRssFeedItem[]
     */
    private _extendAndTranslateNewsObject(
        newsObj: IRssFeedItem[],
        lang: string
    ): IRssFeedItem[] {
        return newsObj.map((item: IRssFeedItem) => {
            const mutatedNewsObj = {
                primaryLink: this._translate(lang, "Share"),
                secondaryLink: this._translate(lang, "Read More"),
                image: this._getImageUrlFromString(item.content),
                pubDate: this._translate(lang, this._getTimeFromNow(item.pubDate)),
                content: this._translate(lang, item.content),
                title: this._translate(lang, item.title),
            };
            return Object.assign(item, mutatedNewsObj);
        });
    }
}
