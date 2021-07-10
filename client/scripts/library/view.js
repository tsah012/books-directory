class View {
    constructor() {
    }

    refresh(books) {
        document.getElementById('ulBooksList').innerHTML = '';
        books.forEach((book) => {
            this.addBook(book);
        });
    }

    setErrorMessage(message) {
        document.getElementById('error').textContent = message;
    }

    cleanErrorMessage() {
        document.getElementById('error').textContent = '';
    }

    addBook(book) {
        let booksList = document.getElementById('ulBooksList');
        let newBook = document.createElement('li');
        let bookText = document.createTextNode(`${book.name} - ${book.author}`);
        newBook.setAttribute('id', book._id);
        newBook.appendChild(bookText);
        booksList.appendChild(newBook);
    }
}