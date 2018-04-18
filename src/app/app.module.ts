import {HttpClientModule} from '@angular/common/http';
import {BooksService} from './books/books.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BooksListComponent} from "./books/books-list/books-list.component";
import {NonEnglishPipePipe} from "./shared/pipes/non-english-pipe.pipe";
import {EditBookComponent} from "./books/edit-book/edit-book.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeleteBookPopupComponent} from "./books/delete-book-popup/delete-book-popup.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PopupModule} from "ng2-opd-popup";
import {PopupService} from "./shared/popup-service.service";

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    NonEnglishPipePipe,
    EditBookComponent,
    DeleteBookPopupComponent,
  ],
  entryComponents: [
    EditBookComponent,
    DeleteBookPopupComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PopupModule.forRoot()
  ],
  providers: [
    BooksService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
