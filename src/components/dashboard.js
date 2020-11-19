import * as auth from '../js/auth';
import { ui } from '../js/ui';

class Dashboard {
  constructor() {
    this.books = [];
  }
  render = async () => {
    const state = await auth.getDataLocal();
    if (state.books) {
      this.books = state.books;
    }
    let output = '';
    if (this.books.length === 0) {
      output = `<h3 class="col">No book there, create now</h3>`;
    } else {
      output = ui.getBooks(this.books);
    }

    return `
      <div class='container'>
        <h3 class ="book-title" >Top newest books</h3>
        <div class = "row">
            ${output}
        </div>
      </div>
    `;
  };
}

export const dashboard = new Dashboard();
