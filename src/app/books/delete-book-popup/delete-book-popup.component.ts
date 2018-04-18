import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BooksService} from "../books-list/books.service";

@Component({
  selector: 'app-delete-book-popup',
  templateUrl: './delete-book-popup.component.html',
  styleUrls: ['./delete-book-popup.component.css']
})

export class DeleteBookPopupComponent {

  constructor(private bookSerivce: BooksService) {
  }


}
