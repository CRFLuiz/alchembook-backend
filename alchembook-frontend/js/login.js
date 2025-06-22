document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.textContent = data.message;
            messageDiv.className = 'mt-3 text-center text-success';
            // Redirecionar para a página principal do chat após o login
            setTimeout(() => {
                window.location.href = '/'; // Ou a URL da página principal do chat
            }, 1500);
        } else {
            messageDiv.textContent = data.error || 'Login failed.';
            messageDiv.className = 'mt-3 text-center text-danger';
        }
    } catch (error) {
        console.error('Error during login:', error);
        messageDiv.textContent = 'An error occurred. Please try again later.';
        messageDiv.className = 'mt-3 text-center text-danger';
    }
});
