// ======================================
// HELPER FUNCTIONS
// ======================================
/**
 * Formatta un valore numerico come valuta in formato italiano
 * @param {number} value - Valore da formattare
 * @param {number} decimals - Numero di decimali da visualizzare
 * @return {string} Valore formattato come valuta
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
 * Formatta un valore numerico in formato italiano
 * @param {number} value - Valore da formattare
 * @param {number} decimals - Numero di decimali da visualizzare
 * @return {string} Valore formattato
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
 * Formatta un valore numerico come percentuale in formato italiano
 * @param {number} value - Valore da formattare
 * @return {string} Valore formattato come percentuale
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
 * @param {string} type - Tipo di grafico
 * @param {Object} data - Dati del grafico
 * @param {Object} options - Opzioni del grafico
 * @return {Chart|null} Istanza del grafico o null in caso di errore
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

/**
 * Crea un tooltip formatter per i grafici
 * @param {Object} context - Contesto del tooltip
 * @return {string} Label formattata
 */
function formatTooltipLabel(context) {
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

// ======================================
// CHART DATA (Bilancio Plus - VAROLI GUIDO E FIGLIO S.R.L.)
// ======================================
// Colori Consistenti
const CHART_COLORS = {
    attuale: {
        background: 'rgba(74, 105, 189, 0.7)',
        border: 'rgba(74, 105, 189, 1)'
    },
    ottimizzato: {
        background: 'rgba(76, 175, 80, 0.7)',
        border: 'rgba(76, 175, 80, 1)'
    }
};

// Dati per i grafici
const CHART_DATA = {
    ebitda: {
        labels: ['Attuale (2024)', 'Post Ottimizzazione'],
        datasets: [{
            label: 'EBITDA (€)', 
            data: [-43535, 175000],
            backgroundColor: [CHART_COLORS.attuale.background, CHART_COLORS.ottimizzato.background],
            borderColor: [CHART_COLORS.attuale.border, CHART_COLORS.ottimizzato.border], 
            borderWidth: 1
        }]
    },
    ebitdaMargin: {
        labels: ['Attuale (2024)', 'Post Ottimizzazione'],
        datasets: [{
            label: 'EBITDA Margin (%)', 
            data: [-1.53, 6.15],
            backgroundColor: [CHART_COLORS.attuale.background, CHART_COLORS.ottimizzato.background],
            borderColor: [CHART_COLORS.attuale.border, CHART_COLORS.ottimizzato.border], 
            borderWidth: 1
        }]
    },
    pfnEbitda: {
        labels: ['Attuale (2024)', 'Post Ottimizzazione'],
        datasets: [{
            label: 'PFN/EBITDA', 
            data: [null, 3.25],
            backgroundColor: [CHART_COLORS.attuale.background, CHART_COLORS.ottimizzato.background],
            borderColor: [CHART_COLORS.attuale.border, CHART_COLORS.ottimizzato.border], 
            borderWidth: 1
        }]
    },
    leanusScore: {
        labels: ['Attuale (2024)', 'Post Ottimizzazione'],
        datasets: [{
            label: 'Leanus Score', 
            data: [3.47, 5.50],
            backgroundColor: [CHART_COLORS.attuale.background, CHART_COLORS.ottimizzato.background],
            borderColor: [CHART_COLORS.attuale.border, CHART_COLORS.ottimizzato.border], 
            borderWidth: 1
        }]
    }
};

// ======================================
// CHART OPTIONS
// ======================================
// Opzioni base per tutti i grafici a barre
const baseBarChartOptions = {
    responsive: true, 
    maintainAspectRatio: false, 
    indexAxis: 'x',
    scales: { 
        y: { 
            beginAtZero: true, 
            ticks: {} 
        }, 
        x: { 
            grid: { 
                display: false 
            }
        } 
    },
    plugins: { 
        legend: { 
            display: false 
        }, 
        title: { 
            display: false 
        },
        tooltip: {
            callbacks: {
                label: formatTooltipLabel
            }
        }
    },
    animation: { 
        duration: 400 
    }
};

// Funzione per creare opzioni specifiche per ogni tipo di grafico
function createChartOptions(type, customOptions = {}) {
    const options = { ...baseBarChartOptions };
    
    // Merge delle scale personalizzate
    if (customOptions.scales) {
        options.scales = {
            ...options.scales,
            ...customOptions.scales
        };
        
        // Merge delle proprietà y se presenti
        if (customOptions.scales.y) {
            options.scales.y = {
                ...options.scales.y,
                ...customOptions.scales.y
            };
        }
    }
    
    return options;
}

// Opzioni specifiche per ogni grafico
const CHART_OPTIONS = {
    ebitda: createChartOptions('ebitda', {
        scales: {
            y: {
                ticks: {
                    callback: v => formatCurrency(v, 0)
                }
            }
        }
    }),
    
    ebitdaMargin: createChartOptions('ebitdaMargin', {
        scales: {
            y: {
                suggestedMin: -2,
                suggestedMax: 7,
                ticks: {
                    callback: v => formatPercentage(v)
                }
            }
        }
    }),
    
    pfnEbitda: createChartOptions('pfnEbitda', {
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 4,
                ticks: {
                    callback: v => formatNumber(v, 2)
                }
            }
        }
    }),
    
    leanusScore: createChartOptions('leanusScore', {
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 6,
                ticks: {
                    callback: v => formatNumber(v, 1)
                }
            }
        }
    })
};

// ======================================
// CHART INITIALIZATION & OTHER SCRIPTS
// ======================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing scripts for Bilancio Plus VAROLI GUIDO E FIGLIO S.R.L. (Embedded)...");
    
    // Configurazione dei grafici da inizializzare
    const chartsConfig = [
        { id: 'ebitdaChart', type: 'bar', data: CHART_DATA.ebitda, options: CHART_OPTIONS.ebitda },
        { id: 'ebitdaMarginChart', type: 'bar', data: CHART_DATA.ebitdaMargin, options: CHART_OPTIONS.ebitdaMargin },
        { id: 'pfnEbitdaChart', type: 'bar', data: CHART_DATA.pfnEbitda, options: CHART_OPTIONS.pfnEbitda },
        { id: 'leanusScoreChart', type: 'bar', data: CHART_DATA.leanusScore, options: CHART_OPTIONS.leanusScore }
    ];
    
    // Inizializza tutti i grafici con gestione errori
    chartsConfig.forEach(chart => {
        try { 
            initChart(chart.id, chart.type, chart.data, chart.options); 
        } catch(e) { 
            console.error(`Errore init ${chart.id}:`, e); 
        }
    });

    // Aggiorna l'anno corrente negli elementi della pagina
    updateYearElements();
    
    // Gestione badge IRP
    updateIRPBadge();

    // Definisci funzioni globali se non esistono
    defineGlobalFunctions();
    
    console.log("All scripts initialization complete (Embedded).");
});

/**
 * Aggiorna gli elementi dell'anno corrente nella pagina
 */
function updateYearElements() {
    const currentYear = new Date().getFullYear();
    const yearElements = ['currentYearSidebar', 'currentYearFooter'];
    
    yearElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) element.textContent = currentYear;
    });
}

/**
 * Aggiorna il badge IRP nell'header
 */
function updateIRPBadge() {
    const irpScoreValue = 51.42; // VAROLI GUIDO E FIGLIO S.R.L. IRP
    const irpHeaderBadge = document.getElementById('irp-header-badge');
    
    if (irpHeaderBadge) {
        let badgeClass = 'bg-danger';
        
        if (irpScoreValue >= 60) {
            badgeClass = 'bg-success';
        } else if (irpScoreValue >= 40) {
            badgeClass = 'bg-warning text-dark';
        }
        
        irpHeaderBadge.className = `badge ${badgeClass} me-3`;
        irpHeaderBadge.textContent = `IRP: ${irpScoreValue.toFixed(1)}`;
    }
}

/**
 * Definisce le funzioni globali necessarie se non esistono
 */
function defineGlobalFunctions() {
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