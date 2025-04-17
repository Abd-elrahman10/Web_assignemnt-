let subform = document.getElementById("subform");  
var role ;
const adrole = document.getElementById("adrole").addEventListener("click" , ()=>{
        role = "admin" ;
        return ;
    } )
const usrole = document.getElementById("usrole").addEventListener("click" , ()=>{
        role = "user" ;
        return ;
    } )
subform.addEventListener('submit', function(e) {
    // Prevent default form submission
    e.preventDefault();
    let username = document.getElementById("usr").value ;
    let password = document.getElementById("pass").value ;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.pass === password && u.role === role);
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
        const msg = document.createElement('p');
        msg.className = 'additional';
        msg.textContent = 'Invalid Credentials ';
        document.getElementById("pass").insertAdjacentElement("afterend" , msg)
        setTimeout(() => {
            msg.remove();
        }, 1000);
        return false ;
    }
    if (role === "admin"){
        window.location.href = "../admin/dashboard.html";
        }
        else{role === "user"}{
        window.location.href = "../index.html";    
        }
});