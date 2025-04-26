let subform = document.getElementById("subform");  

var role = "user" ;
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
    const pass = document.getElementById('pass').value;
    const cpass = document.getElementById('cpass').value;
    let username = document.getElementById("usr").value ;
    let hasLetter = /[a-zA-Z]/.test(username);
    // Clear any existing error messages
    const existingMsg = document.querySelector('.additional');
    if (existingMsg) {
        existingMsg.remove();
    }
    if (username === "" || username < 6){
        showMessage("Username must be at least 6 characters" , 0);
        return false ;
    }
    if(!hasLetter){
        showMessage("Username must has characters (a,b,c,etc..)",0);
        return false;
    }
    if (role === ""){
        showMessage("Role is required" , 3) ;
    }
    if (pass !== cpass) {
        showMessage("Passwords do not match" , 2);
        return false;
    }
    if (pass.length < 8 || pass === "") {
        showMessage("Password must be at least 8 characters" , 1);
        return false;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(u => u.username === username );
    if (exists) {
        showMessage("Username already exist" , 0);
        return false ;
    }
    users.push({ username, pass, role , numborrowed : 0});
    localStorage.setItem('users', JSON.stringify(users));
    const successMsg = document.createElement('div');
successMsg.className = 'success-message';
successMsg.textContent = 'Signed up successfully!';
document.body.appendChild(successMsg);
setTimeout(() => {
    successMsg.remove();
    window.location.href = "../app/login.html";
}, 1500);
});
function showMessage(text, i) {
    const msg = document.createElement('p');
    msg.className = 'additional';
    msg.textContent = text;
    document.getElementsByClassName("form-group")[i].appendChild(msg);
}
