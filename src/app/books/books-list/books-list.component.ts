import {Book} from '../book.model';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BooksService} from "../books.service";
import {Subscription} from "rxjs/Subscription";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {Popup} from "ng2-opd-popup";
import {PopupService} from "../../shared/popup-service.service";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  @ViewChild('deletePopup') deletePopUp: Popup;
  @ViewChild('editPopup') editPopUp: Popup;
  @ViewChild('duplicatePopup') duplicatePopup: Popup;
  books: Book[] = [];
  private booksSub: Subscription;
  private booksChangedSub: Subscription;
  private cancelPopupSub: Subscription;
  private duplicatePopupSub: Subscription;
  deleteBookIndex: number;
  editMode: boolean;

  constructor(private bookService: BooksService,
              private snackBar: MatSnackBar,
              private popupService: PopupService) {
  }

  ngOnInit() {
    this.getBooks();
    this.duplicateListener();
  }

  getBooks(): void {
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

  duplicateListener(): void {
    this.duplicatePopupSub = this.bookService.duplicateChanged
      .subscribe((msg) => {
        if (msg) {
          this.duplicatePopup.show(this.popupService.initDuplicatePopupOptions());
        }
      });
  }

  confirmDuplicate() {
    this.duplicatePopup.hide();
  }

  onDeleteBook(i): void {
    this.deleteBookIndex = i;
    this.deletePopUp.show(this.popupService.initDeletePopupOptions());
  }

  confirmDeleteBook(): void {
    this.bookService.deleteBook(this.deleteBookIndex);
    this.deletePopUp.hide();
    this.openSnackBar("The book was deleted!");
  }

  onAddBook(): void {
    this.editMode = false;
    this.openEditBookPopup();
    this.onCancelEditBookPopup();
    this.addBookSuccessSnackBar();
  }

  onEditBook(index: number, book: Book): void {
    this.editMode = true;
    this.openEditBookPopup();
    this.bookService.editedBookChanged.next(book);
    this.bookService.setEditBookIndex(index);
    this.onCancelEditBookPopup();
    this.addBookSuccessSnackBar();
  }

  addBookSuccessSnackBar(): void {
    this.bookService.addBookSuccess
      .subscribe(
        title => this.openSnackBar("The book of " + title + " has been added!")
      )
  }

  onCancelEditBookPopup(): void {
    this.cancelPopupSub = this.popupService.cancelChanged
      .subscribe((cancel: string) => {
        if (cancel) {
          this.editPopUp.hide();
        }
      });
  }

  openEditBookPopup(): void {
    let headerText: string = (this.editMode) ? "Edit book" : "Add a New Book";
    this.editPopUp.show(this.popupService.initEditPopupOptions(headerText));
  }

  openSnackBar(msg: string): void {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this.snackBar.open(msg, " ", config);
  }

  ngOnDestroy() {
    this.cancelPopupSub.unsubscribe();
    this.booksSub.unsubscribe();
    this.booksChangedSub.unsubscribe();
    this.duplicatePopupSub.unsubscribe();
  }
}
