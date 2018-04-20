import {Component, OnDestroy, OnInit} from "@angular/core";
import {BooksService} from "../books.service";
import {Book} from "../book.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {PopupService} from "../../shared/popup-service.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})

export class EditBookComponent implements OnInit, OnDestroy {
  book: Book;
  bookForm: FormGroup;
  editMode: boolean = false;
  editBookSub: Subscription;

  constructor(private bookService: BooksService,
              private popupService: PopupService) {
  }

  ngOnInit() {
    this.initForm();
    this.editBookSub = this.bookService.editedBookChanged
      .subscribe((book: Book) => {
        this.editMode = true;
        this.book = book;
        this.initForm();
      });
  }

  initForm(): void {
    let bookAuthor: string = "";
    let bookDate: Date = new Date();
    let bookTitle: string = "";
    if (this.editMode) {
      bookAuthor = this.book.author;
      bookDate = new Date(this.book.date);
      bookTitle = this.book.title;
    }
    this.bookForm = new FormGroup({
      'author': new FormControl(bookAuthor, Validators.required),
      'date': new FormControl(bookDate.toISOString().substring(0,10), [
        Validators.required,
        /**
         * Date validator checks:
         1) the year is numeric and starts with 19 or 20,
         2) the month is numeric and between 01-12, and
         3) the day is numeric between 01-29, or
         b) 30 if the month value is anything other than 02, or
         c) 31 if the month value is one of 01,03,05,07,08,10, or 12.
         */
        Validators.pattern(/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/)
      ]),
      'title': new FormControl(bookTitle, Validators.required)
    });
  }

  onSubmit(): void {
    this.book = this.bookForm.value;
    if (this.editMode) {
      const editBookIndex = this.bookService.getEditBookIndex();
      this.bookService.updateBook(editBookIndex, this.book);
    }
    else {
      this.bookService.addBook(this.book);
      this.bookForm.reset();
    }
    this.onCancel();
  }

  onCancel(): void {
    this.editMode = false;
    this.popupService.cancelChanged.next('Cancel');
    this.bookForm.reset();
  }

  ngOnDestroy() {
    this.editBookSub.unsubscribe();
  }
}
