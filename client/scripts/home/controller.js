class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.baseUrl = window.location.origin;
    }

    async logout() {
        let url = this.baseUrl + '/logout';
        try {
            let res = await this.model.logout();
            window.location.href = this.baseUrl + '/login';
        }
        catch (error) {
            this.view.setErrorMessage(error.message);
            console.log('error occurred during logout. error:\n' + error);
        }
    }

    loadData() {
        this.view.refresh();
    }

    async save() {
        const user = JSON.parse(localStorage['user']);
        const booksToRemove = [];
        document.querySelectorAll('[remove]').forEach((book) => {
            booksToRemove.push(book.id);
        });

        // Update user books in local storage
        user.books = user.books.filter((book) => {
            return !booksToRemove.includes(book._id);
        });

        try {
            const bookIds = user.books.map((book) => { return book._id });
            const res = await this.model.updateBooks(bookIds);
            if (res.status) {
                user.books = res.data;
                localStorage['user'] = JSON.stringify(user);
                this.view.refresh();
            } else {
                this.view.setErrorMessage(res.message);
            }
        } catch (error) {
            this.view.setErrorMessage(error.message);
        }
    }
}

const ctrl = new Controller();
