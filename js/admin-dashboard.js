document.addEventListener('DOMContentLoaded', () => {
    // Check Authentication
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
        window.location.href = 'index.html';
        return;
    }
    const user = JSON.parse(userJson);
    if (user.role !== 'admin') {
        window.location.href = 'user-dashboard.html';
        return;
    }

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    // Sidebar Navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = `tab-${btn.dataset.target}`;
            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Invalidate map size if map tab is shown
            if (btn.dataset.target === 'map' && window.adminMap) {
                setTimeout(() => window.adminMap.invalidateSize(), 100);
            }
        });
    });

    // Mock Data and Maps
    if (window.initMap) {
        // Init a global admin map centered around India
        window.adminMap = window.initMap('admin-map', 20.5937, 78.9629, 5);
    }

    // Broadcast logic
    document.getElementById('broadcast-btn').addEventListener('click', () => {
        const msg = prompt("Enter Emergency Broadcast Message:");
        if (msg) {
            alert("Broadcast sent: " + msg);
        }
    });
});
