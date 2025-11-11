/**
 * SCAN - Strategic Corporate Analysis Navigator
 * Funzioni comuni JS
 * Versione 1.3 - Login Attivo
 */

/**
 * Funzione per gestire il login
 * @param {Event} event - Evento submit del form
 */
function handleLogin(event) {
    if (event) event.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!usernameInput || !passwordInput) {
        console.error("Elementi username o password non trovati nel form.");
        alert('Errore nel form di login.');
        return false;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validazione credenziali - Aggiornate per Calcidrata
    if (username === 'Admin' && password === 'Admin2025') {
        console.log('Login successful per', username);
        try {
            localStorage.setItem('scanUserLoggedIn', 'true');
            localStorage.setItem('scanUsername', username);
            localStorage.setItem('scanLoginTime', new Date().toISOString());
            
            // Reindirizza alla dashboard principale
            window.location.href = 'index.html';
        } catch (e) {
            console.error("Errore durante il salvataggio in localStorage:", e);
            alert("Impossibile salvare lo stato del login. Verifica le impostazioni del browser.");
        }
    } else {
        alert('Credenziali non valide. Riprova.');
        // Pulisci localStorage in caso di login fallito
        try {
            localStorage.removeItem('scanUserLoggedIn');
            localStorage.removeItem('scanUsername');
            localStorage.removeItem('scanLoginTime');
        } catch (e) {
            console.error("Errore durante la rimozione da localStorage:", e);
        }
    }
    return false;
}

/**
 * Funzione per gestire il logout
 */
function logout() {
    console.log("Logout in corso...");
    try {
        // Rimuovi stato login
        localStorage.removeItem('scanUserLoggedIn');
        localStorage.removeItem('scanUsername');
        localStorage.removeItem('scanLoginTime');
        
        // Reindirizza alla pagina di login
        window.location.href = 'login-page.html';
    } catch (e) {
        console.error("Errore durante il logout:", e);
        // Reindirizza comunque
        window.location.href = 'login-page.html';
    }
}

/**
 * Funzione per verificare se l'utente è loggato
 * Con timeout di sessione opzionale
 */
function checkLoginStatus() {
    let loggedIn = false;
    let loginTime = null;
    
    try {
        loggedIn = localStorage.getItem('scanUserLoggedIn') === 'true';
        loginTime = localStorage.getItem('scanLoginTime');
    } catch (e) {
        console.error("Impossibile accedere a localStorage:", e);
        loggedIn = false;
    }

    // Verifica timeout sessione (opzionale - 24 ore)
    if (loggedIn && loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
        
        if (hoursSinceLogin > 24) {
            console.warn("Sessione scaduta dopo 24 ore");
            logout();
            return;
        }
    }

    // Se non siamo sulla pagina di login E l'utente NON è loggato, reindirizza
    const isLoginPage = window.location.pathname.endsWith('login-page.html') || 
                       window.location.pathname.endsWith('login-page.html/');
    
    if (!isLoginPage && !loggedIn) {
        console.warn("Utente non loggato. Reindirizzamento al login.");
        window.location.href = 'login-page.html';
    } else if (loggedIn && isLoginPage) {
        // Se l'utente è già loggato e prova ad accedere alla pagina di login, reindirizza alla dashboard
        window.location.href = 'index.html';
    } else if (loggedIn) {
        console.log(`Utente loggato: ${localStorage.getItem('scanUsername')}`);
    }
}

/**
 * Funzione per la stampa ottimizzata della pagina corrente
 */
function printDocument() {
    console.log("Avvio stampa...");
    window.print();
}

/**
 * Formatta un numero come valore monetario (Euro, IT)
 * @param {number|string|null|undefined} value - Valore numerico o convertibile
 * @param {number} [digits=0] - Numero di cifre decimali
 * @returns {string} - Stringa formattata (es. "€ 1.234.567") o "N/D"
 */
function formatCurrency(value, digits = 0) {
    const num = parseFloat(value);
    if (value === null || value === undefined || isNaN(num)) {
        return "N/D";
    }
    // Controllo per valori molto piccoli
    if (Math.abs(num) < (1 / Math.pow(10, digits + 1))) {
        value = 0;
    }
    try {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(num);
    } catch (e) {
        console.error("Errore formattazione valuta:", value, e);
        return "Err";
    }
}

/**
 * Formatta un numero come percentuale (IT)
 * @param {number|string|null|undefined} value - Valore numerico (es. 8.8 per 8,8%)
 * @param {number} [digits=1] - Numero di cifre decimali
 * @returns {string} - Stringa formattata (es. "8,8%") o "N/D"
 */
function formatPercentage(value, digits = 1) {
    const num = parseFloat(value);
    if (value === null || value === undefined || isNaN(num)) {
        return "N/D";
    }
    try {
        return new Intl.NumberFormat('it-IT', {
            style: 'percent',
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(num / 100);
    } catch(e) {
        console.error("Errore formattazione percentuale:", value, e);
        return "Err";
    }
}

/**
 * Recupera i dati per un grafico cercando una funzione globale
 * @param {string} functionName - Nome della funzione globale
 * @returns {object|null} - Oggetto dati o null
 */
function getChartData(functionName) {
    try {
        if (typeof window[functionName] === 'function') {
            const data = window[functionName]();
            if (data && typeof data === 'object' && Array.isArray(data.labels) && Array.isArray(data.datasets)) {
                return data;
            } else {
                console.error(`La funzione ${functionName} non ha restituito dati validi per Chart.js.`);
                return null;
            }
        } else {
            console.warn(`Funzione dati globale non trovata: ${functionName}`);
            return null;
        }
    } catch (error) {
        console.error(`Errore durante l'esecuzione della funzione dati ${functionName}:`, error);
        return null;
    }
}

/**
 * Inizializza un grafico Chart.js
 * @param {string} canvasId - ID dell'elemento canvas
 * @param {string} chartType - Tipo di grafico
 * @param {object} chartData - Dati del grafico
 * @param {object} chartOptions - Opzioni del grafico
 */
function initChart(canvasId, chartType, chartData, chartOptions) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`Impossibile ottenere il contesto 2D per il canvas: ${canvasId}`);
        return;
    }

    if (!chartData || typeof chartData !== 'object' || !Array.isArray(chartData.labels) || !Array.isArray(chartData.datasets)) {
        console.error(`Dati non validi o mancanti forniti a initChart per: ${canvasId}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px Titillium Web, sans-serif';
        ctx.fillStyle = '#dc3545';
        ctx.textAlign = 'center';
        ctx.fillText('Errore: Dati grafico non validi.', canvas.width / 2, canvas.height / 2);
        return;
    }

    try {
        // Distruggi grafico esistente se presente
        const existingChart = Chart.getChart(canvasId);
        if (existingChart instanceof Chart) {
            existingChart.destroy();
        }
        // Crea il nuovo grafico
        new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: chartOptions
        });
    } catch (error) {
        console.error(`Errore durante l'inizializzazione del grafico ${canvasId}:`, error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px Titillium Web, sans-serif';
        ctx.fillStyle = '#dc3545';
        ctx.textAlign = 'center';
        ctx.fillText('Errore inizializzazione grafico.', canvas.width / 2, canvas.height / 2);
    }
}

/**
 * Ottieni il nome utente corrente
 * @returns {string|null} - Nome utente o null se non loggato
 */
function getCurrentUsername() {
    try {
        return localStorage.getItem('scanUsername') || null;
    } catch (e) {
        console.error("Errore recupero username:", e);
        return null;
    }
}

/**
 * Inizializzazione all'avvio di ogni pagina
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("SCAN Common JS - Inizializzazione");
    
    // Verifica sempre lo stato del login
    //checkLoginStatus();

    // Aggiungi listener al pulsante di stampa generico, se esiste
    const printBtn = document.querySelector('.print-button button');
    if (printBtn) {
        printBtn.addEventListener('click', printDocument);
    }

    // Aggiungi listener al pulsante di logout, se esiste
    const logoutBtn = document.querySelector('.logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Mostra il nome utente se loggato
    const username = getCurrentUsername();
    if (username) {
        const userDisplay = document.querySelector('.user-display');
        if (userDisplay) {
            userDisplay.textContent = `Benvenuto, ${username}`;
        }
    }
});