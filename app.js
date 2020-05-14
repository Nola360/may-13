// Book ructor - handles book object

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor - set of prototype methods (add, delete)
function UI() {

}

// UI prototype method - function takes in book object
UI.prototype.addBookToList = function (book) {
  // Targets list Area
  const list = document.querySelector('#book_list');

  // Create tr element
  const row = document.createElement('tr');

  // Insert Columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><i class='fas fa-times'</i></td>
  `;

  list.appendChild(row);

  console.log(row);

}

// showAlert prototype method - construct an element
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div');
  div.className = `alert ${className}`;

  // Add Text
  div.appendChild(document.createTextNode(message));

  // Get Parent
  const container = document.querySelector('.container');

  // Get Form
  const form = document.querySelector('#book_form');

  // Insert Alert
  container.insertBefore(div, form);

  // Disappear after 3sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);

}

UI.prototype.removeBook = function (e) {
  e.target.addEventListener('click', function () {
    console.log(e.target);
  })
}

UI.prototype.deleteBook = function (target) {
  if (target.className === 'fas fa-times') {
    target.parentElement.parentElement.remove();
  }
}

// clearFields prototype method 
UI.prototype.clearFields = function () {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';

}




// Event Listeners to add a book
document.getElementById('book_form').addEventListener('submit', function (e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  console.log(title, author, isbn)

  // Instantiate Book constructor
  const book = new Book(title, author, isbn);

  // Instanciate UI Object
  const ui = new UI();

  // Form Validation
  if (title === '' || author === '' || isbn === '') {
    // Error Alert - takes in message and class params
    ui.showAlert('Fields cannot be empty', 'error');

  } else {

    // Add book to List
    ui.addBookToList(book);

    // Clear Fields
    ui.clearFields();

    // Show success alert
    ui.showAlert('Book Added', 'success');


  }

  e.preventDefault();

  console.log(ui);

});

document.querySelector('#book_list').addEventListener('click', function (e) {

  // Instanciate UI Object
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert('Book Removed', 'success');

  e.preventDefault();


})