import { Book } from './book.model';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { plainToClass } from "class-transformer";
import 'rxjs/add/operator/map';


@Injectable()
export class BooksService {
    //Mock Json deployed at www.mocky.io
    apiUrl: string = "http://www.mocky.io/v2/5acfb3eb31000074004eaa7c";
    TAG: string = "Books Service: "; s

    constructor(private http: HttpClient) { }
    /**
     * returns the book list from the server
     * 
     * returns: Observable<Book[]>
     */
    getBooks(): Observable<Book[]> {
        console.log(this.TAG);
        return this.http.get(this.apiUrl)
            .map(data => {
                return plainToClass(Book, data as Object[]);
            });
    }
}