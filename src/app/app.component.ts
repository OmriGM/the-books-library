import { BooksService } from './books/books.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBooks()
      .subscribe(data => console.log(data));
  }
}
