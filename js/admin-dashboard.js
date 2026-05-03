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
    const mockAlerts = [
        { id: 1, user: "John Doe", location: "Mumbai, MH", type: "Medical", status: "Critical", time: "2 mins ago" },
        { id: 2, user: "Jane Smith", location: "Delhi, DL", type: "Fire", status: "Active", time: "5 mins ago" },
        { id: 3, user: "Rahul Kumar", location: "Bangalore, KA", type: "Flood", status: "Pending", time: "12 mins ago" }
    ];

    function populateDashboard() {
        const tableBody = document.getElementById('alerts-table-body');
        const totalStat = document.getElementById('stat-total');
        const activeStat = document.getElementById('stat-active');

        if (totalStat) totalStat.textContent = mockAlerts.length;
        if (activeStat) activeStat.textContent = mockAlerts.filter(a => a.status !== 'Resolved').length;

        if (tableBody) {
            tableBody.innerHTML = '';
            mockAlerts.forEach(alert => {
                const tr = document.createElement('tr');
                tr.style.cursor = 'pointer';
                tr.innerHTML = `
                    <td>
                        <div style="font-weight: 600;">${alert.user}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${alert.location}</div>
                    </td>
                    <td>
                        <span class="badge" style="background: ${alert.status === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : alert.status === 'Active' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)'}; color: ${alert.status === 'Critical' ? '#ef4444' : alert.status === 'Active' ? '#f59e0b' : '#3b82f6'}; border: none;">
                            ${alert.status}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline" onclick="viewAlert(${alert.id})" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">View</button>
                    </td>
                `;
                tr.addEventListener('click', () => viewAlert(alert.id));
                tableBody.appendChild(tr);
            });
        }
    }

    window.viewAlert = (id) => {
        const alert = mockAlerts.find(a => a.id === id);
        const detailsPanel = document.getElementById('alert-details-panel');
        if (alert && detailsPanel) {
            detailsPanel.innerHTML = `
                <div class="glass-card fade-in" style="padding: 2rem;">
                    <h3 style="margin-bottom: 1.5rem;">Alert Details</h3>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">USER</p>
                            <p style="font-weight: 600;">${alert.user}</p>
                        </div>
                        <div>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">TYPE</p>
                            <p style="font-weight: 600;">${alert.type} Emergency</p>
                        </div>
                        <div>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">STATUS</p>
                            <span class="badge" style="background: ${alert.status === 'Critical' ? '#ef4444' : '#f59e0b'}; color: white;">${alert.status}</span>
                        </div>
                        <hr style="border: 0; border-top: 1px solid var(--border); margin: 0.5rem 0;">
                        <button class="btn btn-primary" style="width: 100%;" onclick="alert('Dispatching team for ${alert.user}...')">Dispatch Responders</button>
                    </div>
                </div>
            `;
        }
    };

    populateDashboard();

    if (window.initMap) {
        window.adminMap = window.initMap('admin-map', 20.5937, 78.9629, 5);
        
        if (window.addMarker) {
            // Alert Markers
            window.addMarker(window.adminMap, 19.0760, 72.8777, 'user', 'John Doe - Critical Alert');
            window.addMarker(window.adminMap, 28.6139, 77.2090, 'user', 'Jane Smith - Active Alert');
            window.addMarker(window.adminMap, 12.9716, 77.5946, 'user', 'Rahul Kumar - Pending Alert');

            // Regional Hospitals
            window.addMarker(window.adminMap, 19.1000, 72.9000, 'hospital', 'Mumbai Specialty Hospital');
            window.addMarker(window.adminMap, 28.6500, 77.2300, 'hospital', 'Delhi Central Medical');

            // Regional Weather Alerts
            window.addMarker(window.adminMap, 15.2993, 74.1240, 'weather', 'Cyclone Warning: Goa Coast');
        }
    }

    // Broadcast logic
    document.getElementById('broadcast-btn').addEventListener('click', () => {
        const msg = prompt("Enter Emergency Broadcast Message:");
        if (msg) {
            alert("Broadcast sent: " + msg);
        }
    });
});
