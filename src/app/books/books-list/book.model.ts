export class Book {
  author: string;
  date: Date;
  title: string;

  constructor(author: string, date: Date, title: string) {
    this.author = author;
    this.date = date;
    this.title = title;
  }
}
