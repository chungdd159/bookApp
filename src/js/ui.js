class UI {
  constructor() {
    this.content = document.querySelector('.content');
  }

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

  showMessenge(className, message) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.innerHTML = message;

    this.content.prepend(div);

    // clear message
    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  validate(...rest) {
    let valid = rest.every((inputValue) => inputValue.trim() !== '');
    if (!valid) {
      this.showMessenge('alert-danger', 'Please input all fields');
    }
    return valid;
  }

  clearFields(...rest) {
    rest.forEach((input) => {
      input.value = '';
    });
  }

  showBooks(books) {
    let output = '';
    books.forEach((book) => {
      output += `
          <div class='col ${location.hash === '#edit' ? 'md-12' : 'md-6'}'>
            <div class='card-group'>
              <p class='card-author'>Author: <span>${book.author}</span></p>
              <h3 class='card-title'>${book.title}</h3>
              <p class='card-desc'>${book.description}
              </p>
              ${
                location.hash === '#edit'
                  ? '<span class="more" id="more">Read more</span>'
                  : `<span class="more" id="book-detail" data-id=${book._id}>Read more</span>`
              }
              
              ${
                location.hash === '#edit'
                  ? `
                  <span class="card-icon">
                    <a class=" card-link"  data-id="${book._id}">
                      <i class="fa fa-pencil" id="edit"></i>
                    </a>
                    <a class=" card-link" data-id="${book._id}">
                      <i class="fa fa-remove" id="delete"></i>
                    </a>
                  </span>
                  `
                  : ''
              }
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
      const {
        titleEle,
        authorEle,
        descriptionEle,
        idEle,
      } = this.getFormFields();
      btnAdd.value = 'Add Book';
      document.querySelector('#cancel-edit').remove();
      ui.clearFields(titleEle, authorEle, descriptionEle, idEle);
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

  fillForm(e) {
    const id = e.parentElement.dataset.id;
    const cardGroup = e.parentElement.parentElement.parentElement,
      title = cardGroup.querySelector('.card-title').innerHTML,
      author = cardGroup.querySelector('.card-author span').innerHTML,
      description = cardGroup.querySelector('.card-desc').innerHTML;

    const { titleEle, authorEle, descriptionEle, idEle } = this.getFormFields();

    titleEle.value = title;
    authorEle.value = author;
    descriptionEle.value = description;
    idEle.value = id;

    this.changeButton('edit');
  }
}

export const ui = new UI();
