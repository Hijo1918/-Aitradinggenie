// Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDAmnEmGH4X5S4Bjc5a_RHJW4JEzXsyaI",
  authDomain: "new-build-2f07b.firebaseapp.com",
  projectId: "new-build-2f07b",
  storageBucket: "new-build-2f07b.firebasestorage.app",
  messagingSenderId: "563726728973",
  appId: "1:563726728973:web:5a1da92dd326fc53b07a44",
  measurementId: "G-9YFHCLPLL6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const dashboard = document.getElementById('dashboard');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const dynamicBtn = document.getElementById('dynamic-btn');
const dynamicContent = document.getElementById('dynamic-content');
const userEmail = document.getElementById('user-email');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');

// Event Listeners
loginBtn.addEventListener('click', login);
signupBtn.addEventListener('click', signup);
logoutBtn.addEventListener('click', logout);
dynamicBtn.addEventListener('click', () => {
    dynamicContent.textContent = 'You clicked the dynamic button!';
});
showSignup.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});
showLogin.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Functions
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            userEmail.textContent = user.email;
            loginForm.style.display = 'none';
            dashboard.style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
        });
}

function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            userEmail.textContent = user.email;
            signupForm.style.display = 'none';
            dashboard.style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
        });
}

function logout() {
    auth.signOut()
        .then(() => {
            dashboard.style.display = 'none';
            loginForm.style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
        });
}

// Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        userEmail.textContent = user.email;
        loginForm.style.display = 'none';
        dashboard.style.display = 'block';
    } else {
        dashboard.style.display = 'none';
        loginForm.style.display = 'block';
    }
});
