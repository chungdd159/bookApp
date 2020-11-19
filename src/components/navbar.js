import { getDataLocal } from '../js/auth';

let Navbar = {
  render: async () => {
    let logged = '';
    const state = await getDataLocal();

    if (state.token) {
      logged = `
        <ul class='nav__list'>
          <li class='nav__item'>
            <a class='nav__link'>
              Welcome ${state.username}
            </a>
          </li>
          <li class='nav__item'>
            <a href="#edit" class='nav__link'>
              Your Books
            </a>
          </li>
          <li class='nav__item'>
            <a href="#login" class="nav__link" id="btn-logout">
              Logout
            </a>
          </li>
        </ul>
      `;
    } else {
      logged = `
        <ul class='nav__list'>
          <li class='nav__item'>
            <a href='#login' id='login-btn' class='nav__link' data-name='login'>
              Login
            </a>
          </li>
          <li class='nav__item'>
            <a href='#register' class='nav__link' data-name='register'>
              Register
            </a>
          </li>
        </ul>
      `;
    }

    const navBar = `
    <div class='container'>
      <nav class='nav-bar'>
        <div class='nav__brand'>
          <a href='#' class='nav__link' data-name='home'>
            Book App
          </a>
        </div>
        ${logged}
      </nav>
    </div>`;

    return navBar;
  },

  after_render: async () => {},
};

export default Navbar;
