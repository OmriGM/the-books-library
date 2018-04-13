import {Book} from './book.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from "./books.service";
import {Subscription} from "rxjs/Subscription";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EditBookComponent} from "../edit-book.component";
import {DeleteBookPopupComponent} from "../delete-book-popup/delete-book-popup.component";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private booksSub: Subscription;
  private booksChangedSub: Subscription;
  editMode: boolean;

  private TAG: string = "[BooksListComponent]:";

  constructor(private bookService: BooksService,
              private modalService: NgbModal,
            ) {
  }

  ngOnInit() {
    this.booksSub = this.bookService.getBooks()
      .subscribe((books: Book[]) => {
          this.books = books;
          this.booksChangedSub = this.bookService.booksChanged
            .subscribe((books: Book[]) => {
              this.books = books;
            });
        }
      );
  }

  openModal(i?: number, book?: Book) {
    if (i >= 0) {
      console.log(this.TAG, "opens modal for edit", book);
      this.modalService.open(EditBookComponent).result.then(data=>console.log(data));
    } else {
      console.log(this.TAG, "opens modal for new book");
    }
  }

  onDeleteBook(i): void {
    this.modalService.open(DeleteBookPopupComponent,{size:"sm"})
      .result.then((shouldDelte)=>{
      if(shouldDelte)
        this.bookService.deleteBook(i);
    });
  }

  onUpdateBook(i): void {
    console.log(i);
    // this.bookService.updateBook(i);
  }

  onAddBook(book: Book): void {
    this.bookService.addBook(book);
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
    this.booksChangedSub.unsubscribe();
  }
}
