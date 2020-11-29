const Register = {
  render: async () => {
    return `
      <div class="form-container" >
        <h2 class="form-title">Sign up</h2>
        <div class="form-group">
          <i class="fas fa-user"></i>
          <input class="form-control" type="text" placeholder="Username" id="username"/>
        </div>
        <div class="form-group">
          <i class="fas fa-lock"></i>
          <input class="form-control" type="password" placeholder="Password" id="password" />
        </div>
        <input type="submit" class="btn" value="Register" id="btn-register"/>
    </div>
    `;
  },
};

export default Register;
