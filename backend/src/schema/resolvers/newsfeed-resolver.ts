import { dataSources } from "../../datasources";
import { INewsFeedArgs } from "../../constants";

export default {
    Query: {
        newsFeed(parent: any, args: INewsFeedArgs) {
            return dataSources.newsService.getNews(args.size, args.lang);
        },
    },
};
