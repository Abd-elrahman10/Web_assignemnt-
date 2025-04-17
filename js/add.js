function addbook(event) {
  event.preventDefault();
  let books = JSON.parse(localStorage.getItem("books")) || [];
  const bookId = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("genre").value;
  const desc = document.getElementById("description").value;
  const coverInput = document.getElementById("coverImage");
  const coverPreview = document.getElementById("coverPreview");
  
  let existingMsg = document.querySelector('.form-group .additional');
  if (existingMsg) {
      existingMsg.remove();
  }

  // Validation
  if (bookId === "") {
      showMessage("Book id is required", 0);
      return false;
  }
  const exist = books.find(b => b.bookId === bookId);
  if (exist) {
      showMessage("Id already exists", 0);
      return false;
  }
  if (title === "") {
      showMessage("Book title is required", 1);
      return false;
  }
  if (author === "") {
      showMessage("Book author is required", 2);
      return false;
  }
  if (category === "") {
      showMessage("Book category is required", 3);
      return false;
  }
  if (desc === "") {
      showMessage("Book description is required", 4);
      return false;
  }
  if (!coverInput.files[0]) {
      showMessage("Book cover is required", 5);
      return false;
  }

  // Process the cover image
  const reader = new FileReader();
  reader.onload = function(e) {
      const coverUrl = e.target.result;
      
      // Create the book object
      const book = { 
          bookId, 
          title, 
          author, 
          category, 
          desc, 
          cover: coverUrl 
      };
      
      // Add to storage
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));

      // Clear form fields
      document.getElementById("addBookForm").reset();
      coverPreview.style.display = "none";
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Book added successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => {
          successMsg.remove();
      }, 3000);
  };
  
  reader.readAsDataURL(coverInput.files[0]);
}

// Add event listener for cover preview in the add form
document.getElementById("coverImage").addEventListener("change", function() {
  const file = this.files[0];
  const coverPreview = document.getElementById("coverPreview");
  
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          coverPreview.src = e.target.result;
          coverPreview.style.display = "flex";
      };
      reader.readAsDataURL(file);
  } else {
      coverPreview.style.display = "none";
  }
});
  function showMessage(text, i) {
    const msg = document.createElement('p');
    msg.className = 'additional';
    msg.textContent = text;
    document.getElementsByClassName("form-group")[i].appendChild(msg);
}