import * as moment from "moment";
import * as Parser from "rss-parser";

const parser = new Parser();
const FEED_ENDPOINT_XML = "https://magic.wizards.com/en/rss/rss.xml";

// The root provides a resolver function for each API endpoint
export const rootValue = {

  getNewsFeed: async (): Promise<any> => {
    const feed = await parser.parseURL(FEED_ENDPOINT_XML);
    const regEx = /https?([^"\s]+)"?[^>]*.jpg/;

    feed.items.forEach((item) => {
      if (!item) { return; }
      item.image = regEx.exec(item.content)[0];
      item.pubDate = moment(new Date(item.pubDate)).fromNow();
    });

    return feed;
  },
};
