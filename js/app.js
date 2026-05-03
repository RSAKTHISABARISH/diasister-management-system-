// Initialize Lucide Icons
function initApp() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Generate Background Particles
    const container = document.getElementById('particles-container');
    if (container) {
        for (let i = 0; i < 18; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            const size = 2 + Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = i % 3 === 0 ? 'var(--primary)' : i % 3 === 1 ? 'var(--secondary)' : 'var(--success)';
            particle.style.opacity = 0.25 + Math.random() * 0.25;
            particle.style.animationDuration = `${10 + Math.random() * 20}s`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            container.appendChild(particle);
        }
    }
}

document.addEventListener('DOMContentLoaded', initApp);
