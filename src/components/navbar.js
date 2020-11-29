import { getUser } from '../js/auth';

let Navbar = {
  render: async () => {
    const { username, token } = await getUser();
    const navBar = `
    <div class='container'>
      <nav class='nav-bar'>
        <div class='nav__brand'>
          <a href='#' class='nav__link' data-name='home'>
            Book App
          </a>
        </div>
        <ul class='nav__list'>
        ${
          token
            ? `
            <li class='nav__item'>
              <a class='nav__link'>
                Welcome ${username}
              </a>
            </li>
            <li class='nav__item'>
              ${
                location.hash === '#dashboard'
                  ? `
                  <a href='#edit' class='nav__link' id='edit-page'>
                    Your Books
                  </a>
                `
                  : `
                  <a href='#dashboard' class='nav__link' id='edit-page'>
                    Dashboard
                  </a>
                `
              }
              
            </li>
            <li class='nav__item'>
              <a href="#login" class="nav__link" id="btn-logout">
                Logout
              </a>
            </li>
            
          `
            : `
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
          `
        }
        </ul>
        
      </nav>
    </div>
    `;

    return navBar;
  },
};

export default Navbar;
