const Login = {
  render: async () => {
    return `
      <div class="form-container" id="login">
        <div class="login-bg"></div>
        <h2 class="form-title">Sign in</h2>
        <div class="form-group">
          <i class="fas fa-user"></i>
          <input
            class="form-control"
            type="text"
            placeholder="Username"
            id="username"
          />
        </div>
        <div class="form-group">
          <i class="fas fa-lock"></i>
          <input
            class="form-control"
            type="password"
            placeholder="Password"
            id="password"
          />
        </div>
        <input type="submit" value="Login" class="btn" id="btn-login" />
    </div>
    `;
  },

  after_render: async () => {},
};

export default Login;
