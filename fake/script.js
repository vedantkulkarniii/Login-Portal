
document.addEventListener('DOMContentLoaded', () => {
    // Shared functionality
    setupSecurity();

    // Page specific logic
    if (document.getElementById('resultForm')) {
        setupForm();
    } else if (document.getElementById('resultContainer')) {
        setupResultPage();
    }
});

function setupSecurity() {
    // Disable right click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Keyboard shortcuts removed for mobile optimization
}

// ------- Form Page Logic -------
let generatedCaptcha = '';

function setupForm() {
    generateCaptcha();

    document.querySelector('.refresh-btn').addEventListener('click', (e) => {
        e.preventDefault();
        generateCaptcha();
    });

    document.getElementById('resultForm').addEventListener('submit', handleLogin);
}

function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    generatedCaptcha = captcha;
    document.getElementById('captchaCode').textContent = captcha;
}

function handleLogin(e) {
    e.preventDefault();

    const userCaptcha = document.getElementById('userCaptcha').value.toUpperCase();
    const prn = document.getElementById('prnNumber').value;

    // Basic validation
    if (!prn) {
        alert("Please fill in all fields.");
        return;
    }

    if (userCaptcha !== generatedCaptcha) {
        alert("Invalid captcha. Please try again.");
        generateCaptcha();
        document.getElementById('userCaptcha').value = '';
        return;
    }

    // Success - Redirect
    window.location.href = 'result.html';
}

// ------- Result Page Logic -------
function setupResultPage() {
    // Show spinner initially (CSS default), wait 2 seconds, show meme
    setTimeout(() => {
        document.querySelector('.loading-container').style.display = 'none';
        const resultContainer = document.querySelector('.result-meme-container');
        resultContainer.style.display = 'flex';

        // Add a little entrance animation class for the meme
        resultContainer.classList.add('fade-in');
    }, 2000);
}
