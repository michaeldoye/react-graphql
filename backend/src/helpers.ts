import fetch from "node-fetch";
import { TRANSLATE_API_KEY, TRANSLATE_ENDPOINT_JSON } from "./constants";
import * as moment from "moment";

export function getImageUrlFromString(str: any): any {
    const regEx = /https?([^"\s]+)"?[^>]*.jpg/;
    return str && regEx.exec(str)![0];
}

export function getTimeFromNow(date: any): string {
    // @ts-ignore because moment :(
    return moment(new Date(date)).fromNow();
}

export async function translate(lang: any, str: any): Promise<string> {
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
