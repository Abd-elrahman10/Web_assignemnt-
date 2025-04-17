let loggedIn = JSON.parse(localStorage.getItem("loggedInUser")) || "" ;
let nav = document.querySelector(".ul") ;
let admin = document.createElement("li") ;
if (loggedIn.role === "admin"){
window.location.href = "admin/dashboard.html" ;
}
else if (loggedIn.role === "user"){
    window.location.href = "app/dashboard.html" ;
}
