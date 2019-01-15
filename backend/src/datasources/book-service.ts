import { LocalStorage } from "node-localstorage";

interface Book {
    title: string;
    id: number;
    summary: string;
    image: string;
}

export abstract class Books<T> {
    protected constructor() {}
    getBook(id: number) {}
    getBooks(size: number) {}
    addBooks(books: Book[]) {}
    deleteBooks(id: string) {}
    generateMockBooks(size: number) {}
}

export class BooksService extends Books<any> {
    bookStore: any;

    constructor() {
        super();
        this.bookStore = new StorageService();
    }

    generateMockBooks(size: number): Book[] {
        const books: Book[] = [];
        for (let i = 0; i < size; i++) {
            books.push({
                title: `Book ${i}`,
                id: i,
                summary: "Summary",
                image: "https://placehold.it/300",
            });
        }
        this.bookStore.setItem("bookStore", JSON.stringify({ books }));
        return books;
    }

    getBooks(size: number): Book[] {
        const booksStr = this.bookStore.getItem("bookStore");
        if (booksStr) {
            const books = JSON.parse(booksStr);
            return books.books.slice(0, size);
        }
        return this.generateMockBooks(size);
    }

    getBook(id: number) {
        const booksStr = this.bookStore.getItem("bookStore");
        if (booksStr) {
            const books = JSON.parse(booksStr);
            return books.books.find((book: Book) => book.id === id);
        }
    }

    addBooks(books: Book[]) {}

    deleteBooks(key: string) {
        return this.bookStore.removeItem(key);
    }
}

export class StorageService {
    storage: any;

    constructor() {
        this.storage = new LocalStorage("./scratch");
    }

    setItem(key: string, value: string) {
        try {
            this.storage.setItem(key, value);
        } catch (e) {
            console.warn("Could not set Item;", e);
        }
    }

    getItem(key: string) {
        try {
            return this.storage.getItem(key);
        } catch (e) {
            console.warn("Could not get Item;", e);
        }
    }

    removeItem(key: string) {
        try {
            this.storage.removeItem(key);
        } catch (e) {
            console.warn("Could not remove item;", e);
        }
        return this.storage.getItem(key);
    }
}
