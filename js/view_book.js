document.addEventListener('DOMContentLoaded', function() {
    const books = [
        {id: 1, title: "The Lost Kings", author: "Jane Doe", category: "Mystery", cover: "../img/IMG_2877.jpg"},
        {id: 2, title: "The Silent Patient", author: "Alex Michaelides", category: "Thriller", cover: "../img/silent_patient.jpg"},
        {id: 3, title: "Educated", author: "Tara Westover", category: "Memoir", cover: "../img/educated.jpg"},
        {id: 4, title: "Atomic Habits", author: "James Clear", category: "Self-Help", cover: "../img/atomic_habits.jpg"}
    ];

    const bookContainer = document.createElement('div');
    bookContainer.className = 'book-panels';
    document.querySelector('main').appendChild(bookContainer);

    function renderBooks(booksToRender) {
        bookContainer.innerHTML = '';
        booksToRender.forEach(book => {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.innerHTML = `
                <img src="${book.cover}" alt="${book.title}">
                <div class="panel-content">
                    <h2>${book.title}</h2>
                    <div class="buttons">
                        <a href="#borrow${book.id}" class="borrow-btn">Borrow</a>
                        <a href="#book-info${book.id}" class="info-btn">More Info</a>
                    </div>
                </div>
            `;
            bookContainer.appendChild(panel);
            createModals(book);
        });
    }

    function createModals(book) {
        const borrowModal = document.createElement('div');
        borrowModal.id = `borrow${book.id}`;
        borrowModal.className = 'modal';
        borrowModal.innerHTML = `
            <div class="modal-content">
                <a href="#" class="close-btn">&times;</a>
                <h2>Borrow ${book.title}</h2>
                <form class="borrow-form" data-book-id="${book.id}">
                    <div class="form-group"><label>Full Name</label><input type="text" required></div>
                    <div class="form-group"><label>Age</label><input type="number" min="12" max="100" required></div>
                    <div class="form-group"><label>Phone</label><input type="tel" required></div>
                    <div class="form-group"><label>Duration</label>
                        <select required>
                            <option value="">Select duration</option>
                            <option value="1 week">1 Week</option>
                            <option value="2 weeks">2 Weeks</option>
                            <option value="1 month">1 Month</option>
                        </select>
                    </div>
                    <div class="form-group"><label>Why this book?</label><textarea required></textarea></div>
                    <button type="submit" class="submit-btn">Submit</button>
                </form>
            </div>
        `;

        const infoModal = document.createElement('div');
        infoModal.id = `book-info${book.id}`;
        infoModal.className = 'modal';
        infoModal.innerHTML = `
            <div class="modal-content book-info-modal">
                <a href="#" class="close-btn">&times;</a>
                <h2>Book Info</h2>
                <div class="book-info-grid">
                    <div class="info-item"><span class="info-label">Title:</span><span class="info-value">${book.title}</span></div>
                    <div class="info-item"><span class="info-label">Author:</span><span class="info-value">${book.author}</span></div>
                    <div class="info-item"><span class="info-label">Category:</span><span class="info-value">${book.category}</span></div>
                </div>
            </div>
        `;

        document.body.appendChild(borrowModal);
        document.body.appendChild(infoModal);
    }

    document.getElementById('search').addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const filtered = term ? books.filter(b => 
            b.title.toLowerCase().includes(term) || 
            b.author.toLowerCase().includes(term) || 
            b.category.toLowerCase().includes(term)
        ) : books;
        renderBooks(filtered);
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            window.location.hash = '';
        }
        if (e.target.classList.contains('close-btn')) {
            e.preventDefault();
            window.location.hash = '';
        }
    });

    document.addEventListener('submit', function(e) {
        if (e.target.classList.contains('borrow-form')) {
            e.preventDefault();
            alert(`Request submitted for ${books.find(b => b.id == e.target.dataset.bookId).title}`);
            window.location.hash = '';
        }
    });

    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.className = 'menu-toggle';
        document.querySelector('.logo').after(menuToggle);
        menuToggle.addEventListener('click', function() {
            document.querySelector('.menu').classList.toggle('active');
        });
    }

    renderBooks(books);
});
