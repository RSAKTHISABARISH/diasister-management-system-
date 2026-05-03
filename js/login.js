document.addEventListener('DOMContentLoaded', () => {
    // Generate background particles
    const container = document.getElementById('particles-container');
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

    // State
    let isRegistering = false;
    let currentRole = 'user';
    let showPassword = false;

    // Elements
    const form = document.getElementById('login-form');
    const roleSwitcher = document.getElementById('role-switcher');
    const roleBtns = document.querySelectorAll('.role-btn');
    const registerFields = document.getElementById('register-fields');
    const toggleAuthModeBtn = document.getElementById('toggle-auth-mode');
    const toggleText = document.getElementById('toggle-text');
    const submitText = document.getElementById('submit-text');
    const quickHint = document.getElementById('quick-hint');
    const emailLabel = document.getElementById('email-label');
    const emailInput = document.getElementById('email');
    const emailIcon = document.getElementById('email-icon');
    const nameInput = document.getElementById('name');
    const errorMsg = document.getElementById('error-message');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordIcon = document.getElementById('password-icon');

    // Role Switching
    roleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentRole = e.target.dataset.role;
            roleBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            if (currentRole === 'admin') {
                emailLabel.textContent = 'Admin ID';
                emailInput.placeholder = 'admin@rescue.com';
                emailIcon.setAttribute('data-lucide', 'shield');
            } else {
                emailLabel.textContent = 'Email Address';
                emailInput.placeholder = 'jane@example.com';
                emailIcon.setAttribute('data-lucide', 'mail');
            }
            lucide.createIcons();
        });
    });

    // Toggle Auth Mode
    toggleAuthModeBtn.addEventListener('click', () => {
        isRegistering = !isRegistering;
        errorMsg.style.display = 'none';

        if (isRegistering) {
            roleSwitcher.style.display = 'none';
            registerFields.style.display = 'block';
            nameInput.required = true;
            quickHint.style.display = 'none';
            toggleText.textContent = 'Already have an account?';
            toggleAuthModeBtn.textContent = 'Log In';
            submitText.textContent = 'Create Account';
        } else {
            roleSwitcher.style.display = 'flex';
            registerFields.style.display = 'none';
            nameInput.required = false;
            quickHint.style.display = 'block';
            toggleText.textContent = "Don't have an account?";
            toggleAuthModeBtn.textContent = 'Sign Up';
            submitText.textContent = 'Secure Sign In';
        }
    });

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        showPassword = !showPassword;
        if (showPassword) {
            passwordInput.type = 'text';
            passwordIcon.setAttribute('data-lucide', 'eye-off');
        } else {
            passwordInput.type = 'password';
            passwordIcon.setAttribute('data-lucide', 'eye');
        }
        lucide.createIcons();
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorMsg.style.display = 'none';
        
        const email = emailInput.value;
        const password = passwordInput.value;

        if (isRegistering) {
            const name = nameInput.value;
            if (name.trim() && email.trim() && password.trim()) {
                // Mock registration logic
                localStorage.setItem('currentUser', JSON.stringify({ name, email, role: 'user' }));
                window.location.href = 'user-dashboard.html';
            } else {
                errorMsg.textContent = 'Please fill all fields';
                errorMsg.style.display = 'block';
            }
        } else {
            // Mock Login Logic
            if (currentRole === 'admin' && email === 'admin@rescue.com' && password === 'admin123') {
                localStorage.setItem('currentUser', JSON.stringify({ email, role: 'admin' }));
                window.location.href = 'admin-dashboard.html';
            } else if (currentRole === 'user' && email && password) {
                localStorage.setItem('currentUser', JSON.stringify({ email, role: 'user' }));
                window.location.href = 'user-dashboard.html';
            } else {
                errorMsg.textContent = 'Invalid credentials';
                errorMsg.style.display = 'block';
            }
        }
    });
});
