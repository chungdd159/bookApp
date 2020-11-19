class UI {
  constructor() {}

  getFormFields() {
    const titleEle = document.querySelector('#title'),
      authorEle = document.querySelector('#author'),
      descriptionEle = document.querySelector('#description'),
      idEle = document.querySelector('#id');

    return {
      titleEle,
      authorEle,
      descriptionEle,
      idEle,
    };
  }

  showMessgae(className, message) {
    // create Dom
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.innerHTML = message;

    const container = content.parentElement;
    container.insertBefore(div, content);

    // clear message
    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  validate(valueArr) {
    let valid = valueArr.every((inputValue) => inputValue.trim() !== '');
    if (!valid) {
      this.showMessgae('alert-danger', 'Please input all fields');
    }
    return valid;
  }

  clearFields() {
    const inputEle = this.getFormFields();
    for (let input in inputEle) {
      inputEle[input].value = '';
    }
  }

  getBooks(books) {
    let output = '';
    let icon = '';
    books.forEach((book) => {
      if (location.hash === '#edit') {
        icon = `
          <span class="card-icon">
            <a class=" card-link"  data-id="${book._id}">
              <i class="fa fa-pencil" id="edit"></i>
            </a>
            <a class=" card-link" data-id="${book._id}">
              <i class="fa fa-remove" id="delete"></i>
            </a>
          </span>`;
      }
      output += `
          <div class='col'>
            <div class='card-group'>
              <p class='card-author'>Author: <span>${book.author}</span></p>
              <h3 class='card-title'>${book.title}</h3>
              <p class='card-desc'>${book.description}
              </p>
              <span class="more" id="more">Read more</span>
              ${icon}
            </div>
          </div>
        `;
    });
    return output;
  }

  changeButton(type) {
    const btnAdd = document.getElementById('submit-book');
    if (type === 'edit') {
      btnAdd.value = 'Update Book';
      // create clear button
      if (!document.querySelector('#cancel-edit')) {
        const clearInput = document.createElement('button');
        clearInput.className = 'btn btn-primary';
        clearInput.id = 'cancel-edit';
        clearInput.innerHTML = 'Cancel';
        btnAdd.parentElement.insertBefore(clearInput, null);
      }
    } else {
      const arrEle = this.getFormFields();
      btnAdd.value = 'Add Book';
      document.querySelector('#cancel-edit').remove();
      ui.clearFields(arrEle);
    }
  }

  seeMore(e) {
    e.previousElementSibling.classList.toggle('show');
    if (e.previousElementSibling.classList.contains('show')) {
      e.innerText = 'See less';
    } else {
      e.innerText = 'Read more';
    }
  }
}

export const ui = new UI();
