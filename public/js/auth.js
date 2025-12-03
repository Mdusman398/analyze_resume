

// Base URL for API calls
const BASE_URL = '/api/auth';

/**
 * Handles register, login, and logout requests.
 * @param {string} endpoint - 'register', 'login' or 'logout'
 * @param {object} data - Form data
 */
async function sendAuthRequest(endpoint, data) {
    const url = `${BASE_URL}/${endpoint}`; 
    const messageElement = document.getElementById('message');
    
    if (messageElement) {
        messageElement.textContent = '';
        messageElement.style.color = 'black';
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include' 
        });

        const contentType = response.headers.get("content-type");
        const result = (contentType && contentType.includes("application/json")) 
                         ? await response.json() 
                         : {}; 

        if (response.ok) {
            // SUCCESS
            if (endpoint === 'register') {
                alert('Registration successful! You can now log in.'); 
                window.location.href = 'login.html'; 
                
            } else if (endpoint === 'login') {
                if (result.name && result._id) {
                    localStorage.setItem('userName', result.name);
                    localStorage.setItem('userId', result._id); 
                }
                
                alert(`Welcome back, ${result.name}!`);
                //  FIX 1: Redirect to resume_analysis.html
                window.location.href = 'resume_analysis.html'; 
                
            } else if (endpoint === 'logout') {
                localStorage.removeItem('userName');
                localStorage.removeItem('userId');
                alert('You have been logged out successfully.');
                window.location.href = 'index.html'; 
            }
            
        } else {
            // ERROR 
            if (messageElement) {
                messageElement.textContent = result.message || `An error occurred during ${endpoint}.`;
                messageElement.style.color = 'red';
            }
        }
    } catch (error) {
        // Network or Parsing Error
        console.error('Network or parsing error:', error);
        if (messageElement) {
            messageElement.textContent = 'Network error. Could not connect to the server.';
            messageElement.style.color = 'red';
        }
    }
}

// ------------------- Log Out Function -------------------
function logoutUser() {
    sendAuthRequest('logout', {}); 
}

// Form Handling remains the same ...

// Sign Up Form (index.html)
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        sendAuthRequest('register', { name, email, password });
    });
}

// Login Form (login.html)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        sendAuthRequest('login', { email, password });
    });
}

// Log Out Button 
const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
}


// ------------------- Auth Status Check (Secure Pages) -------------------
function checkAuthStatus() {
    const userId = localStorage.getItem('userId'); 
    const path = window.location.pathname;

    // Auth pages (index.html=Signup, login.html=Login)
    const isAuthPage = path.includes('index.html') || path.includes('login.html');
    
    //  FIX 2: Only check for resume_analysis.html
    const isProtectedPage = path.includes('resume_analysis.html');


    if (userId) { 
        // If logged in and on an Auth page, redirect to the main protected page
        if (isAuthPage) {
            window.location.href = 'resume_analysis.html'; 
        }
    } else {
        // If logged out and trying to access a protected page
        if (isProtectedPage) {
            alert('Login is required to access this page.');
            window.location.href = 'login.html'; 
        }
    }
}


document.addEventListener('DOMContentLoaded', checkAuthStatus);