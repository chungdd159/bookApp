class Book {
  constructor() {
    this.token = '';
  }

  //@route   /appdata/app_key/books
  //desc     get all book
  async getAllBooks(url) {
    const headers = {
      Authorization: this.token,
    };
    try {
      const response = await fetch(url, { method: 'GET', headers });

      if (response.ok === false) {
        throw `${response.status}: ${response.statusText}`;
      }

      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  //@route   /appdata/app_key/books
  //desc     add book
  async addBook(url, book) {
    const headers = {
      Authorization: this.token,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(book);

    try {
      const response = await fetch(url, { method: 'POST', headers, body });

      if (response.ok === false) {
        throw `${response.status}: ${response.statusText}`;
      }

      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  //@route   /appdata/app_key/books/:id
  //desc     add book
  async updateBook(url, book) {
    const headers = {
      Authorization: this.token,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(book);

    try {
      const response = await fetch(url, { method: 'PUT', headers, body });

      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  //@route   /appdata/app_key/books
  //desc     delete book
  async deleteBook(url) {
    const headers = {
      Authorization: this.token,
    };
    try {
      const response = await fetch(url, { method: 'DELETE', headers });

      if (response.ok === false) {
        throw `${response.status}: ${response.statusText}`;
      }

      return 'book deleted';
    } catch (err) {
      console.log(err);
    }
  }
}

export const book = new Book();
