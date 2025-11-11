// ======================================
// HELPER FUNCTIONS
// ======================================

/**
 * Formatta un valore numerico come valuta (EUR)
 * @param {number} value - Valore da formattare
 * @param {number} decimals - Numero di decimali da visualizzare
 * @returns {string} - Valore formattato come valuta
 */
function formatCurrency(value, decimals = 0) {
    if (isNaN(value)) return value;
    return new Intl.NumberFormat('it-IT', { 
        style: 'currency', 
        currency: 'EUR', 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
    }).format(value);
}

/**
 * Formatta un valore numerico con separatore di migliaia
 * @param {number} value - Valore da formattare
 * @param {number} decimals - Numero di decimali da visualizzare
 * @returns {string} - Valore formattato
 */
function formatNumber(value, decimals = 0) {
    if (isNaN(value)) return value;
    return new Intl.NumberFormat('it-IT', { 
        style: 'decimal', 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
    }).format(value);
}

/**
 * Formatta un valore numerico come percentuale
 * @param {number} value - Valore da formattare
 * @returns {string} - Valore formattato come percentuale
 */
function formatPercentage(value) {
    if (isNaN(value)) return value;
    return new Intl.NumberFormat('it-IT', { 
        style: 'decimal', 
        minimumFractionDigits: 1, 
        maximumFractionDigits: 1 
    }).format(value) + '%';
}

/**
 * Inizializza un grafico Chart.js
 * @param {string} canvasId - ID dell'elemento canvas
 * @param {string} type - Tipo di grafico (bar, line, ecc.)
 * @param {Object} data - Dati per il grafico
 * @param {Object} options - Opzioni di configurazione
 * @returns {Chart|null} - Istanza del grafico o null in caso di errore
 */
function initChart(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) { 
        console.error(`Canvas element with ID '${canvasId}' not found.`); 
        return null; 
    }
    
    const ctx = canvas.getContext('2d');
    
    // Distruggi il grafico esistente se presente
    const existingChart = Chart.getChart(canvasId);
    if (existingChart) { 
        try { 
            existingChart.destroy(); 
        } catch(e) { 
            console.warn(`Could not destroy previous chart instance for ${canvasId}: ${e}`);
        } 
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Verifica validità dei dati
    if (!data || !data.labels || !data.datasets) {
        ctx.fillStyle = '#dc3545'; 
        ctx.font = '14px "Titillium Web", sans-serif'; 
        ctx.textAlign = 'center';
        ctx.fillText('Errore: Dati non disponibili.', canvas.width / 2, canvas.height / 2);
        console.error(`Dati non validi forniti a initChart per ${canvasId}`);
        return null;
    }
    
    try {
        return new Chart(ctx, { type, data, options });
    } catch (error) {
        console.error(`Errore durante la creazione del grafico ${canvasId}:`, error);
        ctx.fillStyle = '#dc3545'; 
        ctx.font = '14px "Titillium Web", sans-serif'; 
        ctx.textAlign = 'center';
        const errorMessage = error.message && typeof error.message === 'string' 
            ? (error.message.length > 100 ? error.message.substring(0, 97) + '...' : error.message) 
            : 'Errore sconosciuto';
        ctx.fillText(`Errore grafico: ${errorMessage}`, canvas.width / 2, canvas.height / 2);
        return null;
    }
}

// ======================================
// CHART DATA (Bilancio Plus - VAROLI GUIDO E FIGLIO S.R.L.)
// ======================================

// Definizione colori consistenti per i grafici
const CHART_COLORS = {
    attuale: {
        fill: 'rgba(74, 105, 189, 0.7)',
        border: 'rgba(74, 105, 189, 1)'
    },
    ottimizzato: {
        fill: 'rgba(76, 175, 80, 0.7)',
        border: 'rgba(76, 175, 80, 1)'
    }
};

// Dati EBITDA
const ebitdaData = {
    labels: ['Attuale (2024)', 'Post Ottimizzazione'],
    datasets: [{
        label: 'EBITDA (€)', 
        data: [-43535, 145000],
        backgroundColor: [CHART_COLORS.attuale.fill, CHART_COLORS.ottimizzato.fill],
        borderColor: [CHART_COLORS.attuale.border, CHART_COLORS.ottimizzato.border], 
        borderWidth: 1
    }]
};

// Dati EBITDA Margin
const ebitdaMarginData = {
    labels: ['Attuale (2024)', 'Post Ottimizzazione'],
    datasets: [{
        label: 'EBITDA Margin (%)', 
        data: [-1.53, 5.0],
        backgroundColor: [CHART_COLORS.attuale.fill, CHART_COLORS.ottimizzato.fill],
        borderColor: [CHART_COLORS.attuale.border, CHART_COLORS.ottimizzato.border], 
        borderWidth: 1
    }]
};

// Dati PFN/EBITDA
const pfnEbitdaData = {
    labels: ['Attuale (2024)', 'Post Ottimizzazione'],
    datasets: [{
        label: 'PFN/EBITDA', 
        data: [null, 6.5],
        backgroundColor: [CHART_COLORS.attuale.fill, CHART_COLORS.ottimizzato.fill],
        borderColor: [CHART_COLORS.attuale.border, CHART_COLORS.ottimizzato.border], 
        borderWidth: 1
    }]
};

// Dati Leanus Score
const leanusScoreData = {
    labels: ['Attuale (2024)', 'Post Ottimizzazione'],
    datasets: [{
        label: 'Leanus Score', 
        data: [3.47, 4.75],
        backgroundColor: [CHART_COLORS.attuale.fill, CHART_COLORS.ottimizzato.fill],
        borderColor: [CHART_COLORS.attuale.border, CHART_COLORS.ottimizzato.border], 
        borderWidth: 1
    }]
};

// ======================================
// CHART OPTIONS
// ======================================

/**
 * Funzione di callback per le etichette dei tooltip
 * @param {Object} context - Contesto del tooltip
 * @returns {string} - Etichetta formattata
 */
function tooltipLabelCallback(context) {
    let label = context.dataset.label || ''; 
    if (label) label += ': '; 
    
    const value = context.parsed.y;
    if (value === null) return label + 'N/A';
    
    if (context.dataset.label.includes('(gg)')) { 
        return label + formatNumber(value, 0) + ' gg'; 
    } else if (context.dataset.label.includes('(%)')) { 
        return label + formatPercentage(value); 
    } else if (context.dataset.label.includes('Score') || context.dataset.label.includes('PFN/EBITDA')) { 
        return label + formatNumber(value, 2); 
    } else { 
        return label + formatCurrency(value, 0); 
    }
}

// Opzioni di base per i grafici a barre
const barChartOptions = {
    responsive: true, 
    maintainAspectRatio: false, 
    indexAxis: 'x',
    scales: { 
        y: { 
            beginAtZero: true, 
            ticks: {} 
        }, 
        x: { 
            grid: { display: false }
        } 
    },
    plugins: { 
        legend: { display: false }, 
        title: { display: false },
        tooltip: {
            callbacks: {
                label: tooltipLabelCallback
            }
        }
    },
    animation: { duration: 400 }
};

// Opzioni specifiche per ogni grafico
const ebitdaOptions = { 
    ...barChartOptions, 
    scales: { 
        ...barChartOptions.scales, 
        y: { 
            ...barChartOptions.scales.y, 
            ticks: { 
                callback: value => formatCurrency(value, 0)
            } 
        } 
    } 
};

const ebitdaMarginOptions = { 
    ...barChartOptions, 
    scales: { 
        ...barChartOptions.scales, 
        y: { 
            ...barChartOptions.scales.y, 
            suggestedMin: -2, 
            suggestedMax: 6, 
            ticks: { 
                callback: value => formatPercentage(value)
            } 
        } 
    } 
};

const pfnEbitdaOptions = { 
    ...barChartOptions, 
    scales: { 
        ...barChartOptions.scales, 
        y: { 
            ...barChartOptions.scales.y, 
            suggestedMin: 0, 
            suggestedMax: 8, 
            ticks: { 
                callback: value => formatNumber(value, 2)
            } 
        } 
    } 
};

const leanusScoreOptions = { 
    ...barChartOptions, 
    scales: { 
        ...barChartOptions.scales, 
        y: { 
            ...barChartOptions.scales.y, 
            suggestedMin: 0, 
            suggestedMax: 10, 
            ticks: { 
                callback: value => formatNumber(value, 1)
            } 
        } 
    } 
};

// ======================================
// CHART INITIALIZATION & OTHER SCRIPTS
// ======================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing scripts for Bilancio Plus VAROLI GUIDO E FIGLIO S.R.L. (Embedded)...");
    
    // Definizione dei grafici da inizializzare
    const charts = [
        { id: 'ebitdaChart', type: 'bar', data: ebitdaData, options: ebitdaOptions },
        { id: 'ebitdaMarginChart', type: 'bar', data: ebitdaMarginData, options: ebitdaMarginOptions },
        { id: 'pfnEbitdaChart', type: 'bar', data: pfnEbitdaData, options: pfnEbitdaOptions },
        { id: 'leanusScoreChart', type: 'bar', data: leanusScoreData, options: leanusScoreOptions }
    ];
    
    // Inizializzazione dei grafici
    charts.forEach(chart => {
        try { 
            initChart(chart.id, chart.type, chart.data, chart.options); 
        } catch(e) { 
            console.error(`Errore init ${chart.id}:`, e); 
        }
    });

    // Aggiornamento anno corrente nei footer e sidebar
    const currentYear = new Date().getFullYear();
    ['currentYearSidebar', 'currentYearFooter'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = currentYear;
    });

    // Configurazione badge IRP
    updateIRPBadge(54.12); // VAROLI GUIDO E FIGLIO S.R.L. IRP

    // Definizione funzioni di fallback
    defineBackupFunctions();
    
    console.log("All scripts initialization complete (Embedded).");
});

/**
 * Aggiorna il badge IRP con il valore e il colore appropriato
 * @param {number} irpScoreValue - Valore IRP
 */
function updateIRPBadge(irpScoreValue) {
    const irpHeaderBadge = document.getElementById('irp-header-badge');
    if (!irpHeaderBadge) return;
    
    let badgeClass = 'bg-danger';
    if (irpScoreValue >= 60) {
        badgeClass = 'bg-success';
    } else if (irpScoreValue >= 40) {
        badgeClass = 'bg-warning text-dark';
    }
    
    irpHeaderBadge.className = `badge ${badgeClass} me-3`;
    irpHeaderBadge.textContent = `IRP: ${irpScoreValue.toFixed(1)}`;
}

/**
 * Definisce funzioni di fallback per funzionalità potenzialmente mancanti
 */
function defineBackupFunctions() {
    if (typeof window.logout !== 'function') { 
        window.logout = function() { 
            console.log("Logout placeholder"); 
        };
    }
    
    if (typeof window.printDocument !== 'function') { 
        window.printDocument = function() { 
            window.print(); 
        };
    }
}