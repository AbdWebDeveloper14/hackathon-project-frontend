document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const msgDiv = document.getElementById('responseMsg');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // UI Loading State
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";
    msgDiv.style.display = "block";
    msgDiv.innerText = "Sending request...";

    // 1. Token Check (Make sure login page saves it as 'token')
    const token = localStorage.getItem('token'); 
    
    if (!token) {
        msgDiv.style.color = "red";
        msgDiv.innerText = "Error: No Auth Token found. Please login again.";
        submitBtn.disabled = false;
        submitBtn.innerText = "Post Request";
        return;
    }

    // 2. Data Preparation (Match your HelpRequest.js Model)
    const requestData = {
        title: document.getElementById('reqTitle').value,
        description: document.getElementById('reqDesc').value,
        urgency: document.getElementById('reqUrgency').value || "Medium",
        location: document.getElementById('reqLoc').value || "Remote",
        tags: document.getElementById('reqTags').value ? 
              document.getElementById('reqTags').value.split(',').map(t => t.trim()) : []
    };

    console.log("Sending Data:", requestData); // Debugging ke liye

    try {
        // 3. API Call (Port 5000 check kar lena server.js mein)
        const response = await fetch('http://localhost:5000/api/requests/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ye Bearer likhna lazmi hai
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        console.log("Server Response:", result);

        if (response.ok) {
            msgDiv.style.color = "#15b7a1";
            msgDiv.innerText = "🚀 Success! Request posted.";
            
            // Form clear kardo
            e.target.reset();

            setTimeout(() => {
                window.location.href = 'explore.html';
            }, 1500);
        } else {
            msgDiv.style.color = "red";
            msgDiv.innerText = "Server says: " + (result.msg || result.error || "Failed to post");
            submitBtn.disabled = false;
            submitBtn.innerText = "Post Request";
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        msgDiv.style.color = "red";
        msgDiv.innerText = "Network Error: Check if Backend is running on Port 5000";
        submitBtn.disabled = false;
        submitBtn.innerText = "Post Request";
    }
});