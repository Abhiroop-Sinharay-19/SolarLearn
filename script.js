document.addEventListener("DOMContentLoaded", function() {

    /* ---------- 1. SHARED UTILITIES (Cookies) ---------- */
    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 86400000).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    };

    const getCookie = (name) => {
        const cookieName = `${name}=`;
        const parts = document.cookie.split(";");
        for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed.startsWith(cookieName)) {
                return decodeURIComponent(trimmed.substring(cookieName.length));
            }
        }
        return "";
    };

    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    /* ---------- 2. COOKIE CONSENT BANNER LOGIC ---------- */
    const cookieBanner = document.getElementById("cookieConsentBanner");
    const acceptBtn = document.getElementById("cookieAcceptBtn");
    const declineBtn = document.getElementById("cookieDeclineBtn");
    const isLandingPage = window.location.pathname.toLowerCase().includes("index.html") || window.location.pathname.endsWith("/");

    if (cookieBanner && acceptBtn && declineBtn && isLandingPage) {
        // Always show on landing page.
        cookieBanner.style.display = "block";

        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("solar_cookie_consent", "accepted");
            cookieBanner.style.display = "none";

            const pendingName = localStorage.getItem("temp_explorer_name");
            if (pendingName) {
                setCookie("explorer_name", pendingName, 7);
            }
        });

        declineBtn.addEventListener("click", () => {
            localStorage.setItem("solar_cookie_consent", "declined");
            cookieBanner.style.display = "none";
            deleteCookie("explorer_name");
        });
    }

    /* ---------- 3. REGISTRATION WITH PASS REGEX ---------- */
    const regForm = document.getElementById("registerForm");
    const alertBox = document.getElementById("formAlert");

    if (regForm && alertBox) {
        regForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const firstName = document.getElementById("firstName").value.trim();
            const email = document.getElementById("email").value.trim();
            const pass = document.getElementById("password").value;
            const cpass = document.getElementById("confirmPassword").value;

            // Password Regex: 1 Cap, 1 Number, 1 Special Char, Min 8 Length
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

            const showMsg = (msg, isError) => {
                alertBox.className = isError ? "form-alert error" : "form-alert success";
                alertBox.style.display = "block";
                alertBox.innerText = msg;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            if (pass !== cpass) {
                showMsg("Passwords do not match.", true);
                return;
            }

            if (!passwordRegex.test(pass)) {
                showMsg("Password too weak! Must have 8+ chars, 1 uppercase, 1 number, and 1 special symbol.", true);
                return;
            }

            // Save name to localStorage temporarily
            localStorage.setItem("temp_explorer_name", firstName);
            
            // If they already accepted cookies previously, set the cookie now
            if (localStorage.getItem("solar_cookie_consent") === "accepted") {
                setCookie("explorer_name", firstName, 7);
            }

            showMsg("Registration Successful! Redirecting to Home...", false);
            setTimeout(() => { window.location.href = "home.html"; }, 1500);
        });
    }

    /* ---------- 4. HOME PAGE GREETING ---------- */
    const welcomeHeader = document.querySelector(".main-content h1");
    if (welcomeHeader && window.location.pathname.includes("home.html")) {
        const savedName = getCookie("explorer_name");
        if (savedName) {
            welcomeHeader.innerText = `Welcome, ${savedName}!`;
        }
    }

    /* ---------- 5. FEEDBACK LOGIC ---------- */
    const feedbackForm = document.querySelector(".glass-panel form");
    if (feedbackForm && window.location.pathname.includes("feedback.html")) {
        feedbackForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const user = getCookie("explorer_name") || "Explorer";
            alert(`Thank you for the feedback, ${user}!`);
            feedbackForm.reset();
        });
    }

    /* ---------- 6. LOGOUT ---------- */
    const logoutBtn = document.querySelector('a[href="index.html"]');
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            deleteCookie("explorer_name");
            localStorage.removeItem("temp_explorer_name");
        });
    }

    /* ---------- 7. EXISTING QUIZ LOGIC ---------- */
    const quizForm = document.getElementById("quizForm");
    if (quizForm) {
        quizForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const resultDiv = document.getElementById("quizResult");
            resultDiv.style.display = "block";
            resultDiv.innerHTML = "Quiz Submitted! Great job, Explorer.";
        });
    }
});