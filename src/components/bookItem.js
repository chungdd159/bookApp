class BookItem {
  constructor() {
    this.book = null;
  }
  render = async () => {
    return `
        <div class='container'>
          <a class='btn mb-3' href='#dashboard'>Back to dashboard</a>
          <div class='row'>
              <div class='col md-12'>
                <div class='card-group'>
                  <p class='card-author'>Author: <span>${this.book.author}</span></p>
                  <h3 class='card-title'>${this.book.title}</h3>
                  <p class='card-desc show'>${this.book.description}
                  </p>
                </div>
              </div>
          </div>
        </div>  
    `;
  };
}

export const bookItem = new BookItem();
