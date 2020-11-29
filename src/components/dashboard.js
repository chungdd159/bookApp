import * as auth from '../js/auth';
import { ui } from '../js/ui';
import { book } from '../api/book';
import { url } from '../config/config';
import Spinner from './spinner';
import { editBook } from './edit';

class Dashboard {
  constructor() {
    this.books = [];
  }

  render = async () => {
    Spinner.render(true);
    const { _id } = await auth.getUser();

    this.books = await book.getAllBooks(url.books);
    editBook.books = this.books.filter((book) => book._acl.creator === _id);
    Spinner.render(false);

    return `
      <div class='container'>
        <h3 class ="book-title" >Top newest books</h3>
        <div class = "row">
            ${
              this.books.length === 0
                ? `<h3 class="col">No book there, create now</h3>`
                : ui.showBooks(this.books)
            }
        </div>
      </div>
    `;
  };
}

export const dashboard = new Dashboard();
