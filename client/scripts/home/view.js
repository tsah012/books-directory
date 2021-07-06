class View{
    constructor(){
    }

    refresh(){
        const user = JSON.parse(localStorage['user'])
        document.getElementById('greet').textContent = 'Hello ' + user.name;
        if (!user.books.length){
            this.setErrorMessage('You still have no books borrowed');
        } else{
            user.books.forEach((book) => {
                this.addBook(book);
            });
        }
    }

    setErrorMessage(message){
        document.getElementById('error').textContent = message;
    }

    cleanErrorMessage(){
        document.getElementById('error').textContent = '';
    }

    addBook(book){
        let booksList = document.getElementById('ulBooksList');
        let newBook = document.createElement('li');
        let bookText = document.createTextNode(`${book.name} - ${book.author}`);
        newBook.setAttribute('id', book.id);
        newBook.appendChild(bookText);
        booksList.appendChild(newBook);
    }
}