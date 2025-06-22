document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('message');

    if (password !== confirmPassword) {
        messageDiv.textContent = 'Passwords do not match!';
        messageDiv.className = 'mt-3 text-center text-danger';
        return;
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.textContent = data.message;
            messageDiv.className = 'mt-3 text-center text-success';
            // Redirecionar para a página de login ou para o chat após o cadastro
            setTimeout(() => {
                window.location.href = '/login.html'; 
            }, 2000);
        } else {
            messageDiv.textContent = data.error || 'Sign up failed.';
            messageDiv.className = 'mt-3 text-center text-danger';
        }
    } catch (error) {
        console.error('Error during signup:', error);
        messageDiv.textContent = 'An error occurred. Please try again later.';
        messageDiv.className = 'mt-3 text-center text-danger';
    }
});
