/**
 * SCAN - Strategic Corporate Analysis Navigator
 * Configurazione Dati e Opzioni per Grafici Chart.js
 * Versione 1.3 - Dati Aggiornati per VAROLI GUIDO E FIGLIO S.R.L.
 */

// ======================================
// COSTANTI E CONFIGURAZIONI
// ======================================

// Palette colori standardizzata per coerenza visiva
const COLORS = {
    primary: {
        main: 'rgb(25, 25, 112)',
        light: 'rgba(25, 25, 112, 0.1)',
        medium: 'rgba(25, 25, 112, 0.3)',
        dark: 'rgba(25, 25, 112, 0.7)'
    },
    secondary: {
        main: 'rgb(77, 140, 87)',
        light: 'rgba(77, 140, 87, 0.1)',
        medium: 'rgba(77, 140, 87, 0.3)',
        dark: 'rgba(77, 140, 87, 0.7)'
    },
    tertiary: {
        main: 'rgb(217, 140, 0)',
        light: 'rgba(217, 140, 0, 0.1)',
        medium: 'rgba(217, 140, 0, 0.3)',
        dark: 'rgba(217, 140, 0, 0.7)'
    },
    danger: {
        main: 'rgb(214, 34, 70)',
        light: 'rgba(214, 34, 70, 0.1)',
        medium: 'rgba(214, 34, 70, 0.3)',
        dark: 'rgba(214, 34, 70, 0.7)'
    },
    neutral: {
        main: 'rgb(79, 109, 122)',
        light: 'rgba(79, 109, 122, 0.1)',
        medium: 'rgba(79, 109, 122, 0.3)',
        dark: 'rgba(79, 109, 122, 0.7)'
    },
    status: {
        positive: '#4CAF50',
        negative: '#F44336',
        warning: '#FFC107',
        neutral: '#6c757d',
        info: '#4a69bd'
    }
};

// ======================================
// FUNZIONI DI UTILITÀ
// ======================================

/**
 * Formatta un valore come percentuale
 * @param {number} value - Valore da formattare
 * @param {number} [decimals=2] - Numero di decimali
 * @return {string} Valore formattato con simbolo percentuale
 */
function formatPercentage(value, decimals = 2) {
    return value.toFixed(decimals) + '%';
}

/**
 * Formatta un valore come valuta
 * @param {number} value - Valore da formattare
 * @param {number} [decimals=0] - Numero di decimali
 * @return {string} Valore formattato secondo locale italiano
 */
function formatCurrency(value, decimals = 0) {
    return value.toLocaleString('it-IT', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

/**
 * Determina il formato appropriato per un valore in base al contesto
 * @param {number} value - Valore da formattare
 * @param {Object} context - Contesto del tooltip
 * @return {string} Valore formattato appropriatamente
 */
function formatValueByContext(value, context) {
    if (value === null || value === undefined) return 'N/D';
    
    const axisID = context.dataset.yAxisID;
    const labelText = context.label;
    const datasetLabel = context.dataset.label || '';
    
    // Percentuali
    if (datasetLabel.includes('%') || (axisID === 'y1' && context.chart.options.scales?.y1?.title?.text?.includes('%'))) {
        return formatPercentage(value);
    }
    
    // Giorni
    if (datasetLabel.includes('(gg)') || labelText?.includes('(gg)')) {
        return `${value.toFixed(0)} gg`;
    }
    
    // Rapporti (x)
    if (datasetLabel.includes('(x)') || labelText?.includes('(x)') || 
        datasetLabel.includes('PFN/EBITDA') || datasetLabel.includes('D/E') || 
        datasetLabel.includes('Z-Score')) {
        return `${value.toFixed(2)}${datasetLabel.includes('Z-Score') ? '' : 'x'}`;
    }
    
    // Score
    if (datasetLabel.includes('Score') && !datasetLabel.includes('Z-Score')) {
        return value.toFixed(2);
    }
    
    // Variazione critica
    if (datasetLabel.includes('Variazione Critica')) {
        return `${value.toFixed(2)}${labelText.includes('(gg)') ? ' gg' : '%'}`;
    }
    
    // Valori monetari
    if (Math.abs(value) >= 1000000) {
        return `${formatCurrency(value / 1000000, 2)} M`;
    } else if (Math.abs(value) >= 1000) {
        return `${formatCurrency(value / 1000, 0)} K`;
    } else {
        return formatCurrency(value, (Math.abs(value) < 10 && value !== 0 ? 2 : 0));
    }
}

// ======================================
// OPZIONI COMUNI PER I GRAFICI
// ======================================

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
                    
                    let value = context.parsed.y;
                    if (value === null || value === undefined) value = context.parsed.r; // Per radar
                    
                    if (value !== null && value !== undefined) {
                        label += formatValueByContext(value, context);
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

// ======================================
// FUNZIONI PER RECUPERARE I DATI SPECIFICI
// ======================================

// --- Dati per Dashboard Esecutiva (dashboard.html) ---

/**
 * Fornisce i dati per il grafico dei trend di Ricavi ed EBITDA
 * @return {Object} Dataset configurato per Chart.js
 */
function getTrendRicaviEbitdaData_Dashboard() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            {
                label: "Ricavi (€)",
                data: [3722214, 3324256, 2849913], // Valori assoluti
                borderColor: COLORS.primary.main,
                backgroundColor: COLORS.primary.light,
                type: 'line', 
                tension: 0.1, 
                yAxisID: 'y', 
                fill: true, 
                pointRadius: 3,
            },
            {
                label: "EBITDA (€)",
                data: [196510, 213142, -43535], // Valori assoluti
                borderColor: COLORS.secondary.main,
                backgroundColor: COLORS.secondary.dark,
                type: 'bar', 
                yAxisID: 'y', 
                barPercentage: 0.6, 
                categoryPercentage: 0.7
            },
            {
                label: "EBITDA Margin (%)",
                data: [5.3, 6.4, -1.53], // Percentuale
                borderColor: COLORS.tertiary.main,
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

/**
 * Fornisce i dati per il grafico del trend PFN/EBITDA
 * @return {Object} Dataset configurato per Chart.js
 */
function getTrendPfnEbitdaData_Dashboard() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            {
                label: "PFN/EBITDA",
                data: [4.98, 3.82, null], // Valori del rapporto (PFN/EBITDA non calcolabile nel 2024 per EBITDA negativo)
                borderColor: COLORS.danger.main,
                backgroundColor: COLORS.danger.light,
                tension: 0.1, 
                fill: true, 
                pointRadius: 5, 
                pointHoverRadius: 7,
                pointBackgroundColor: COLORS.danger.main
            },
            {
                label: 'Soglia Attenzione (<3x)',
                data: [3, 3, 3], // Linea target
                borderColor: COLORS.status.warning,
                borderDash: [5, 5], 
                fill: false, 
                pointRadius: 0, 
                borderWidth: 2,
            }
        ]
    };
}

// --- Dati per Report Dettagliati (report/parteX_*.html) ---

/**
 * Fornisce i dati per il grafico delle metriche principali
 * @return {Object} Dataset configurato per Chart.js
 */
function getMainMetricsData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "Ricavi (€000)", 
                data: [3722, 3324, 2850], 
                backgroundColor: COLORS.primary.dark 
            },
            { 
                label: "EBITDA (€000)", 
                data: [197, 213, -44], 
                backgroundColor: COLORS.secondary.dark 
            },
            { 
                label: "Patrimonio Netto (€000)", 
                data: [584, 650, 480], 
                backgroundColor: COLORS.tertiary.dark 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico delle attività e passività correnti
 * @return {Object} Dataset configurato per Chart.js
 */
function getCurrentAssetsLiabilitiesData() {
    return {
        labels: ["2023", "2024"],
        datasets: [
            { 
                label: "Attivo Corrente", 
                data: [1995911, 1828448], 
                backgroundColor: COLORS.primary.dark 
            },
            { 
                label: "Passivo Corrente", 
                data: [663045, 529214], 
                backgroundColor: COLORS.danger.dark 
            },
            { 
                label: "Capitale Circolante Netto", 
                data: [1332866, 1299234], 
                backgroundColor: COLORS.secondary.dark 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico del trend economico
 * @return {Object} Dataset configurato per Chart.js
 */
function getEconomicTrendData() {
    const dataAbs = getTrendRicaviEbitdaData_Dashboard();
    // Converti i valori in migliaia
    dataAbs.datasets[0].data = dataAbs.datasets[0].data.map(v => v ? Math.round(v / 1000) : null);
    dataAbs.datasets[1].data = dataAbs.datasets[1].data.map(v => v ? Math.round(v / 1000) : null);
    dataAbs.datasets[0].label = "Ricavi (€000)";
    dataAbs.datasets[1].label = "EBITDA (€000)";
    return dataAbs;
}

/**
 * Fornisce i dati per il grafico della marginalità
 * @return {Object} Dataset configurato per Chart.js
 */
function getMarginalityData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "Valore Aggiunto %", 
                data: [23.7, 27.1, 23.0], 
                borderColor: COLORS.primary.main, 
                fill: false 
            },
            { 
                label: "Margine di Contribuzione %", 
                data: [13.6, 16.3, 8.6], 
                borderColor: COLORS.status.info, 
                fill: false 
            },
            { 
                label: "EBITDA %", 
                data: [5.3, 6.4, -1.53], 
                borderColor: COLORS.secondary.main, 
                fill: false 
            },
            { 
                label: "EBIT %", 
                data: [3.9, 5.2, -3.26], 
                borderColor: COLORS.tertiary.main, 
                fill: false 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico degli indici di redditività
 * @return {Object} Dataset configurato per Chart.js
 */
function getProfitabilityIndicesData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "ROE %", 
                data: [19.18, 17.65, -31.10], 
                borderColor: COLORS.primary.main, 
                backgroundColor: COLORS.primary.light, 
                fill: true
            },
            { 
                label: "ROI %", 
                data: [14.96, 17.52, -6.65], 
                borderColor: COLORS.secondary.main, 
                backgroundColor: COLORS.secondary.light, 
                fill: true
            },
            { 
                label: "ROS %", 
                data: [3.9, 5.2, -3.26], 
                borderColor: COLORS.tertiary.main, 
                backgroundColor: COLORS.tertiary.light, 
                fill: true
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico della leva finanziaria
 * @return {Object} Dataset configurato per Chart.js
 */
function getLeverageData() {
    return {
        labels: ["2023", "2024"],
        datasets: [
            { 
                label: "ROI (%)", 
                data: [17.52, -6.65], 
                backgroundColor: COLORS.primary.dark
            },
            { 
                label: "ROE (%)", 
                data: [17.65, -31.10], 
                backgroundColor: COLORS.secondary.dark
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico radar del benchmark competitivo
 * @return {Object} Dataset configurato per Chart.js
 */
function getBenchmarkRadarData() {
    // Dati normalizzati basati sul posizionamento competitivo
    return {
        labels: ["Crescita Ricavi", "EBITDA Margin", "ROI", "Turnover", "Ciclo Circolante", "PFN/EBITDA", "D/E"],
        datasets: [
            {
                label: "VAROLI GUIDO E FIGLIO S.R.L.", // Valori > 100 = Migliore della media
                data: [19, 0, 0, 100, 32, 0, 28], // DATI NORMALIZZATI basati sui report
                backgroundColor: COLORS.primary.medium, 
                borderColor: COLORS.primary.main, 
                borderWidth: 2, 
                pointBackgroundColor: COLORS.primary.main
            },
            {
                label: "Media Settore", // Base 100
                data: [100, 100, 100, 100, 100, 100, 100],
                backgroundColor: COLORS.tertiary.medium, 
                borderColor: COLORS.tertiary.main, 
                borderWidth: 2, 
                pointBackgroundColor: COLORS.tertiary.main
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico della composizione dell'attivo
 * @return {Object} Dataset configurato per Chart.js
 */
function getAssetsData() {
    const originalData = [454485, 0, 0, 1067842, 323921, 355443]; // Immob. Mat, Fin, Immat, Magazzino, Crediti, Liquidità
    const total = originalData.reduce((a, b) => a + b, 0);
    return {
        labels: ["Immob. Materiali", "Immob. Finanziarie", "Immob. Immateriali", "Magazzino", "Crediti", "Liquidità"],
        _originalData: originalData, // Valori originali per tooltip
        datasets: [{
            data: originalData.map(v => total > 0 ? (v/total)*100 : 0), // Dati %
            backgroundColor: [
                COLORS.primary.main, 
                COLORS.status.info, 
                COLORS.status.negative, 
                COLORS.status.warning, 
                COLORS.status.positive, 
                COLORS.status.neutral
            ]
        }]
    };
}

/**
 * Fornisce i dati per il grafico della composizione del passivo
 * @return {Object} Dataset configurato per Chart.js
 */
function getLiabilitiesData() {
    const originalData = [479666, 616361, 658692, 480162, 78839]; // PN, Debt MLT, Debt BT, Debt Comm., Fondi
    const total = originalData.reduce((a, b) => a + b, 0);
    return {
        labels: ["Patrimonio Netto", "Debiti Fin. MLT", "Debiti Fin. BT", "Debiti Comm.", "Fondi"],
        _originalData: originalData,
        datasets: [{
            data: originalData.map(v => total > 0 ? (v/total)*100 : 0), // Dati %
            backgroundColor: [
                COLORS.primary.main, 
                COLORS.status.positive, 
                COLORS.status.warning, 
                COLORS.status.info, 
                COLORS.status.neutral
            ]
        }]
    };
}

/**
 * Fornisce i dati per il grafico della struttura degli investimenti
 * @return {Object} Dataset configurato per Chart.js
 */
function getInvestmentsStructureData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "Immobilizzazioni", 
                data: [562981, 542153, 454485], 
                backgroundColor: COLORS.primary.dark, 
                stack: "Stack 0" 
            },
            { 
                label: "Crediti commerciali", 
                data: [403423, 422112, 323921], 
                backgroundColor: COLORS.secondary.dark, 
                stack: "Stack 0" 
            },
            { 
                label: "Rimanenze", 
                data: [1051763, 1081429, 1067842], 
                backgroundColor: COLORS.tertiary.dark, 
                stack: "Stack 0" 
            },
            { 
                label: "Liquidità", 
                data: [331275, 424881, 355443], 
                backgroundColor: COLORS.neutral.dark, 
                stack: "Stack 0" 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico della composizione del patrimonio netto
 * @return {Object} Dataset configurato per Chart.js
 */
function getEquityCompositionData() {
    const originalData = [247539, 381304, -149177, 0]; // Capitale Sociale, Riserve, Utile, Utili a nuovo
    const total = originalData.reduce((a, b) => a + b, 0);
    return {
        labels: ["Capitale Sociale", "Riserve", "Utile Esercizio", "Utili a Nuovo"],
        _originalData: originalData,
        datasets: [{
            data: originalData.map(v => total > 0 ? (v/total)*100 : 0), // Dati %
            backgroundColor: [
                COLORS.primary.main, 
                COLORS.status.positive, 
                COLORS.status.negative, 
                COLORS.status.info
            ]
        }]
    };
}

/**
 * Fornisce i dati per il grafico delle fonti di finanziamento
 * @return {Object} Dataset configurato per Chart.js
 */
function getFinancialDebtSourcesData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "Debiti Finanziari", 
                data: [1140362, 1163776, 1275053], 
                backgroundColor: COLORS.danger.dark,
                type: "bar",
                yAxisID: 'y'
            },
            { 
                label: "Patrimonio Netto", 
                data: [583657, 650404, 479666], 
                backgroundColor: COLORS.primary.dark,
                type: "bar",
                yAxisID: 'y'
            },
            { 
                label: "Rapporto D/E", 
                data: [1.95, 1.79, 2.66], 
                type: "line",
                borderColor: COLORS.secondary.main,
                backgroundColor: "transparent",
                yAxisID: 'y1',
                borderWidth: 2,
                pointBackgroundColor: COLORS.secondary.main,
                fill: false
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico del trend della PFN
 * @return {Object} Dataset configurato per Chart.js
 */
function getPfnTrendData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "Debiti Finanziari Tot.", 
                data: [1140362, 1163776, 1275053], 
                type: "bar", 
                backgroundColor: COLORS.danger.dark, 
                yAxisID: 'y' 
            },
            { 
                label: "Liquidità", 
                data: [331275, 424881, 355443], 
                type: "bar", 
                backgroundColor: COLORS.secondary.dark, 
                yAxisID: 'y'
            },
            { 
                label: "PFN", 
                data: [809087, 738895, 919610], 
                type: "line", 
                borderColor: COLORS.primary.main, 
                fill: false, 
                yAxisID: 'y' 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico della sostenibilità del debito
 * @return {Object} Dataset configurato per Chart.js
 */
function getDebtSustainabilityData() {
    // Valori normalizzati per il grafico radar
    return {
        labels: ["PFN/EBITDA", "D/E", "DSCR", "Oneri Fin./Ricavi", "Cash Flow Op./Ricavi", "Leanus Score"],
        datasets: [
            { 
                label: "VAROLI GUIDO E FIGLIO S.R.L.", 
                data: [0, 28, 56, 0, 74, 35], 
                backgroundColor: COLORS.primary.light, 
                borderColor: COLORS.primary.main 
            },
            { 
                label: "Target/Benchmark", 
                data: [100, 67, 100, 100, 100, 75], 
                backgroundColor: COLORS.secondary.light, 
                borderColor: COLORS.secondary.main 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico del costo del debito
 * @return {Object} Dataset configurato per Chart.js
 */
function getDebtCostData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "EBITDA (€000)", 
                data: [197, 213, -44], 
                type: "bar", 
                yAxisID: "y", 
                backgroundColor: COLORS.secondary.dark 
            },
            { 
                label: "Capacità Teorica Indeb. (€000)", 
                data: [0, 0, 0], 
                type: "line", 
                yAxisID: "y", 
                borderColor: COLORS.primary.main, 
                fill: false 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico del ciclo del capitale circolante
 * @return {Object} Dataset configurato per Chart.js
 */
function getWorkingCapitalCycleData() {
    return {
        labels: ["Crediti Clienti (DSO)", "Magazzino (DIO)", "Debiti Fornitori (DPO)", "Ciclo Circolante"],
        datasets: [
            { 
                label: "VAROLI GUIDO E FIGLIO S.R.L. (Giorni)", 
                data: [41, 194, 68, 167], 
                backgroundColor: COLORS.primary.dark 
            },
            { 
                label: "Benchmark Settore (Giorni)", 
                data: [55, 61, 64, 51], 
                backgroundColor: COLORS.secondary.dark 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico a cascata del cash flow
 * @return {Object} Dataset configurato per Chart.js
 */
function getCashFlowWaterfallData() {
    // Implementazione con barre semplici per rappresentare la cascata
    return {
        labels: ["EBITDA", "Imposte", "+Δ Circ.", "=CF Op.", "-Invest.", "=FCF", "+Δ Debt", "-Divid.", "=Δ Cassa"],
        datasets: [{
            data: [-43535, -5720, 108427, 211345, -774136, -562791, 746599, 0, 183808],
            backgroundColor: [
                COLORS.status.negative, // EBITDA (-)
                COLORS.status.negative, // Imposte (-)
                COLORS.status.positive, // Delta Circ. (+)
                COLORS.status.positive, // CF Op (+)
                COLORS.status.negative, // Investimenti (-)
                COLORS.status.negative, // FCF (-)
                COLORS.status.positive, // Delta Debt (+)
                COLORS.status.neutral,  // Dividendi (=)
                COLORS.status.positive  // Delta Cassa (+)
            ]
        }]
    };
}

/**
 * Fornisce i dati per il grafico del trend del cash flow
 * @return {Object} Dataset configurato per Chart.js
 */
function getCashFlowTrendData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "Cash Flow Operativo", 
                data: [-125524, 96543, 211345], 
                borderColor: COLORS.secondary.main, 
                fill: true, 
                backgroundColor: COLORS.secondary.light
            },
            { 
                label: "Cash Flow Investimenti", 
                data: [-10955, -761, -774136], 
                borderColor: COLORS.danger.main, 
                fill: true, 
                backgroundColor: COLORS.danger.light 
            },
            { 
                label: "Variazione Netta di Cassa", 
                data: [33976, -132863, 183808], 
                borderColor: COLORS.primary.main, 
                fill: true, 
                backgroundColor: COLORS.primary.light 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico delle proiezioni del cash flow
 * @return {Object} Dataset configurato per Chart.js
 */
function getCashFlowProjectionData() {
    return {
        labels: ["2024", "2025E", "2026E", "2027E", "2028E"],
        datasets: [
            { 
                label: "Cash Flow Operativo", 
                data: [211345, 62112, 232102, 145173, 149909], 
                type: 'bar', 
                backgroundColor: COLORS.neutral.dark, 
                yAxisID: 'y' 
            },
            { 
                label: "Variazione Debiti Fin.", 
                data: [746599, 213256, -75473, -64691, -55449], 
                type: 'bar', 
                backgroundColor: COLORS.danger.dark, 
                yAxisID: 'y' 
            },
            { 
                label: "Liquidità Finale", 
                data: [355443, 304780, 331409, 411891, 506351], 
                type: 'line', 
                borderColor: COLORS.secondary.main, 
                fill: false, 
                yAxisID: 'y1' 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico dello Z-score
 * @return {Object} Dataset configurato per Chart.js
 */
function getZscoreData() {
    return {
        labels: ["2022", "2023", "2024"],
        datasets: [
            { 
                label: "Z-Score", 
                data: [null, null, 2.22], 
                borderColor: COLORS.primary.main, 
                fill: false 
            },
            { 
                label: "Soglia Sicurezza", 
                data: [2.99, 2.99, 2.99], 
                borderColor: COLORS.secondary.main, 
                borderDash: [5, 5], 
                fill: false, 
                pointRadius: 0 
            },
            { 
                label: "Soglia Rischio", 
                data: [1.81, 1.81, 1.81], 
                borderColor: COLORS.danger.main, 
                borderDash: [5, 5], 
                fill: false, 
                pointRadius: 0 
            }
        ]
    };
}

/**
 * Fornisce i dati per il grafico degli indicatori di rischio
 * @return {Object} Dataset configurato per Chart.js
 */
function getRiskIndicatorsData() {
    // Dati normalizzati basati sui valori dell'azienda vs benchmark
    return {
        labels: ["ROI", "ROS", "D/E", "Cop. Immob.", "DSO", "DPO"], 
        datasets: [{
            label: "VAROLI GUIDO E FIGLIO S.R.L.",
            data: [0, 0, 28, 56, 134, 106], // Normalizzati dai dati dei report
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

/**
 * Fornisce i dati per il grafico dell'analisi di sensitività
 * @return {Object} Dataset configurato per Chart.js
 */
function getSensitivityData() {
    return {
        labels: ["Ricavi", "Costi Fissi", "Crediti Clienti (gg)", "Debiti Fornitori (gg)"],
        datasets: [{
            label: "Variazione Critica",
            data: [-8.56, 9.52, 35, -15], // Dati dai report - Basati sull'analisi di sensitività
            backgroundColor: [
                COLORS.status.negative, 
                COLORS.status.positive, 
                COLORS.status.positive, 
                COLORS.status.negative
            ]
        }]
    };
}

/**
 * Fornisce i dati per il grafico a ciambella del debito finanziario
 * @return {Object} Dataset configurato per Chart.js
 */
function getFinancialDebtData() {
    // Using data from getFinancialDebtSourcesData but formatted for doughnut chart
    const originalData = [658692, 616361]; // Debiti BT, Debiti MLT (from existing data)
    const total = originalData.reduce((a, b) => a + b, 0);
    return {
        labels: ["Debiti Finanziari BT", "Debiti Finanziari MLT"],
        _originalData: originalData,
        datasets: [{
            data: originalData.map(v => total > 0 ? (v/total)*100 : 0),
            backgroundColor: [COLORS.status.warning, COLORS.status.positive]
        }]
    };
}

console.log("charts_config.js caricato e pronto per VAROLI GUIDO E FIGLIO S.R.L.");