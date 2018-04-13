import {HttpClientModule} from '@angular/common/http';
import {BooksService} from './books/books-list/books.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {BooksListComponent} from "./books/books-list/books-list.component";
import {NonEnglishPipePipe} from "./shared/non-english-pipe.pipe";
import {EditBookComponent} from "./books/edit-book.component";
import {FormsModule} from "@angular/forms";
import {DeleteBookPopupComponent} from "./books/delete-book-popup/delete-book-popup.component";


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    NonEnglishPipePipe,
    EditBookComponent,
    DeleteBookPopupComponent
  ],
  entryComponents: [
    EditBookComponent,
    DeleteBookPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
