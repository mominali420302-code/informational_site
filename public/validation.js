function validatePassword() {
    // Get password fields
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords are empty
    if (!password || !confirmPassword) {
        alert("Password fields cannot be empty!");
        return false; // prevent form submission
    }

    // Check password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Optional: check password strength (letters + numbers)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(password)) {
        alert("Password must contain letters and numbers.");
        return false;
    }

    // If all checks pass
    return true; // allow form submission
}
