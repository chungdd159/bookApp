import './scss/main.scss';
import { book } from './api/book';
import { user } from './api/user';

import Login from './components/login';
import Navbar from './components/navbar';
import Home from './components/home';
import Register from './components/register';
import Spinner from './components/spinner';
import Notfound from './components/notfound';
import { dashboard } from './components/Dashboard';
import { editBook } from './components/edit';
import { bookItem } from './components/bookItem';

import { ui } from './js/ui';
import Utils from './components/utils';

import * as auth from './js/auth';
import { url } from './config/config';

const routes = {
  '/': Home,
  '/dashboard': dashboard,
  '/login': Login,
  '/register': Register,
  '/edit': editBook,
  '/dashboard/book': bookItem,
};

const protectRoute = ['/dashboard', '/edit', '/dashboard/book'];

const router = async () => {
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('content');
  const footer = null || document.getElementById('footer');
  header.innerHTML = await Navbar.render();

  // content.innerHTML = await Home.render();

  // get url
  const request = await Utils.parseURL();
  //parse url
  let newUrl =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/' + request.id : '');

  const { token } = await auth.getUser();

  if (protectRoute.includes(newUrl)) {
    if (!token) {
      return (location.hash = '#login');
    }
  }

  if (token) {
    if (location.hash === '#login') {
      location.hash = '#dashboard';
    }
  }

  let page = routes[newUrl] ? routes[newUrl] : Notfound;

  content.innerHTML = await page.render();
};

window.addEventListener('load', router);

window.addEventListener('load', () => {
  if (location.hash === '#edit') {
    editBook.getUserBooks();
  }
});

window.addEventListener('hashchange', router);
//
const content = document.getElementById('content');

content.addEventListener('click', (e) => {
  switch (e.target.id) {
    // listen for login
    case 'btn-login':
      login(e.target);
      break;
    // listen for register
    case 'btn-register':
      register(e.target);
      break;
    // listen for submit book
    case 'submit-book':
      submitBook(e.target);
      break;
    // listen for fill form
    case 'edit':
      ui.fillForm(e.target);
      break;
    case 'cancel-edit':
      ui.changeButton();
      break;
    case 'delete':
      deleteBook(e.target);
      break;
    case 'more':
      ui.seeMore(e.target);
      break;
    case 'book-detail':
      seeDetailBook(e.target);
      break;
  }
});
const header = document.getElementById('header');
header.addEventListener('click', (e) => {
  // listen for logout
  if (e.target.id === 'btn-logout') {
    auth.removeLocal();
  }
});

async function login(e) {
  const parentElement = e.parentElement,
    usernameEle = parentElement.querySelector('#username'),
    passwordEle = parentElement.querySelector('#password');

  const username = usernameEle.value,
    password = passwordEle.value;

  if (ui.validate(username, password)) {
    Spinner.render(true);
    const userlog = {
      username,
      password,
    };

    const userdata = await user.loginUser(url.login, userlog);
    if (userdata.error) {
      Spinner.render(false);
      ui.showMessenge('alert-danger', 'Invalid credential');
      ui.clearFields(usernameEle, passwordEle);
    } else {
      const { username, _id, _kmd } = userdata;
      const userInfo = {
        username,
        _id,
        token: `Kinvey ${_kmd.authtoken}`,
      };
      auth.setUser(userInfo);
      book.token = userInfo.token;

      Spinner.render(false);
      location.hash = '#dashboard';
    }
  }
}

async function register(e) {
  const parentElement = e.parentElement,
    usernameEle = parentElement.querySelector('#username'),
    passwordEle = parentElement.querySelector('#password');

  const username = usernameEle.value,
    password = passwordEle.value;

  if (ui.validate([username, password], usernameEle, passwordEle)) {
    Spinner.render(true);
    const userlog = {
      username,
      password,
    };

    const userdata = await user.registerUser(url.register, userlog);
    if (userdata.error) {
      Spinner.render(false);
      ui.showMessenge('alert-danger', 'Invalid credential');
      ui.clearFields(usernameEle, passwordEle);
    } else {
      const { username, _id, _kmd } = userdata;
      const userInfo = {
        username,
        _id,
        token: `Kinvey ${_kmd.authtoken}`,
      };
      auth.setUser(userInfo);

      Spinner.render(false);
      location.hash = '#dashboard';
    }
  }
}

async function submitBook(e) {
  const { titleEle, authorEle, descriptionEle, idEle } = ui.getFormFields();
  const id = idEle.value;

  const title = titleEle.value,
    author = authorEle.value,
    description = descriptionEle.value;

  const valid = ui.validate(title, author, description);

  if (valid) {
    const newbook = {
      title,
      author,
      description,
    };

    if (id) {
      const bookUpdated = await book.updateBook(`${url.books}/${id}`, newbook);
      editBook.books = [
        bookUpdated,
        ...editBook.books.filter((book) => book._id !== id),
      ];

      ui.showMessenge('alert-success', 'Book Updated');
    } else {
      // add book
      const newBook = await book.addBook(url.books, newbook);
      editBook.books = [newBook, ...editBook.books];

      ui.showMessenge('alert-success', 'Book Added');
    }
    router();
  }
}

async function deleteBook(e) {
  const id = e.parentElement.dataset.id;
  if (confirm('Are you sure?')) {
    editBook.books = editBook.books.filter((book) => book._id !== id);

    await book.deleteBook(`${url.books}/${id}`);

    router();
    ui.showMessenge('alert-success', 'Book deleted');
  }
}

async function seeDetailBook(e) {
  const id = e.dataset.id;
  const bookDetail = await book.getAllBooks(`${url.books}/${id}`);
  bookItem.book = bookDetail;
  location.hash = `#dashboard/book`;
}
