async function fetchLeaderboard() {
    const tableBody = document.getElementById('leaderboardBody');

    try {
        const response = await fetch('http://localhost:5000/api/auth/leaderboard');
        const topUsers = await response.json();

        tableBody.innerHTML = topUsers.map((user, index) => `
            <tr>
                <td><div class="rank-badge">${index + 1}</div></td>
                <td><strong>${user.username}</strong></td>
                <td>${user.location || 'Pakistan'}</td>
                <td>
                    ${user.skills.slice(0, 2).map(s => `<span class="skill-chip">${s}</span>`).join('')}
                </td>
                <td><span class="trust-score-pill">${user.trustScore}</span></td>
                <td>${user.badges.length > 0 ? user.badges.join(', ') : '🏅 Newcomer'}</td>
            </tr>
        `).join('');

    } catch (err) {
        console.error("Leaderboard Error:", err);
        tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Failed to load leaderboard.</td></tr>";
    }
}

fetchLeaderboard();