import { NewsService } from "./news-service";
import { BooksService } from "./book-service";

export const dataSources = {
    newsService: new NewsService(),
    bookService: new BooksService(),
};
