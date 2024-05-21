document.addEventListener('DOMContentLoaded', function() {
    // Fetch the current username and password from sessionStorage
    const currentUsername = sessionStorage.getItem('username');
    const currentPassword = sessionStorage.getItem('password');

    // Attach an event listener to the settings form
    document.getElementById('settingsForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the new username and password from the form
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Find the user in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === currentUsername);

        // Check if the user exists and if the current password matches

            // Update the user's details
            user.username = newUsername;
            user.password = newPassword? newPassword : user.password; // Keep the old password if not changed

            // Save the updated user details back to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Update the sessionStorage with the new username and password
            sessionStorage.setItem('username', newUsername);
            sessionStorage.setItem('password', newPassword);

            alert("Your settings have been updated successfully!");
            window.location.href = "main.html"; // Redirect back to the main page

    });
});
