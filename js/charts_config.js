/**
 * SCAN - Strategic Corporate Analysis Navigator
 * Configurazione Dati e Opzioni per Grafici Chart.js
 * Versione 1.2 - Dati Aggiornati per VAROLI GUIDO E FIGLIO S.R.L.
 */

// ======================================
// FUNZIONI PER RECUPERARE I DATI SPECIFICI
// ======================================

// --- Dati per Dashboard Esecutiva (dashboard.html) ---
function getTrendRicaviEbitdaData_Dashboard() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            {
                label: "Ricavi (€)",
                data: [3722214, 3324256, 2849913], // Valori assoluti
                borderColor: 'rgb(25, 25, 112)',
                backgroundColor: 'rgba(25, 25, 112, 0.1)',
                type: 'line', 
                tension: 0.1, 
                yAxisID: 'y', 
                fill: true, 
                pointRadius: 3,
            },
            {
                label: "EBITDA (€)",
                data: [196510, 213142, -43535], // Valori assoluti
                borderColor: 'rgb(77, 140, 87)',
                backgroundColor: 'rgba(77, 140, 87, 0.7)',
                type: 'bar', 
                yAxisID: 'y', 
                barPercentage: 0.6, 
                categoryPercentage: 0.7
            },
            {
                label: "EBITDA Margin (%)",
                data: [5.3, 6.4, -1.53], // Percentuale
                borderColor: 'rgb(217, 140, 0)',
                backgroundColor: 'transparent',
                type: 'line', 
                tension: 0.1, 
                yAxisID: 'y1', 
                fill: false, 
                borderDash: [5, 5], 
                pointRadius: 3
            }
        ]
    };
}

function getTrendPfnEbitdaData_Dashboard() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            {
                label: "PFN/EBITDA",
                data: [2.10, 1.58, null], // Valori del rapporto (EBITDA negativo nel 2024)
                borderColor: 'rgb(77, 140, 87)',
                backgroundColor: 'rgba(77, 140, 87, 0.2)',
                tension: 0.1, 
                fill: true, 
                pointRadius: 5, 
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(77, 140, 87)'
            },
            {
                label: 'Soglia Attenzione (<3x)',
                data: [3, 3, 3], // Linea target
                borderColor: 'rgb(255, 193, 7)',
                borderDash: [5, 5], 
                fill: false, 
                pointRadius: 0, 
                borderWidth: 2,
            }
        ]
    };
}

// --- Dati per Report Dettagliati (report/parteX_*.html) ---

// Dati Parte 1
function getMainMetricsData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { label: "Ricavi (€000)", data: [3722, 3324, 2850], backgroundColor: "rgba(25, 25, 112, 0.7)" }, // Dati in migliaia
            { label: "EBITDA (€000)", data: [197, 213, -44], backgroundColor: "rgba(77, 140, 87, 0.7)" },
            { label: "Patrimonio Netto (€000)", data: [554, 649, 480], backgroundColor: "rgba(217, 140, 0, 0.7)" }
        ]
    };
}

function getCurrentAssetsLiabilitiesData() {
    return {
        labels: ["2023", "2024"],
        datasets: [
            { label: "Attivo Corrente", data: [2172485, 1959547], backgroundColor: "rgba(25, 25, 112, 0.7)" },
            { label: "Passivo Corrente", data: [898218, 876785], backgroundColor: "rgba(214, 34, 70, 0.7)" },
            { label: "Capitale Circolante Netto", data: [1274267, 1082762], backgroundColor: "rgba(77, 140, 87, 0.7)" }
        ]
    };
}

// Dati Parte 2
function getEconomicTrendData() {
    const dataAbs = getTrendRicaviEbitdaData_Dashboard();
    // Converti i valori in migliaia (K)
    dataAbs.datasets[0].data = dataAbs.datasets[0].data.map(v => v ? Math.round(v / 1000) : null);
    dataAbs.datasets[1].data = dataAbs.datasets[1].data.map(v => v ? Math.round(v / 1000) : null);
    dataAbs.datasets[0].label = "Ricavi (€000)";
    dataAbs.datasets[1].label = "EBITDA (€000)";
    return dataAbs;
}

function getMarginalityData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { label: "Valore Aggiunto %", data: [23.7, 27.1, 23.0], borderColor: "rgba(25, 25, 112, 1)", fill: false },
            { label: "Margine di Contribuzione %", data: [13.6, 16.3, 8.6], borderColor: "rgba(42, 58, 128, 1)", fill: false },
            { label: "EBITDA %", data: [5.3, 6.4, -1.53], borderColor: "rgba(77, 140, 87, 1)", fill: false },
            { label: "EBIT %", data: [4.6, 6.1, -3.3], borderColor: "rgba(217, 140, 0, 1)", fill: false }
        ]
    };
}

function getProfitabilityIndicesData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { label: "ROE %", data: [19.18, 17.65, -31.10], borderColor: "rgba(25, 25, 112, 1)", backgroundColor: "rgba(25, 25, 112, 0.2)", fill: true},
            { label: "ROI %", data: [14.96, 17.52, -6.65], borderColor: "rgba(77, 140, 87, 1)", backgroundColor: "rgba(77, 140, 87, 0.2)", fill: true},
            { label: "ROS %", data: [4.6, 6.1, -3.3], borderColor: "rgba(217, 140, 0, 1)", backgroundColor: "rgba(217, 140, 0, 0.2)", fill: true}
        ]
    };
}

function getLeverageData() {
    return {
        labels: ["2023", "2024"],
        datasets: [
            { label: "ROI (%)", data: [17.52, -6.65], backgroundColor: "rgba(25, 25, 112, 0.7)"},
            { label: "ROE (%)", data: [17.65, -31.10], backgroundColor: "rgba(77, 140, 87, 0.7)"}
        ]
    };
}

function getBenchmarkRadarData() {
    return {
        labels: ["Crescita Ricavi", "EBITDA Margin", "ROI", "Turnover", "Ciclo Circolante", "PFN/EBITDA", "D/E"],
        datasets: [
            {
                label: "VAROLI GUIDO E FIGLIO S.R.L.", // Valori > 100 = Migliore della media
                data: [0, 0, 0, 102, 40, 0, 38], // DATI NORMALIZZATI basati sui report
                backgroundColor: "rgba(25, 25, 112, 0.3)", 
                borderColor: "rgba(25, 25, 112, 1)", 
                borderWidth: 2, 
                pointBackgroundColor: "rgba(25, 25, 112, 1)"
            },
            {
                label: "Media Settore", // Base 100
                data: [100, 100, 100, 100, 100, 100, 100],
                backgroundColor: "rgba(217, 140, 0, 0.3)", 
                borderColor: "rgba(217, 140, 0, 1)", 
                borderWidth: 2, 
                pointBackgroundColor: "rgba(217, 140, 0, 1)"
            }
        ]
    };
}

// Dati Parte 3
function getAssetsData() {
    // Immob. Mat, Fin, Immat, Magazzino, Crediti, Liquidità
    const originalData = [854464, 21, 0, 1180021, 317323, 355443];
    const total = originalData.reduce((a, b) => a + b, 0);
    return {
        labels: ["Immob. Materiali", "Immob. Finanziarie", "Immob. Immateriali", "Magazzino", "Crediti", "Liquidità"],
        _originalData: originalData, // Valori originali per tooltip
        datasets: [{
            data: originalData.map(v => total > 0 ? (v/total)*100 : 0), // Dati %
            backgroundColor: ["#191970", "#4a69bd", "#F44336", "#FFC107", "#4CAF50", "#6c757d"] // Palette definita
        }]
    };
}

function getLiabilitiesData() {
    // PN, Debt MLT, Debt BT, Debt Comm., Fondi
    const originalData = [479666, 616361, 658692, 480162, 182528];
    const total = originalData.reduce((a, b) => a + b, 0);
    return {
        labels: ["Patrimonio Netto", "Debiti Fin. MLT", "Debiti Fin. BT", "Debiti Comm.", "Fondi"],
        _originalData: originalData,
        datasets: [{
            data: originalData.map(v => total > 0 ? (v/total)*100 : 0), // Dati %
            backgroundColor: ["#191970", "#4CAF50", "#FFC107", "#4a69bd", "#6c757d"] // Palette coerente
        }]
    };
}

function getInvestmentsStructureData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { label: "Immobilizzazioni", data: [142832, 116459, 854485], backgroundColor: "rgba(25, 25, 112, 0.7)", stack: "Stack 0" },
            { label: "Crediti commerciali", data: [607066, 503449, 317323], backgroundColor: "rgba(77, 140, 87, 0.7)", stack: "Stack 0" },
            { label: "Rimanenze", data: [1250170, 1246652, 1180021], backgroundColor: "rgba(217, 140, 0, 0.7)", stack: "Stack 0" },
            { label: "Liquidità", data: [304498, 171635, 355443], backgroundColor: "rgba(79, 109, 122, 0.7)", stack: "Stack 0" }
        ]
    };
}

function getEquityCompositionData() {
    // Capitale Sociale, Riserve, Utile, Utili a nuovo
    const originalData = [247539, 381304, -149177, 0];
    const total = originalData.reduce((a, b) => a + b, 0);
    return {
        labels: ["Capitale Sociale", "Riserve", "Utile Esercizio", "Utili a Nuovo"],
        _originalData: originalData,
        datasets: [{
            data: originalData.map(v => total > 0 ? (v/total)*100 : 0), // Dati %
            backgroundColor: ["#191970", "#4CAF50", "#F44336", "#4a69bd"]
        }]
    };
}

function getFinancialDebtSourcesData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "Debiti Finanziari", 
                data: [717099, 508454, 1275053], 
                backgroundColor: "rgba(214, 34, 70, 0.7)",
                type: "bar",
                yAxisID: 'y'
            },
            { 
                label: "Patrimonio Netto", 
                data: [554291, 648843, 479666], 
                backgroundColor: "rgba(25, 25, 112, 0.7)",
                type: "bar",
                yAxisID: 'y'
            },
            { 
                label: "Rapporto D/E", 
                data: [1.29, 0.78, 2.66], 
                type: "line",
                borderColor: "rgba(77, 140, 87, 1)",
                backgroundColor: "transparent",
                yAxisID: 'y1',
                borderWidth: 2,
                pointBackgroundColor: "rgba(77, 140, 87, 1)",
                fill: false
            }
        ]
    };
}

function getPfnTrendData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { label: "Debiti Finanziari Tot.", data: [717099, 508454, 1275053], type: "bar", backgroundColor: "rgba(214, 34, 70, 0.7)", yAxisID: 'y' },
            { label: "Liquidità", data: [304498, 171635, 355443], type: "bar", backgroundColor: "rgba(77, 140, 87, 0.7)", yAxisID: 'y'},
            { label: "PFN", data: [412601, 336819, 919610], type: "line", borderColor: "rgba(25, 25, 112, 1)", fill: false, yAxisID: 'y' }
        ]
    };
}

// Dati Parte 4
function getDebtSustainabilityData() {
    // Valori normalizzati per il grafico radar
    return {
        labels: ["PFN/EBITDA", "D/E", "DSCR", "Oneri Fin./Ricavi", "Cash Flow Op./Ricavi", "Leanus Score"],
        datasets: [
            { label: "VAROLI GUIDO E FIGLIO S.R.L.", data: [0, 38, 100, 0, 74, 35], backgroundColor: "rgba(25, 25, 112, 0.2)", borderColor: "rgba(25, 25, 112, 1)" }, // Valori normalizzati basati sui dati reali
            { label: "Target/Benchmark", data: [100, 67, 100, 100, 100, 75], backgroundColor: "rgba(77, 140, 87, 0.2)", borderColor: "rgba(77, 140, 87, 1)" }
        ]
    };
}

function getDebtCostData() { // Grafico Capacità Indebitamento
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { label: "EBITDA (€000)", data: [197, 213, -44], type: "bar", yAxisID: "y", backgroundColor: "rgba(77, 140, 87, 0.7)" },
            { label: "Capacità Teorica Indeb. (3x EBITDA, €000)", data: [591, 639, 0], type: "line", yAxisID: "y", borderColor: "rgba(25, 25, 112, 1)", fill: false }
        ]
    };
}

// Dati Parte 5
function getWorkingCapitalCycleData() {
    return {
        labels: ["Crediti Clienti (DSO)", "Magazzino (DIO)", "Debiti Fornitori (DPO)", "Ciclo Circolante"],
        datasets: [
            { label: "VAROLI GUIDO E FIGLIO S.R.L. (Giorni)", data: [41, 194, 68, 167], backgroundColor: "rgba(25, 25, 112, 0.7)" },
            { label: "Benchmark Settore (Giorni)", data: [60, 80, 75, 65], backgroundColor: "rgba(77, 140, 87, 0.7)" }
        ]
    };
}

function getCashFlowWaterfallData() {
    // Implementazione con barre semplici per rappresentare la cascata
    return {
        labels: ["EBITDA", "Imposte", "+Δ Circ.", "=CF Op.", "-Invest.", "=FCF", "+Δ Debt", "-Divid.", "=Δ Cassa"],
        datasets: [{
            data: [-43535, 0, 254880, 211345, -774136, -562791, 766599, -20000, 183808],
            backgroundColor: [ // Colori significativi
                '#F44336', // EBITDA (-)
                '#6c757d', // Imposte (=)
                '#4CAF50', // Delta Circ. (+)
                '#4CAF50', // CF Op (+)
                '#F44336', // Investimenti (-)
                '#F44336', // FCF (-)
                '#4CAF50', // Delta Debt (+)
                '#F44336', // Dividendi (-)
                '#4CAF50'  // Delta Cassa (+)
            ]
        }]
    };
}

function getCashFlowTrendData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { label: "Cash Flow Operativo", data: [-125524, 96543, 211345], borderColor: "rgba(77, 140, 87, 1)", fill: true, backgroundColor: "rgba(77, 140, 87, 0.1)"},
            { label: "Cash Flow Investimenti", data: [-10955, -761, -774136], borderColor: "rgba(214, 34, 70, 1)", fill: true, backgroundColor: "rgba(214, 34, 70, 0.1)" },
            { label: "Variazione Netta di Cassa", data: [33976, -132863, 183808], borderColor: "rgba(25, 25, 112, 1)", fill: true, backgroundColor: "rgba(25, 25, 112, 0.1)" }
        ]
    };
}

function getCashFlowProjectionData() {
    return {
        labels: ["2024", "2025E", "2026E", "2027E", "2028E"],
        datasets: [
            { label: "Cash Flow Operativo", data: [211345, 81318, 255988, 284034, 288625], type: 'bar', backgroundColor: "rgba(79, 109, 122, 0.7)", yAxisID: 'y' },
            { label: "Variazione Debiti Fin.", data: [766599, -205454, -136969, -91313, -60875], type: 'bar', backgroundColor: "rgba(214, 34, 70, 0.7)", yAxisID: 'y' },
            { label: "Liquidità Finale", data: [355443, 231307, 350326, 543048, 770797], type: 'line', borderColor: "rgba(77, 140, 87, 1)", fill: false, yAxisID: 'y1' }
        ]
    };
}

// Dati Parte 6
function getZscoreData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { label: "Z-Score", data: [null, null, 2.22], borderColor: "rgba(25, 25, 112, 1)", fill: false },
            { label: "Soglia Sicurezza", data: [2.99, 2.99, 2.99], borderColor: "rgba(77, 140, 87, 1)", borderDash: [5, 5], fill: false, pointRadius: 0 },
            { label: "Soglia Rischio", data: [1.81, 1.81, 1.81], borderColor: "rgba(214, 34, 70, 1)", borderDash: [5, 5], fill: false, pointRadius: 0 }
        ]
    };
}

function getRiskIndicatorsData() {
    // Dati normalizzati basati sui valori dell'azienda vs benchmark
    return {
        labels: ["ROI", "ROS", "D/E", "Cop. Immob.", "DSO", "DPO"], 
        datasets: [{
            label: "VAROLI GUIDO E FIGLIO S.R.L.",
            data: [0, 0, 38, 56, 132, 91], // Normalizzati dai dati dei report
            backgroundColor: "rgba(136, 141, 194, 0.5)", 
            borderColor: "rgba(97, 103, 173, 1)", 
            borderWidth: 2
        }, {
            label: "Target/Benchmark",
            data: [100, 100, 67, 100, 100, 100], // Benchmark normalizzato
            backgroundColor: "rgba(145, 190, 145, 0.4)", 
            borderColor: "rgba(103, 167, 103, 1)", 
            borderWidth: 2
        }]
    };
}

function getSensitivityData() {
    return {
        labels: ["Ricavi", "Costi Fissi", "Crediti Clienti (gg)", "Debiti Fornitori (gg)"],
        datasets: [{
            label: "Variazione Critica",
            data: [38.12, -32.35, 46, -50], // Dati dai report - Basati sull'analisi di sensitività
            backgroundColor: ["#4CAF50", "#F44336", "#4CAF50", "#F44336"] // Colori per impatto
        }]
    };
}

/**
 * Fornisce dati sulla composizione del debito finanziario per il grafico a ciambella
 * @returns {Object} Configurazione dati per il grafico a ciambella
 */
function getFinancialDebtData() {
    // Debiti BT, Debiti MLT
    const originalData = [658692, 616361];
    const total = originalData.reduce((a, b) => a + b, 0);
    return {
        labels: ["Debiti Finanziari BT", "Debiti Finanziari MLT"],
        _originalData: originalData,
        datasets: [{
            data: originalData.map(v => total > 0 ? (v/total)*100 : 0),
            backgroundColor: ["#FFC107", "#4CAF50"]
        }]
    };
}

// ======================================
// OPZIONI COMUNI PER I GRAFICI
// ======================================

/**
 * Formatta un valore come percentuale
 * @param {number} value - Valore da formattare
 * @returns {string} Valore formattato come percentuale
 */
function formatPercentage(value) {
    return value.toFixed(2) + '%';
}

/**
 * Formatta un valore come valuta
 * @param {number} value - Valore da formattare
 * @param {number} decimals - Numero di decimali
 * @returns {string} Valore formattato
 */
function formatCurrency(value, decimals = 0) {
    return value.toFixed(decimals);
}

// Configurazione base comune per tutti i grafici
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: { boxWidth: 12, padding: 15, font: { size: 11 } }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { weight: 'bold', size: 13 },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 4,
            displayColors: true,
            boxPadding: 4,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || context.label || '';
                    if (label) label += ': ';
                    
                    // Determina il valore da visualizzare
                    let value = context.parsed.y;
                    if (value === null || value === undefined) value = context.parsed.r; // Per radar

                    if (value !== null && value !== undefined) {
                        const axisID = context.dataset.yAxisID;
                        const labelText = context.label;
                        const datasetLabel = context.dataset.label || '';

                        // Formatta il valore in base al tipo di dato
                        if (datasetLabel.includes('%') || (axisID === 'y1' && context.chart.options.scales?.y1?.title?.text.includes('%'))) {
                            label += formatPercentage(value);
                        } else if (datasetLabel.includes('(gg)') || labelText?.includes('(gg)')) {
                            label += value.toFixed(0) + ' gg';
                        } else if (datasetLabel.includes('(x)') || labelText?.includes('(x)') || datasetLabel.includes('PFN/EBITDA') || datasetLabel.includes('D/E') || datasetLabel.includes('Z-Score')) {
                            label += value.toFixed(2) + (datasetLabel.includes('Z-Score') ? '' : 'x');
                        } else if (datasetLabel.includes('Score') && !datasetLabel.includes('Z-Score')) {
                            label += value.toFixed(2);
                        } else if (datasetLabel.includes('Variazione Critica')) { // Per grafico sensitività
                            label += value.toFixed(2) + (labelText.includes('(gg)') ? ' gg' : '%');
                        } else if (Math.abs(value) >= 1000000) {
                            label += formatCurrency(value / 1000000, 2) + ' M';
                        } else if (Math.abs(value) >= 1000) {
                            label += formatCurrency(value / 1000, 0) + ' K';
                        } else {
                            label += formatCurrency(value, (Math.abs(value) < 10 && value !== 0 ? 2 : 0));
                        }
                    } else {
                        label += 'N/D';
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
        },
        y: {
            grid: { color: '#e0e0e0', borderDash: [2, 3] },
            ticks: { font: { size: 11 } }
        }
    },
    animation: { duration: 400 }
};

// Opzioni specifiche per grafici a torta/ciambella
const pieChartOptions = {
    ...commonChartOptions,
    cutout: '0%',
    plugins: {
        ...commonChartOptions.plugins,
        tooltip: {
            ...commonChartOptions.plugins.tooltip,
            callbacks: {
                label: function(context) {
                    const label = context.label || '';
                    const value = context.raw || 0; // Usa valore raw (percentuale)
                    const originalValue = context.dataset._originalData ? context.dataset._originalData[context.dataIndex] : value;
                    const percentage = formatPercentage(value); // Formatta la percentuale
                    return `${label}: ${formatCurrency(originalValue)} (${percentage})`;
                }
            }
        }
    }
};

// Opzioni per grafico a ciambella (estende pieChartOptions)
const doughnutChartOptions = { 
    ...pieChartOptions, 
    cutout: '50%' 
};

// Opzioni specifiche per grafici radar
const radarChartOptions = {
    ...commonChartOptions,
    scales: {
        r: {
            angleLines: { color: '#e0e0e0' },
            grid: { color: '#e0e0e0' },
            pointLabels: { font: { size: 10 } },
            ticks: {
                backdropColor: 'rgba(255, 255, 255, 0.75)',
                font: { size: 9 },
                maxTicksLimit: 5,
            },
            suggestedMin: 0,
        }
    },
    plugins: {
        ...commonChartOptions.plugins,
        tooltip: {
            ...commonChartOptions.plugins.tooltip,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) label += ': ';
                    if (context.parsed.r !== null) {
                        label += context.parsed.r.toFixed(1); // Valore asse radiale
                    }
                    return label;
                }
            }
        }
    }
};

console.log("charts_config.js caricato e pronto per VAROLI GUIDO E FIGLIO S.R.L.");