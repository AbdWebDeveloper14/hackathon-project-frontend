const feedContainer = document.getElementById('requestsFeed');
const filterForm = document.getElementById('filterForm');

// 1. Fetch function
async function loadExploreFeed() {
    try {
        const response = await fetch('http://localhost:5000/api/requests/all');
        const requests = await response.json();

        displayRequests(requests);
        
        // Setup Live Filtering
        filterForm.addEventListener('input', () => {
            filterData(requests);
        });
    } catch (err) {
        console.error("Fetch Error:", err);
        feedContainer.innerHTML = "<p>Failed to connect to backend server.</p>";
    }
}

// 2. Display function
function displayRequests(data) {
    if (data.length === 0) {
        feedContainer.innerHTML = "<h3>No help requests found.</h3>";
        return;
    }

    feedContainer.innerHTML = data.map(req => `
        <div class="request-card">
            <div class="card-tags">
                <span class="badge badge-tech">${req.category}</span>
                <span class="badge badge-urgency">${req.urgency}</span>
                <span class="badge">${req.status}</span>
            </div>
            <h3 style="font-size: 22px; margin-bottom: 10px;">${req.title}</h3>
            <p style="color: #555; font-size: 15px; line-height: 1.5;">${req.description}</p>
            
            <div class="card-footer">
                <div class="user-meta">
                    <strong style="display:block;">${req.user ? req.user.username : 'Anonymous'}</strong>
                    <small style="color:#888;">${req.location || 'Remote'} • Trust Score: ${req.user ? req.user.trustScore : 0}</small>
                </div>
                <button class="btn-platform" style="background:white; color:black; border:1px solid #ddd; padding: 10px 20px;">Open Details</button>
            </div>
        </div>
    `).join('');
}

// 3. Simple Frontend Filter logic
function filterData(allData) {
    const cat = document.getElementById('catFilter').value;
    const urgency = document.getElementById('urgencyFilter').value;
    const loc = document.getElementById('locFilter').value.toLowerCase();

    const filtered = allData.filter(req => {
        return (cat === "" || req.category === cat) &&
               (urgency === "" || req.urgency === urgency) &&
               (req.location.toLowerCase().includes(loc));
    });

    displayRequests(filtered);
}

loadExploreFeed();