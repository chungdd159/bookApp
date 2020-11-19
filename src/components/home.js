const Home = {
  render: async () => {
    return `
    <div class="container">
      <div class="home">
        <div class="home-bg"></div>
        <div class="home__content">
          <h3>Welcome</h3>
          <p>Welcome to our book library</p>
          <a href="#login" class="btn">Login Now</a>
        </div>
      </div>
    </div>
   
    `;
  },

  after_render: async () => {},
};

export default Home;
