const Register = {
  render: async () => {
    return `
      <form class="form-container" id="register">
        <h2 class="form-title">Sign up</h2>
        <div class="form-group">
          <i class="fas fa-user"></i>
          <input class="form-control" type="text" placeholder="Username" />
        </div>
        <div class="form-group">
          <i class="fas fa-lock"></i>
          <input class="form-control" type="password" placeholder="Password" />
        </div>
        <input type="submit" class="btn" value="Register" />
    </form>
    `;
  },
  after_render: () => {},
};

export default Register;
