function rendertable() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    window.addEventListener("load", (e) => {
        let bef = document.getElementById("users-head");
        let userstable = document.createElement("tbody");
        let existingTbody = bef.nextElementSibling;
        if (existingTbody && existingTbody.tagName === 'TBODY') {
            existingTbody.remove();
        }
        
        for (let i = 0; i < users.length; i++) {
            userstable.innerHTML += `
                <tr>
                    <td>${i+1}</td>
                    <td>${users[i].username}</td>
                    <td>${users[i].role}</td>
                    <td>${users[i].numborrowed == "" ? 0 : users[i].numborrowed}</td>
                    <td class="actions">
                        <button onclick="edituser(${i})" class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                        <button onclick="deleteuser(${i})" class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
                    </td>
                </tr>
            `;
        }
        bef.insertAdjacentElement("afterend", userstable);
    });
}

function edituser(i) {
    let loggedInusers = JSON.parse(localStorage.getItem("loggedInUser")) || [];
    let users = JSON.parse(localStorage.getItem("users")) || [];
    window.location.href = "#editUserModal";
    
    let inputuser = document.getElementById("editUserName");
    let inputrole = document.getElementById("editUserRole");
    let currentUsername = users[i].username;
    
    inputuser.value = currentUsername;
    inputrole.value = users[i].role;
    
    document.getElementById("editUserForm").addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Clear any existing messages
        let existingMsg = document.querySelector('.form-group .additional');
        if (existingMsg) {
            existingMsg.remove();
        }
        if (inputuser.value === "" || inputrole.value === "") {
            showMessage("Username and Role are required");
            return false;
        }
        
        // Check if username exists (excluding current user)
        const exist = users.find(u => u.username === inputuser.value) || loggedInusers.find(u=> u.username === inputuser.value);
        if (exist) {
            showMessage("Username already exists");
            return false;
        }
        
        // Update user
        users[i].username = inputuser.value;
        users[i].role = inputrole.value;
        localStorage.setItem("users", JSON.stringify(users));
        
        // Close modal and refresh
        window.location.href = "#";
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'User Edited successfully!';
        document.body.appendChild(successMsg);
        setTimeout(() => {
            successMsg.remove();
            window.location.reload();
        }, 1500);
        return ;
    }, {once: true}); // Use {once: true} to prevent multiple listeners
}

function showMessage(text) {
    const msg = document.createElement('p');
    msg.className = 'additional';
    msg.textContent = text;
    document.getElementsByClassName("form-group")[0].appendChild(msg);
}
function deleteuser(i){
    window.location.href = "#deleteUserModal" ;
    document.getElementById("confirmDelete").addEventListener("click" , ()=>{
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInusers = JSON.parse(localStorage.getItem("loggedInUser")) || [];
    if(loggedInusers.username === users[i].username){
        return false ;
    }
    users.splice(i , 1);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = "#";
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = 'User deleted successfully!';
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
