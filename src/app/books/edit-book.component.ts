import {Component} from "@angular/core";
import {BooksService} from "./books-list/books.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})

export class EditBookComponent{

  constructor(private bookService: BooksService,private activeModalService:NgbActiveModal) {
  }

  onSubmit(form) {
    this.activeModalService.close("Yes");
  }
}
