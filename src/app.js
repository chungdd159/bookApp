import './scss/main.scss';
import Login from './components/login';
import Navbar from './components/navbar';
import Home from './components/home';
import Register from './components/register';
import Spinner from './components/spinner';
import { dashboard } from './components/Dashboard';
import { editBook } from './components/edit';
import Utils from './components/utils';
import Notfound from './components/notfound';
import { ui } from './js/ui';
import { book } from './api/book';
import { user } from './api/user';
import * as auth from './js/auth';

const routes = {
  '/': Home,
  '/dashboard': dashboard,
  '/login': Login,
  '/register': Register,
  '/edit': editBook,
};

const protectRoute = ['/dashboard', '/edit'];

const url = {
  login: 'https://baas.kinvey.com/user/kid_ryOtonauD/login',
  books: 'https://baas.kinvey.com/appdata/kid_ryOtonauD/books',
};

const initialState = {
  username: null,
  token: null,
  books: null,
  isAuthenticated: false,
  loading: false,
};

const router = async () => {
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('content');
  const footer = null || document.getElementById('footer');
  header.innerHTML = await Navbar.render();

  content.innerHTML = await Home.render();

  // get url
  const request = await Utils.parseURL();
  //parse url
  let newUrl =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '');

  const state = await auth.getDataLocal();

  if (protectRoute.includes(newUrl)) {
    if (!state.token) {
      location.hash = '#login';
    }
  }

  if (state.token) {
    if (location.hash === '#login') {
      location.hash = '#dashboard';
    }
  }

  let page = routes[newUrl] ? routes[newUrl] : Notfound;

  content.innerHTML = await page.render();
};

window.addEventListener('load', () => {
  router();
});

if (location.hash === '#dashboard') {
  window.addEventListener('load', dashboard.render);
}

window.addEventListener('hashchange', router);
//
const content = document.getElementById('content');
content.addEventListener('click', (e) => {
  switch (e.target.id) {
    // listen for login
    case 'btn-login':
      login(e.target);
      break;
    // listen for submit book
    case 'submit-book':
      submitBook(e.target);
      break;
    // listen for fill form
    case 'edit':
      fillForm(e.target);
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
  }
});
const header = document.getElementById('header');
header.addEventListener('click', (e) => {
  // listen for logout
  if (e.target.id === 'btn-logout') {
    auth.removeLocal();
  }
});

function login(e) {
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

    user.loginUser(url.login, userlog).then((dataUser) => {
      if (dataUser.error) {
        Spinner.render(false);
        ui.showMessgae('alert-danger', 'Invalid credential');
        ui.clearFields([usernameEle, passwordEle]);
      } else {
        const token = `Kinvey ${dataUser._kmd.authtoken}`;
        book.token = token;
        book.getAllBooks(url.books).then((books) => {
          const state = {
            ...initialState,
            username: dataUser.username,
            token: token,
            books: books,
            isAuthenticated: true,
          };
          auth.setDataLocal(state);
          location.hash = '#dashboard';
          Spinner.render(false);
        });
      }
    });
  }
}

async function submitBook(e) {
  const { titleEle, authorEle, descriptionEle, idEle } = ui.getFormFields();
  const id = idEle.value;

  const title = titleEle.value,
    author = authorEle.value,
    description = descriptionEle.value;

  const valid = ui.validate([title, author, description]);

  if (valid) {
    const newbook = {
      title,
      author,
      description,
    };

    const state = await auth.getDataLocal();
    book.token = state.token;

    if (id) {
      const data = await book.updateBook(`${url.books}/${id}`, newbook);

      const newState = {
        ...state,
        books: [data, ...state.books.filter((book) => book._id !== id)],
      };

      auth.setDataLocal(newState);
      ui.showMessgae('alert-success', 'Book Updated');
      router();
    } else {
      // add book
      const data = await book.addBook(url.books, newbook);

      const newState = {
        ...state,
        books: [data, ...state.books],
      };

      auth.setDataLocal(newState);
      ui.showMessgae('alert-success', 'Book Added');
      router();
    }
  }
}

function fillForm(e) {
  const id = e.parentElement.dataset.id;
  const cardGroup = e.parentElement.parentElement.parentElement,
    title = cardGroup.querySelector('.card-title').innerHTML,
    author = cardGroup.querySelector('.card-author span').innerHTML,
    description = cardGroup.querySelector('.card-desc').innerHTML;

  const { titleEle, authorEle, descriptionEle, idEle } = ui.getFormFields();

  titleEle.value = title;
  authorEle.value = author;
  descriptionEle.value = description;
  idEle.value = id;

  ui.changeButton('edit');
}

async function deleteBook(e) {
  const id = e.parentElement.dataset.id;
  if (confirm('Are you sure?')) {
    const urldelete = `${url.books}/${id}`;
    const state = await auth.getDataLocal();
    book.token = state.token;

    const newState = {
      ...state,
      books: state.books.filter((book) => book._id !== id),
    };
    await auth.setDataLocal(newState);
    await book.deleteBook(urldelete);
    ui.showMessgae('alert-success', 'Book deleted');
    router();
  }
}
