import {Component, OnInit, ViewChild} from "@angular/core";
import {BooksService} from "./books-list/books.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Book} from "./books-list/book.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})

export class EditBookComponent implements OnInit {
  book: Book;
  @ViewChild('f') form:NgForm;

  constructor(private bookService: BooksService,
              private activeModalService: NgbActiveModal) {
  }

  ngOnInit() {
    this.book = this.bookService.getEditBook();
    this.form.setValue({title:this.book.title})
  }

  onSubmit(form) {
    const formValue = form.value;
    this.book = new Book(formValue.author, formValue.date, formValue.title);
    this.bookService.addBook(this.book);
    this.activeModalService.close(this.book);
  }
}
