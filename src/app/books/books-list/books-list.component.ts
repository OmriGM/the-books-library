import {Book} from './book.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from "./books.service";
import {Subscription} from "rxjs/Subscription";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditBookComponent} from "../edit-book.component";
import {DeleteBookPopupComponent} from "../delete-book-popup/delete-book-popup.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

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
              private snackBar: MatSnackBar) {
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

  onDeleteBook(i): void {
    this.modalService.open(DeleteBookPopupComponent, {size: "sm"})
      .result.then((shouldDelete) => {
      if (shouldDelete) {
        this.openSnackBar("The book of " + this.books[i].author + " has been deleted!");
        this.bookService.deleteBook(i);
      }
    });
  }

  openBookModal(i?: number, book?: Book) {
    if (i >= 0) {
      this.bookService.setEditBook(i);
      this.modalService.open(EditBookComponent).result
        .then(data => console.log(data));
    } else {
      this.modalService.open(EditBookComponent).result
        .then((data: Book) => {
          this.openSnackBar("The book '" + data.title + "' has been added!")
        });
    }
  }

  openSnackBar(msg: string) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this.snackBar.open(msg, " ", config);
  }

  onUpdateBook(i): void {
    console.log(i);
    // this.bookService.updateBook(i);
  }

  onAddBook(book: Book): void {
    this.openBookModal();
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
    this.booksChangedSub.unsubscribe();
  }
}
