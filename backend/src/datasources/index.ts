import { NewsService } from "./news-service";
import { BooksService } from "./article-service";

export const dataSources = {
    newsService: new NewsService(),
    bookService: new BooksService(),
};
