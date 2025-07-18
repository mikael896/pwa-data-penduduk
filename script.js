// Register Service Worker
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