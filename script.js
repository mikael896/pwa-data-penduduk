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
    installButton.style.display = 'block';
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