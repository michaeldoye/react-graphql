import fetch from "node-fetch";
import { IRssFeedItem, TRANSLATE_API_KEY, TRANSLATE_ENDPOINT_JSON } from "./constants";

async function translate(lang: string, str: string): Promise<string> {
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

export function maybeTranslate(lang: string, obj: IRssFeedItem, key: string): string {
    return !lang || lang === "en" ? obj[key] : translate(lang, obj[key]);
}

export function getImageUrlFromString(str: string): string {
    const regEx = /https?([^"\s]+)"?[^>]*.jpg/;
    return str ? regEx.exec(str)[0] : "";
}
