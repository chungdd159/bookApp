import { url } from '../config/config';
import * as auth from '../js/auth';
import { ui } from '../js/ui';
import { book } from '../api/book';
import Spinner from './spinner';

class EditBook {
  constructor() {
    this.isEdit = false;
    this.books = [];
  }

  async getUserBooks() {
    Spinner.render(true);
    const { _id } = await auth.getUser();
    this.books = await book.getAllBooks(
      `${url.books}/?query={"_acl.creator": "${_id}"}`
    );

    document.getElementById('content').innerHTML = await this.render();
    Spinner.render(false);
  }

  async render() {
    let output = '';
    if (this.books.length === 0) {
      output = `<h3 class="col">No book there, create now</h3>`;
    } else {
      output = ui.showBooks(this.books);
    }

    return `
        <div class="container">
          <div class='row'>
            <div class="col md-o-2 md-8 mb-3 add-book">
              <div class="form-container">
                <h2 class="form-title">Create your book</h2>
                <div class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Name"
                    id="title"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Author"
                    id="author"
                  />
                </div>
                <div class="form-group">
                  <textarea class="form-control" placeholder="Description" id="description"></textarea>
                </div>
                <input  value="" type=hidden id="id" />
                <input type="submit" value="Add Book" class="btn" id="submit-book" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class=" md-8 md-o-2">${output}</div>
          </div>
        </div>
      `;
  }
}

export const editBook = new EditBook();
