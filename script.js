// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmFplJjCa0Ry6JEUoqyzBGfxKTMp55z8s",
  authDomain: "pendudukapp-8d297.firebaseapp.com",
  projectId: "pendudukapp-8d297",
  storageBucket: "pendudukapp-8d297.firebasestorage.app",
  messagingSenderId: "521712480220",
// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Untuk Autentikasi
const db = firebase.firestore(); // Untuk Firestore Database

console.log("Firebase initialized:", app);
console.log("Firebase Auth:", auth);
console.log("Firestore DB:", db);  appId: "1:521712480220:web:d7aa47c6117d483f926919"
};// Register Service Worker
// References to UI elements (pastikan ID ini cocok dengan di index.html)
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const dashboardSection = document.getElementById('dashboard-section');

const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');

const registerForm = document.getElementById('register-form');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');

const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const logoutButton = document.getElementById('logout-button');

// --- Fungsi Tampilan ---
// Fungsi ini menyembunyikan semua section dan menampilkan yang diinginkan
function showSection(sectionId) {
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
    dashboardSection.style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

// --- Event Listeners untuk Transisi Form ---
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah link dari reload halaman
    showSection('register-section'); // Tampilkan bagian daftar
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah link dari reload halaman
    showSection('login-section'); // Tampilkan bagian login
});

// --- Autentikasi Firebase ---

// 1. Pendaftaran Pengguna Baru
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah form dari reload halaman
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert('Pendaftaran berhasil! Silakan login.');
        showSection('login-section'); // Kembali ke halaman login
        registerForm.reset(); // Kosongkan form register
    } catch (error) {
        console.error('Error pendaftaran:', error.message);
        alert('Error pendaftaran: ' + error.message);
    }
});

// 2. Login Pengguna
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah form dari reload halaman
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        // Pengguna berhasil login, tampilkan dashboard
        alert('Login berhasil!');
        showSection('dashboard-section');
        loginForm.reset(); // Kosongkan form login
    } catch (error) {
        console.error('Error login:', error.message);
        alert('Error login: ' + error.message);
    }
});

// 3. Logout Pengguna
logoutButton.addEventListener('click', async () => {
    try {
        await auth.signOut();
        alert('Anda telah logout.');
        showSection('login-section'); // Kembali ke halaman login
    } catch (error) {
        console.error('Error logout:', error.message);
        alert('Error logout: ' + error.message);
    }
});

// 4. Memantau Status Autentikasi (Penting untuk mempertahankan sesi)
// Ini akan berjalan setiap kali status login pengguna berubah
auth.onAuthStateChanged((user) => {
    if (user) {
        // Pengguna sedang login
        console.log('User is logged in:', user.email);
        showSection('dashboard-section'); // Tampilkan dashboard
    } else {
        // Pengguna tidak login atau logout
        console.log('User is logged out.');
        showSection('login-section'); // Tampilkan halaman login
    }
    // Catatan: Logika tombol instal PWA (installButton) bisa tetap di luar onAuthStateChanged
    // atau dihapus jika Anda hanya ingin fokus pada login/register
});

// --- Sisa kode Service Worker dan Install PWA Anda (biarkan di bawah, atau sesuaikan) ---
// Hapus atau komentari baris yang menampilkan tombol instal otomatis
// (Misalnya: installButton.style.display = 'block'; )
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
    // Mencegah Mini-Infobar standar muncul
    e.preventDefault();
    // Simpan event sehingga bisa dipicu nanti
    deferredPrompt = e;
    // Tampilkan tombol instal kustom

});

installButton.addEventListener('click', () => {
    // Sembunyikan tombol instal
    installButton.style.display = 'none';
    // Tampilkan prompt instal
    if (deferredPrompt) {
        deferredPrompt.prompt();
        // Tangani respons pengguna terhadap prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Pengguna menerima instalasi PWA');
            } else {
                console.log('Pengguna menolak instalasi PWA');
            }
            deferredPrompt = null;
        });
    }
});