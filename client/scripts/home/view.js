class View{
    constructor(){
    }

    refresh(){
        const user = JSON.parse(localStorage['user'])
        document.getElementById('greet').textContent = 'Hello ' + user.name;
        document.getElementById('ulBooksList').innerHTML = '';
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

    addBook(book) {
        let booksList = document.getElementById('ulBooksList');
        let newBook = document.createElement('li');
        newBook.setAttribute('id', book._id);

        let bookText = document.createTextNode(`${book.name} - ${book.author}`);

        let bookIcon = document.createElement('i');
        bookIcon.setAttribute('class', 'glyphicon glyphicon-remove-sign	');
        bookIcon.style.marginLeft = '15px';
        bookIcon.style.color = 'grey';

        newBook.appendChild(bookText);
        newBook.appendChild(bookIcon);
        booksList.appendChild(newBook);

        newBook.addEventListener('click', ()=>{
            let removeBookAtr = newBook.hasAttribute('remove');
            if (removeBookAtr){
                newBook.removeAttribute('remove');
                newBook.getElementsByTagName('i')[0].style.color = 'grey';
            }
            else{
                newBook.setAttribute('remove', '');
                newBook.getElementsByTagName('i')[0].style.color = 'red';
            }
        });
    }
}