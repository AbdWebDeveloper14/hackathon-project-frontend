function toggleAuth() {
    const login = document.getElementById('loginSection');
    const signup = document.getElementById('signupSection');
    login.style.display = login.style.display === 'none' ? 'block' : 'none';
    signup.style.display = signup.style.display === 'none' ? 'block' : 'none';
}

const authMsg = document.getElementById('authMsg');

// --- LOGIN LOGIC ---
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPass').value;

    try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token); // CRITICAL: Save token
            authMsg.style.color = "green";
            authMsg.innerText = "Login Successful!";
            setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
            authMsg.style.color = "red";
            authMsg.innerText = data.msg;
        }
    } catch (err) { authMsg.innerText = "Server Error"; }
});

// --- SIGNUP LOGIC ---
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = {
        username: document.getElementById('signName').value,
        email: document.getElementById('signEmail').value,
        password: document.getElementById('signPass').value,
        location: document.getElementById('signLoc').value
    };

    try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            authMsg.style.color = "green";
            authMsg.innerText = "Account Created!";
            setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
            authMsg.style.color = "red";
            authMsg.innerText = data.msg;
        }
    } catch (err) { authMsg.innerText = "Server Error"; }
});