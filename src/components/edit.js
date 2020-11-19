import * as auth from '../js/auth';
import { ui } from '../js/ui';

class EditBook {
  constructor() {
    this.isEdit = false;
  }
  render = async () => {
    const state = await auth.getDataLocal();
    const { books } = state;
    let output = '';
    if (books.length === 0) {
      output = `<h3 class="col">No book there, create now</h3>`;
    } else {
      output = ui.getBooks(books);
    }

    if (this.isEdit) {
      return `<h3>edit</h3>`;
    } else {
      return `
        <div class="container">
        <a href="#dashboard" class="btn mt-3">Back to dashboard</a>
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
  };

  after_render = async () => {};
}

export const editBook = new EditBook();
