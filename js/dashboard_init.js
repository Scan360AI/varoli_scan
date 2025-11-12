// charts_config.js

/**
 * Configurazione dei grafici per la dashboard finanziaria
 * Questo file contiene funzioni che generano configurazioni per Chart.js
 * @version 1.1.0
 * @last-updated 2025-11-12
 */

/**
 * Genera dati per il grafico Trend Ricavi/EBITDA
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getTrendRicaviEbitdaData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                type: 'bar',
                label: 'Ricavi',
                data: [3722214, 3324256, 2849913],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                type: 'bar',
                label: 'EBITDA',
                data: [196510, 213142, -43535],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                type: 'line',
                label: 'EBITDA Margin %',
                data: [5.3, 6.4, -1.53],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };
}

/**
 * Genera dati per il grafico Trend PFN/EBITDA
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getTrendPfnEbitdaData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: 'PFN/EBITDA',
                data: [2.10, 1.58, null], // EBITDA negativo nel 2024, non calcolabile
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                fill: false
            },
            {
                label: 'Soglia di Sicurezza',
                data: [3, 3, 3],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false
            }
        ]
    };
}

/**
 * Genera dati per il grafico Ciclo del Circolante
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getCicloCirData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: 'DSO (Giorni Crediti)',
                data: [59, 55, 41],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'DPO (Giorni Debiti)',
                data: [73, 67, 68],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Ciclo del Circolante',
                data: [145, 174, 167],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Indice di Rischio Ponderato (IRP)
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getIRPData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: 'IRP',
                data: [65.8, 60.3, 51.42],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                fill: true
            }
        ]
    };
}

// Funzioni per la dashboard - riutilizzano le funzioni principali
const getTrendRicaviEbitdaData_Dashboard = getTrendRicaviEbitdaData;
const getTrendPfnEbitdaData_Dashboard = getTrendPfnEbitdaData;
const getCicloCirData_Dashboard = getCicloCirData;
const getIRPData_Dashboard = getIRPData;

/**
 * Genera dati per il grafico Composizione Ricavi
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getComposizioneRicaviData() {
    return {
        labels: ['Commercio all\'ingrosso di legname', 'Altri servizi'],
        datasets: [
            {
                data: [98, 2],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Composizione Costi
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getComposizioneCostiData() {
    const labels = ['Acquisti', 'Costi variabili', 'Costi fissi', 'Personale', 'Ammortamenti', 'Oneri finanziari'];
    const data = [77.0, 14.4, 10.1, 9.4, 1.7, 2.3];
    const colors = [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
    ];
    const borderColors = colors.map(color => color.replace('0.7', '1'));
    
    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Indici di Redditività
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getIndiciRedditData() {
    return {
        labels: ['ROI', 'ROE', 'ROS'],
        datasets: [
            {
                label: '2022',
                data: [14.96, 19.18, 3.9],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: '2023',
                data: [17.52, 17.65, 5.2],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: '2024',
                data: [-6.65, -31.10, -3.3],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Struttura Patrimoniale
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getStrutturaPatrimonialeData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: 'Attivo Fisso',
                data: [562981, 542153, 454485],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                stack: 'Stack 0'
            },
            {
                label: 'Attivo Circolante',
                data: [1869726, 1995911, 1828448],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                stack: 'Stack 0'
            },
            {
                label: 'Patrimonio Netto',
                data: [583657, 650404, 479666],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                stack: 'Stack 1'
            },
            {
                label: 'Passività',
                data: [1849050, 1887660, 1803267],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                stack: 'Stack 1'
            }
        ]
    };
}

/**
 * Genera dati per il grafico Cash Flow
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getCashFlowData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: 'Cash Flow Operativo',
                data: [-125524, 96543, 211345],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Cash Flow Investimenti',
                data: [-10955, -761, -774136],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Variazione Netta di Cassa',
                data: [33976, -132863, 183808],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Componenti IRP
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getComponentiIRPData() {
    const labels = ['Coefficiente di Ponderazione', 'Leanus Score', 'Rating MCC', 'Z-Score Altman'];
    const data = [43.00, 54.70, 46.20, 70.40];
    const colors = [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 206, 86, 0.7)'
    ];
    const borderColors = colors.map(color => color.replace('0.7', '1'));
    
    return {
        labels,
        datasets: [
            {
                label: 'Punteggio',
                data,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Indicatori Component Score
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getIndicatoriCSData() {
    return {
        labels: ['PFN/EBITDA', 'EBIT/OF', 'Ciclo Circolante', 'EBITDA/Ricavi', 'Copertura AF', 'DSCR'],
        datasets: [
            {
                label: 'Punteggio',
                data: [100, 10, 10, 10, 80, 10],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Peso',
                data: [25, 20, 15, 15, 15, 10],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Benchmark Settoriale
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getBenchmarkSettorialeData() {
    return {
        labels: ['EBITDA Margin', 'ROI', 'ROE', 'PFN/EBITDA', 'Giorni Clienti', 'Giorni Fornitori'],
        datasets: [
            {
                label: 'VAROLI GUIDO E FIGLIO S.R.L.',
                data: [-1.53, -6.65, -31.10, null, 41, 68],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Media Settore',
                data: [0.93, -3.16, 3.22, 2.63, 54, 64],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Proiezioni Finanziarie
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getProiezioniFinanziarieData() {
    return {
        labels: ['2024', '2025', '2026', '2027', '2028'],
        datasets: [
            {
                label: 'Ricavi',
                data: [2849913, 2500000, 2775000, 2969250, 3177098],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                label: 'EBITDA',
                data: [-43535, 14510, 135384, 177589, 223055],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                label: 'Cash Flow Operativo',
                data: [211345, 62112, 232102, 145173, 149909],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'y'
            }
        ]
    };
}

/**
 * Genera dati per il grafico Stress Test
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getStressTestData() {
    return {
        labels: ['Variazione Ricavi', 'Variazione Costi Fissi', 'Variazione Crediti', 'Variazione Debiti'],
        datasets: [
            {
                label: 'Valore Critico',
                data: [-8.56, 10.1, 60, -40],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Valore Attuale',
                data: [-14.27, 0, 41, 68],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Indicatori CCII
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getIndicatoriCCIIData() {
    return {
        labels: ['OF/Ricavi', 'PN/Debiti', 'Attivo/Passivo Corrente', 'Cash Flow/Attivo', 'Debiti Prev./Attivo'],
        datasets: [
            {
                label: 'Valore Attuale',
                data: [2.36, 34.25, 109.00, 10.96, 3.70],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Soglia di Allerta',
                data: [8.0, 8.0, 90.0, 0.4, 5.5],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Capacità di Indebitamento
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getCapacitaIndebitamentoData() {
    const labels = ['Capacità Teorica (3.0x)', 'Capacità Teorica (2.5x)', 'Capacità Incrementale', 'Fido Consigliato'];
    const data = [0, 0, 0, 0]; // Capacità di indebitamento incrementale pari a 0
    const colors = [
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(255, 99, 132, 0.7)'
    ];
    const borderColors = colors.map(color => color.replace('0.7', '1'));
    
    return {
        labels,
        datasets: [
            {
                label: 'Importo (€)',
                data,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Evoluzione Liquidità
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getEvoluzioneGiacenzaData() {
    return {
        labels: ['2022', '2023', '2024', '2025', '2026', '2027', '2028'],
        datasets: [
            {
                label: 'Liquidità',
                data: [331275, 424881, 355443, 304780, 331409, 411891, 506351],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: true
            },
            {
                label: 'Liquidità/Ricavi',
                data: [8.9, 12.8, 12.47, 12.19, 11.94, 13.87, 15.94],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'y1'
            }
        ]
    };
}

/**
 * Genera dati per il grafico Ottimizzazioni Suggerite
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getOttimizzazioniSuggeriteData() {
    const labels = [
        'Gestione Magazzino', 
        'Redditività', 
        'Struttura Debito', 
        'Rafforzamento Patrimoniale', 
        'Controllo Gestione', 
        'Riposizionamento', 
        'Digitalizzazione'
    ];
    const data = [268000, 150000, 25000, 200000, 15000, 100000, 60000];
    const colors = [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(201, 203, 207, 0.7)'
    ];
    const borderColors = colors.map(color => color.replace('0.7', '1'));
    
    return {
        labels,
        datasets: [
            {
                label: 'Impatto Potenziale (€)',
                data,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1
            }
        ]
    };
}

/**
 * Genera dati per il grafico Scenario Post-Ottimizzazione
 * @returns {Object} Configurazione del dataset per Chart.js
 */
function getScenarioPostOttimizzazioneData() {
    return {
        labels: ['EBITDA', 'EBIT', 'Utile Netto', 'Cash Flow Op.', 'ROE', 'Ciclo Circolante', 'PFN'],
        datasets: [
            {
                label: 'Pre-Ottimizzazione',
                data: [-43535, -92982, -149177, 211345, -31.10, 167, 919610],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Post-Ottimizzazione (Min)',
                data: [150000, 100000, 50000, 300000, 7.0, 110, 650000],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Post-Ottimizzazione (Max)',
                data: [200000, 140000, 80000, 350000, 11.0, 90, 500000],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };
}