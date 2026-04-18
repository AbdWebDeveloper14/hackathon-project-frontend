// Localhost ki tarah poora path dalo
const API = "https://hackathon-project-production-db71.up.railway.app/api/auth";

async function signup() {
    try {
        const data = {
            username: document.getElementById("username").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        const res = await fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            alert("Signup Successful. Please login now.");
            window.location.href = "index.html";
        } else {
            alert(result.msg || "Signup failed");
        }

    } catch (error) {
        console.log(error);
        alert("Server error");
    }
}

async function login() {
    try {
        const data = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            alert("Login Successful");
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            // window.location.href = "dashboard.html";
        } else {
            alert(result.msg || "Login failed");
        }

    } catch (error) {
        console.log(error);
        alert("Server error");
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.href = "index.html";
}

function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        window.location.href = "index.html";
    }
}