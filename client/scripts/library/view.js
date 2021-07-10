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
        newBook.setAttribute('id', book._id);

        let bookText = document.createTextNode(`${book.name} - ${book.author}`);

        let bookIcon = document.createElement('i');
        bookIcon.setAttribute('class', 'glyphicon glyphicon-check');
        bookIcon.style.marginLeft = '15px';
        bookIcon.style.color = 'grey';

        newBook.appendChild(bookText);
        newBook.appendChild(bookIcon);
        booksList.appendChild(newBook);

        newBook.addEventListener('click', ()=>{
            let borrow = newBook.hasAttribute('borrow');
            if (borrow){
                newBook.removeAttribute('borrow');
                newBook.getElementsByTagName('i')[0].style.color = 'grey';
            }
            else{
                newBook.setAttribute('borrow', '');
                newBook.getElementsByTagName('i')[0].style.color = 'green';
            }
        });
    }
}