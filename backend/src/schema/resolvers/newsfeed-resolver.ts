import { dataSources } from "../../datasources";

export default {
    Query: {
        newsFeed(parent: any, args: any) {
            return dataSources.newsService.getNews(args.size, args.lang);
        },
    },
};
