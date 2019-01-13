import { dataSources } from "../../datasources";

export default {
    Query: {
        books(parent: any, args: any) {
            return dataSources.bookService.getBooks(args.size);
        },
        book(parent: any, args: any) {
            return dataSources.bookService.getBook(args.id);
        },
    },

    Mutation: {
        clearBooks(parent: any, args: any) {
            return dataSources.bookService.deleteBooks(args.key);
        },
    },
};
