class User {
  constructor() {
    (this.appKey = 'kid_ryOtonauD'),
      (this.appSecret = 'd2c908b36d5b4ab8bcaae7d924a0a663');
  }

  getBaseAuth(username, password) {
    const headers = {
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json',
    };

    return headers;
  }

  // @route       /user/app_key
  // desc         register user and get token
  async registerUser(url, user) {
    const headers = this.getBaseAuth(this.appKey, this.appSecret);
    const body = JSON.stringify(user);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      if (response.ok === false) {
        throw `${response.status}: ${response.statusText}`;
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  // @route       /user/app_key/login
  // desc         login user and get token
  async loginUser(url, user) {
    const { username, password } = user;
    const headers = this.getBaseAuth(username, password);
    const body = JSON.stringify(user);
    try {
      const response = await fetch(url, { method: 'POST', headers, body });

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  // @route       /user/app_key/:id
  // desc         delete user
  async deleteUser(url, user) {
    const { username, password } = user;

    const headers = this.getBaseAuth(username, password);
    try {
      const response = await fetch(url, { method: 'DELETE', headers });
      if (response.ok === false) {
        throw response.statusText;
      }
      return 'user deleted';
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export const user = new User();
