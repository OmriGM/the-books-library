import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-book-popup',
  templateUrl: './delete-book-popup.component.html',
  styleUrls: ['./delete-book-popup.component.css']
})

export class DeleteBookPopupComponent {

  constructor(private activeModalService: NgbActiveModal) {
  }

  onDelete(shouldDelete: boolean) {
    this.activeModalService.close(shouldDelete);
  }
}
