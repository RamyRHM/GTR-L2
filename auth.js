document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === usernameInput.value && u.password === passwordInput.value);

    if (user) {

        sessionStorage.setItem('username', user.username);
        
        if (user.username === 'admin' && passwordInput.value === 'admin123') { 
            sessionStorage.setItem('isAdmin', 'true'); 
        } else {
            sessionStorage.removeItem('isAdmin'); 
        }
        window.location.href = "main.html";
    } else {
        alert("Either the username or password is incorrect.");
    }
});

function createUser() {
    const username = prompt("Enter a username:");
    const password = prompt("Enter a password:");

    if (!username || !password) {
        alert("Both username and password are required.");
        return;
    }

   
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });

    localStorage.setItem('users', JSON.stringify(users));

    alert(`New user account created successfully for ${username}. Welcome`);
    sessionStorage.setItem('username', username);
    window.location.href = "main.html";
}
