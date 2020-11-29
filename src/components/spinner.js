const Spinner = {
  render: (val) => {
    if (val) {
      const div = document.createElement('div');
      div.className = 'container-loader';
      div.innerHTML = `<span class="loader"></span>`;
      const content = document.querySelector('#content');
      document.body.insertBefore(div, content);
    } else {
      document.querySelector('.container-loader').remove();
    }
  },
};

export default Spinner;
