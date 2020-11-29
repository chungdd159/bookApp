export const url = {
  login: 'https://baas.kinvey.com/user/kid_ryOtonauD/login',
  register: 'https://baas.kinvey.com/user/kid_ryOtonauD',
  books: 'https://baas.kinvey.com/appdata/kid_ryOtonauD/books',
};

export const defaultHeaders = {
  Authorization: JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : '',
};
