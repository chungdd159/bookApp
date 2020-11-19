const Spinner = {
  render: (val) => {
    if (val) {
      const div = document.createElement('div');
      div.className = 'loader';
      const content = document.querySelector('#content');
      const container = content.querySelector('.form-container');
      content.insertBefore(div, container);
    } else {
      document.querySelector('.loader').remove();
    }
  },
};

export default Spinner;
