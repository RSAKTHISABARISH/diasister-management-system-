document.addEventListener('DOMContentLoaded', () => {
    // Check Authentication
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(userJson);
    document.getElementById('user-name').textContent = user.name || user.email.split('@')[0];
    if (document.getElementById('settings-name')) {
        document.getElementById('settings-name').value = user.name || user.email.split('@')[0];
    }

    // Greeting
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    document.getElementById('greeting').textContent = greeting;

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
            // Remove active class from all
            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const targetId = `tab-${btn.dataset.target}`;
            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Invalidate map size if map tab is shown
            if (btn.dataset.target === 'map' && window.mainMap) {
                setTimeout(() => window.mainMap.invalidateSize(), 100);
            }
        });
    });

    // SOS Functionality
    const triggerBtn = document.getElementById('trigger-sos-btn');
    const cancelBtn = document.getElementById('cancel-sos-btn');
    const idleDiv = document.getElementById('sos-idle');
    const activeDiv = document.getElementById('sos-active');

    function playBuzzer() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
            
            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 1.5);
        } catch (e) {
            console.log('Audio error:', e);
        }
    }

    triggerBtn.addEventListener('click', () => {
        idleDiv.style.display = 'none';
        activeDiv.style.display = 'flex';
        playBuzzer();
    });

    cancelBtn.addEventListener('click', () => {
        activeDiv.style.display = 'none';
        idleDiv.style.display = 'block';
    });

    // Location
    function setLocation(lat, lng, name = "") {
        if (document.getElementById('lat-display')) document.getElementById('lat-display').textContent = lat.toFixed(6);
        if (document.getElementById('lng-display')) document.getElementById('lng-display').textContent = lng.toFixed(6);
        if (document.getElementById('user-location')) {
            document.getElementById('user-location').textContent = name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }

        // Init mini map
        if (window.initMap) {
            window.initMap('mini-map', lat, lng, 15);
            window.mainMap = window.initMap('main-map', lat, lng, 13);
        }
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocation(pos.coords.latitude, pos.coords.longitude);
        }, (err) => {
            console.error("Geolocation error:", err);
            // Fallback to Mumbai
            setLocation(19.0760, 72.8777, "Mumbai, India (Fallback)");
        });
    } else {
        // Fallback to Mumbai
        setLocation(19.0760, 72.8777, "Mumbai, India (Fallback)");
    }
});
