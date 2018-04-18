import {Book} from './book.model';
import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {plainToClass} from "class-transformer";
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";

@Injectable()
export class BooksService {
  apiUrl: string = 'assets/books.json';
  books: Book[] = [];
  booksChanged: Subject<Book[]> = new Subject<Book[]>();
  duplicateChanged: Subject<string> = new Subject<string>();
  editedBookChanged: Subject<Book> = new Subject<Book>();
  addBookSuccess: EventEmitter<string> = new EventEmitter<string>();
  editedBookIndex: number;

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get(this.apiUrl)
      .map(data => {
        return this.books = plainToClass(Book, data as Object[]);
      });
  }

  addBook(book: Book): void {
    if (book && !(this.checkForBookTitleDuplication(book))) {
      this.books.push(book);
      this.booksChanged.next(this.books.slice());
      this.addBookSuccess.emit(book.author);
    }
  }

  updateBook(index: number, book: Book): void {
    if ((index >= 0) && book && !(this.checkForBookTitleDuplication(book))) {
      this.books[index] = book;
      this.booksChanged.next(this.books.slice());
      this.addBookSuccess.emit(book.author);
    }
  }

  deleteBook(index: number): void {
    if (this.books.length) {
      this.books.splice(index, 1);
      this.booksChanged.next(this.books.slice());
    }
  }

  getEditBookIndex(): number {
    return this.editedBookIndex;
  }

  setEditBookIndex(index: number): void {
    this.editedBookIndex = index;
  }

  checkForBookTitleDuplication(editBook: Book): boolean {
    for (let book of this.books) {
      if (book.title == editBook.title && book != editBook) {
        this.duplicateChanged.next('Book title already exists');
        return true;
      }
    }
  }
}
