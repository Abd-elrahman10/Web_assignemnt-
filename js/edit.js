function rendertable (){
let books = JSON.parse(localStorage.getItem("books")) || [];
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("book-panels");
    let panel = document.createElement("div");
    panel.setAttribute("class" , "book-panels")
        for (let i = 0 ; i < books.length ; i++){
            const book = `
            <div class="panel">
                <img src="${books[i].cover}" alt="${books[i].title}">
                <div class="panel-content">
                    <h2>${books[i].title}</h2>
                    <div class="buttons">
                        <button onclick="editbook(${i})" class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                        <button onclick="deletebook(${i})" class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
                    </div>
                </div>
            </div>
        `;
        panel.innerHTML += book ;
        };
        list.appendChild(panel) ;
  });    
}
function editbook(i) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    document.getElementById("book-name-head").textContent = books[i].title;
    window.location.href = "#editUserModal";
    
    let currentbook = {
        currentId: books[i].bookId,
        currenttitle: books[i].title,
        currentauthor: books[i].author,
        currentgenre: books[i].category,
        currentdesc: books[i].desc,
        currentcover: books[i].cover
    };
    
    // Set current values in the form
    document.getElementById("id").value = currentbook.currentId;
    document.getElementById("title").value = currentbook.currenttitle;
    document.getElementById("author").value = currentbook.currentauthor;
    document.getElementById("genre").value = currentbook.currentgenre;
    document.getElementById("description").value = currentbook.currentdesc;
    
    // Display current cover
    const currentCoverImg = document.getElementById("currentCover");
    currentCoverImg.src = currentbook.currentcover;
    currentCoverImg.style.display = "block";
    
    // Handle new cover upload
    const coverImageInput = document.getElementById("coverImage");
    const coverPreview = document.getElementById("coverPreview");
    
    coverImageInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.addEventListener("load", function() {

                currentCoverImg.src = reader.result ;
            });
            
            reader.readAsDataURL(file);
        }
    
    });
    
    document.getElementById("editUserForm").addEventListener("submit", (e) => {
        e.preventDefault();
        let existingMsg = document.querySelector('.form-group .additional');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        let inputId = document.getElementById("id").value;
        let inputtitle = document.getElementById("title").value;
        let inputauthor = document.getElementById("author").value;
        let inputgenre = document.getElementById("genre").value;
        let inputdesc = document.getElementById("description").value;
        
        // Use new cover if uploaded, otherwise keep the current one
        let inputcover = currentCoverImg.src;
        if (inputId === "") {
            showMessage("Book id is required", 0);
            return false;
        }
        const exist = books.find(b => b.id === inputId);
        if (exist) {
            showMessage("Id already exists" , 0);
            return false;
        }
        if (inputtitle === "") {
            showMessage("Book title is required" , 1);
            return false;
        }
        if (inputauthor === "") {
            showMessage("Book author is required" , 2);
            return false;
        }
        if (inputgenre === "") {
            showMessage("Book category is required" , 3);
            return false;
        }
        if (inputdesc === "") {
            showMessage("Book description is required" , 4);
            return false;
        }
        // Rest of your validation and submission logic...
        books[i] = {
            bookId: inputId,
            title: inputtitle,
            author: inputauthor,
            category: inputgenre,
            desc: inputdesc,
            cover: inputcover
        };
        
        localStorage.setItem('books', JSON.stringify(books));
        
        window.location.href = "#";
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Book Edited successfully!';
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.remove();
            window.location.reload();
        }, 1500);
    }, {once: true});
}

function showMessage(text , index) {
    const msg = document.createElement('p');
    msg.className = 'additional';
    msg.textContent = text;
    document.getElementsByClassName("form-group")[index].appendChild(msg);
}
function deletebook(i){
    let books = JSON.parse(localStorage.getItem("books")) || [];
    window.location.href = "#deleteUserModal" ;
    document.getElementById("confirmDelete").addEventListener("click" , ()=>{
    books.splice(i , 1);
    localStorage.setItem('books', JSON.stringify(books));
    window.location.href = "#";
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = 'Book deleted successfully!';
    document.body.appendChild(successMsg);
    setTimeout(() => {
        successMsg.remove();
        window.location.reload();
    }, 1500);
    return ;
    }, {once: true})
    document.getElementById("cancelDelete").addEventListener("click" , ()=>{
    window.location.href = "#";
    return ;
    }, {once: true})
}
rendertable();
