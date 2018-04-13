import {Book} from './book.model';
import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {plainToClass} from "class-transformer";
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";

@Injectable()
export class BooksService {
  apiUrl:string='../assets/books.json';
  TAG: string = "[Books Service]: ";
  books: Book[] = [];
  booksChanged: Subject<Book[]> = new Subject<Book[]>();

  constructor(private http: HttpClient) {
  }

  /**
   * returns the book list from the server
   *
   * @returns {Observable<Book[]>}
   */
  getBooks(): Observable<Book[]> {
    console.log(this.TAG);
    return this.http.get(this.apiUrl)
      .map(data => {
        return this.books = plainToClass(Book, data as Object[]);
      });
  }

  addBook(book: Book): void {
    this.books.push(book);
    this.booksChanged.next(this.books.slice());
  }

  updateBook(index: number, book: Book): void {
    this.books[index] = book;
    this.booksChanged.next(this.books.slice());
  }

  deleteBook(index: number): void {
    if(this.books.length){
      this.books.splice(index, 1);
      this.booksChanged.next(this.books.slice());
    }
  }
}
