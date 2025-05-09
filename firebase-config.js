// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js ";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js ";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy007GnrHc3YTTL5g4lSM2CnXHgjPT7AM",
  authDomain: "school-portal-2025.firebaseapp.com",
  projectId: "school-portal-2025",
  storageBucket: "school-portal-2025.firebasestorage.app",
  messagingSenderId: "1018824291975",
  appId: "1:1018824291975:web:91c7b437f9224aa54b6a22",
  measurementId: "G-3EQMJ9J827"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Show specific page
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

// Sign in with Google
function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      showHomePage();
    })
    .catch((error) => {
      alert("فشل تسجيل الدخول باستخدام جوجل: " + error.message);
    });
}

// Logout
function logout() {
  signOut(auth).then(() => {
    localStorage.removeItem('user');
    showLoginPage();
  }).catch((error) => {
    alert("خطأ في تسجيل الخروج: " + error.message);
  });
}

// Navigation functions
function showHomePage() {
  showPage('home-page');
  document.getElementById('user-name').innerText = JSON.parse(localStorage.getItem('user'))?.displayName || 'مستخدم';
}

function showLoginPage() {
  showPage('login-page');
}

// On load check if user is signed in
window.onload = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    showHomePage();
    document.getElementById('user-name').innerText = user.displayName || 'مستخدم';
  } else {
    showLoginPage();
  }
};