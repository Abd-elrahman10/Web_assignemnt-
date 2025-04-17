document.addEventListener("DOMContentLoaded", () => {
    var books = JSON.parse(localStorage.getItem("books")) || [];
    let list = document.getElementById("book-list");
    let panel = document.createElement("div");
    panel.setAttribute("class", "book-panels");
    
    for (let i = 0; i < books.length; i++) {
        // Check if book is already borrowed
        const isBorrowed = books[i].borrowed || false;
        
        const book = `
        <div class="panel" data-book-index="${i}">
            <img src="${books[i].cover}" alt="${books[i].title}">
            <div class="panel-content">
                <h2>${books[i].title}</h2>
                <div class="buttons" data-book-index="${i}">
                    ${isBorrowed ? 
                        '<span class="borrowed-label">BORROWED</span>' : 
                        `<a href="#borrow${i+1}" class="borrow-btn">Borrow</a>
                         <a href="#book-info${i+1}" class="info-btn">More Info</a>`}
                </div>
            </div>
        </div>
        ${isBorrowed ? '' : `
        <div id="borrow${i+1}" class="modal" data-book-index="${i}">
                        <div class="modal-content">
                <a href="#" class="close-btn">&times;</a>
                <h2>Borrow ${books[i].title}</h2>
                <form class="borrow-form">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name">
                    </div>
                    
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" id="age" name="age">
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    
                    <div class="form-group">
                        <label for="duration">How long will you keep the book?</label>
                        <select id="duration" name="duration">
                            <option value="">Select duration</option>
                            <option value="1 week">1 Week</option>
                            <option value="2 weeks">2 Weeks</option>
                            <option value="1 month">1 Month</option>
                            <option value="2 months">2 Months</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="reason">Why this specific book?</label>
                        <textarea id="reason" name="reason"></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">Submit Request</button>
                </form>
            </div>
        </div>
        `}
        <div id="book-info${i+1}" class="modal">
            <div class="modal-content book-info-modal">
                <a href="#" class="close-btn">&times;</a>
                <h2>Book Information</h2>
                <div class="book-info-grid">
                    <div class="info-item">
                        <span class="info-label">Book ID:</span>
                        <span class="info-value">${books[i].bookId}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Book Title:</span>
                        <span class="info-value">${books[i].title}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Author:</span>
                        <span class="info-value">${books[i].author}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Category:</span>
                        <span class="info-value">${books[i].category}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Description:</span>
                        <span class="info-value">${books[i].desc}</span>
                    </div>
                </div>
            </div>
        </div>`;
        panel.innerHTML += book;
    };
    
    list.appendChild(panel);
    
    // Add event delegation for form submission
    document.addEventListener('submit', function(e) {
        if (e.target.matches('form.borrow-form')) {
            e.preventDefault();
            const form = e.target;
            
            // Clear any existing messages
            let existingMsgs = form.querySelectorAll('.additional');
            existingMsgs.forEach(msg => msg.remove());
    
            // Get the book index from the modal's data attribute
            const modal = form.closest('.modal');
            const bookIndex = parseInt(modal.dataset.bookIndex);
            
            // Form elements
            const fullname = form.querySelector('#name');
            const age = form.querySelector('#age');
            const phone = form.querySelector('#phone');
            const duration = form.querySelector('#duration');
            
            // Validation checks
            let isValid = true;
            
            if (!fullname.value || fullname.value.length < 8) {
                showMessage("Full name is required and must be at least 8 characters", 0, form);
                isValid = false;
            }
            
            if (!age.value || parseInt(age.value) < 16) {
                showMessage("Age is required and must be at least 16 years", 1, form);
                isValid = false;
            }
            
            if (!phone.value || !/^\d{10,15}$/.test(phone.value)) {
                showMessage("Valid phone number is required (10-15 digits)", 2, form);
                isValid = false;
            }
            
            if (!duration.value) {
                showMessage("Please select a duration", 3, form);
                isValid = false;
            }
            
            // If validation failed, stop here
            if (!isValid) {
                return false;
            }

            // Get user and borrowed books data
            let loginuser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
            let users = JSON.parse(localStorage.getItem("users")) || {};
            let user = users.findIndex(u => u.username = loginuser.username);
            let borrowedBooks = JSON.parse(localStorage.getItem("borrowedbooks")) || [];
            
            // Create borrowed book record
            const borrowedBook = {
                username: loginuser.username,
                role: loginuser.role,
                bookTitle: books[bookIndex].title,
                bookId: books[bookIndex].bookId,
                borrowerName: fullname.value,
                borrowerAge: age.value,
                borrowerPhone: phone.value,
                duration: duration.value,
                borrowDate: new Date().toISOString()
            };
            
            // Update data
            borrowedBooks.push(borrowedBook);
            loginuser.numborrowed = (loginuser.numborrowed || 0) + 1;
            users[user].numborrowed = (users[user].numborrowed || 0) + 1 ;
            
            // Mark book as borrowed in the books array
            books[bookIndex].borrowed = true;
            
            // Save all changes
            
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('borrowedbooks', JSON.stringify(borrowedBooks));
            localStorage.setItem('loggedInUser', JSON.stringify(loginuser));
            localStorage.setItem('books', JSON.stringify(books));
            
            // Update the UI - replace buttons with "Borrowed" label
            const buttonsDiv = document.querySelector(`.buttons[data-book-index="${bookIndex}"]`);
            if (buttonsDiv) {
                buttonsDiv.innerHTML = '<span class="borrowed-label">BORROWED</span>';
                buttonsDiv.classList.add('borrowed');
            }
            
            // Remove the borrow modal
            modal.remove();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Book borrowed successfully!';
            document.body.appendChild(successMsg);
            setTimeout(() => successMsg.remove(), 3000);
            
            form.reset();
        }
    });
});

function showMessage(text, i, form) {
    const msg = document.createElement('p');
    msg.className = 'additional';
    msg.textContent = text;
    form.getElementsByClassName("form-group")[i].appendChild(msg);
}