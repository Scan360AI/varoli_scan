// charts_config.js

/**
 * Configurazione dei grafici per la dashboard finanziaria di VAROLI GUIDO E FIGLIO S.R.L.
 * Questo file contiene funzioni che generano configurazioni per Chart.js
 * basate sui dati finanziari dell'azienda per il periodo 2022-2024.
 */

// Costanti per colori ricorrenti per mantenere coerenza visiva
const COLORS = {
    blue: {
        primary: 'rgba(54, 162, 235, 1)',
        secondary: 'rgba(54, 162, 235, 0.5)',
        light: 'rgba(54, 162, 235, 0.2)',
        transparent: 'rgba(54, 162, 235, 0.7)'
    },
    red: {
        primary: 'rgba(255, 99, 132, 1)',
        secondary: 'rgba(255, 99, 132, 0.5)',
        light: 'rgba(255, 99, 132, 0.2)',
        transparent: 'rgba(255, 99, 132, 0.7)'
    },
    green: {
        primary: 'rgba(75, 192, 192, 1)',
        secondary: 'rgba(75, 192, 192, 0.5)',
        light: 'rgba(75, 192, 192, 0.2)',
        transparent: 'rgba(75, 192, 192, 0.7)'
    },
    yellow: {
        primary: 'rgba(255, 206, 86, 1)',
        secondary: 'rgba(255, 206, 86, 0.5)',
        transparent: 'rgba(255, 206, 86, 0.7)'
    },
    purple: {
        primary: 'rgba(153, 102, 255, 1)',
        secondary: 'rgba(153, 102, 255, 0.5)',
        transparent: 'rgba(153, 102, 255, 0.7)'
    },
    orange: {
        primary: 'rgba(255, 159, 64, 1)',
        secondary: 'rgba(255, 159, 64, 0.7)'
    },
    gray: {
        primary: 'rgba(201, 203, 207, 1)',
        secondary: 'rgba(201, 203, 207, 0.7)'
    }
};

// Dati finanziari aziendali - centralizzati per facilitare aggiornamenti
const FINANCIAL_DATA = {
    years: ['2022', '2023', '2024', '2025', '2026', '2027', '2028'],
    ricavi: [3722214, 3324256, 2849913, 2992409, 3142029, 3299130, 3464087],
    ebitda: [196510, 213142, -43535, 81318, 255988, 284034, 288625],
    ebitdaMargin: [5.3, 6.4, -1.53, 2.72, 8.15, 8.61, 8.33],
    pfn: [412601, 336819, 919610],
    pfnEbitda: [2.10, 1.58, null], // Null per 2024 perché EBITDA negativo
    dso: [59, 55, 41],
    dpo: [73, 67, 68],
    dio: [159, 186, 194],
    cicloCir: [145, 174, 167],
    irp: [65.3, 60.1, 54.12],
    roi: [14.96, 17.52, -6.65],
    roe: [19.18, 17.65, -31.10],
    ros: [4.6, 6.1, -3.3],
    attivoFisso: [142832, 116459, 854485],
    attivoCircolante: [2424962, 2172485, 1959547],
    patrimonioNetto: [554291, 648843, 479666],
    passivita: [2013503, 1640101, 2334366],
    cashFlowOperativo: [-125524, 96543, 211345, 81318, 255988, 284034, 288625],
    cashFlowInvestimenti: [-10955, -761, -774136],
    variazioneNettaCassa: [33976, -132863, 183808],
    liquidita: [304498, 171635, 355443, 231307, 350326, 543048, 770797],
    liquiditaRicavi: [8.18, 5.16, 12.47, 7.73, 11.15, 16.46, 22.25],
    ebit: [-92982],
    utileNetto: [-149177]
};

// Funzione per generare dati per il grafico Trend Ricavi/EBITDA
function getTrendRicaviEbitdaData() {
    return {
        labels: FINANCIAL_DATA.years.slice(0, 3),
        datasets: [
            {
                type: 'bar',
                label: 'Ricavi',
                data: FINANCIAL_DATA.ricavi.slice(0, 3),
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                type: 'bar',
                label: 'EBITDA',
                data: FINANCIAL_DATA.ebitda.slice(0, 3),
                backgroundColor: COLORS.green.secondary,
                borderColor: COLORS.green.primary,
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                type: 'line',
                label: 'EBITDA Margin %',
                data: FINANCIAL_DATA.ebitdaMargin.slice(0, 3),
                borderColor: COLORS.red.primary,
                backgroundColor: COLORS.red.light,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: COLORS.red.primary,
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };
}

// Funzione per generare dati per il grafico Trend PFN/EBITDA
function getTrendPfnEbitdaData() {
    return {
        labels: FINANCIAL_DATA.years.slice(0, 3),
        datasets: [
            {
                label: 'PFN/EBITDA',
                data: FINANCIAL_DATA.pfnEbitda,
                borderColor: COLORS.blue.primary,
                backgroundColor: COLORS.blue.light,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: COLORS.blue.primary,
                fill: false
            },
            {
                label: 'Soglia di Sicurezza',
                data: [3, 3, 3],
                borderColor: COLORS.red.primary,
                backgroundColor: COLORS.red.light,
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false
            }
        ]
    };
}

// Funzione per generare dati per il grafico Ciclo del Circolante
function getCicloCirData() {
    return {
        labels: FINANCIAL_DATA.years.slice(0, 3),
        datasets: [
            {
                label: 'DSO (Giorni Crediti)',
                data: FINANCIAL_DATA.dso,
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1
            },
            {
                label: 'DPO (Giorni Debiti)',
                data: FINANCIAL_DATA.dpo,
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1
            },
            {
                label: 'DIO (Giorni Magazzino)',
                data: FINANCIAL_DATA.dio,
                backgroundColor: COLORS.purple.secondary,
                borderColor: COLORS.purple.primary,
                borderWidth: 1
            },
            {
                label: 'Ciclo del Circolante',
                data: FINANCIAL_DATA.cicloCir,
                backgroundColor: COLORS.green.secondary,
                borderColor: COLORS.green.primary,
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Indice di Rischio Ponderato (IRP)
function getIRPData() {
    return {
        labels: FINANCIAL_DATA.years.slice(0, 3),
        datasets: [
            {
                label: 'IRP',
                data: FINANCIAL_DATA.irp,
                borderColor: COLORS.green.primary,
                backgroundColor: COLORS.green.light,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: COLORS.green.primary,
                fill: true
            }
        ]
    };
}

// Funzioni per la dashboard - riutilizzano le funzioni principali
function getTrendRicaviEbitdaData_Dashboard() {
    return getTrendRicaviEbitdaData();
}

function getTrendPfnEbitdaData_Dashboard() {
    return getTrendPfnEbitdaData();
}

function getCicloCirData_Dashboard() {
    return getCicloCirData();
}

function getIRPData_Dashboard() {
    return getIRPData();
}

// Funzione per generare dati per il grafico Composizione Ricavi
function getComposizioneRicaviData() {
    return {
        labels: ['Commercio legname', 'Semilavorati in legno', 'Legno artificiale'],
        datasets: [
            {
                data: [65, 25, 10],
                backgroundColor: [
                    COLORS.blue.transparent,
                    COLORS.yellow.transparent,
                    COLORS.green.transparent
                ],
                borderColor: [
                    COLORS.blue.primary,
                    COLORS.yellow.primary,
                    COLORS.green.primary
                ],
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Composizione Costi
function getComposizioneCostiData() {
    return {
        labels: ['Acquisti e consumi', 'Costi variabili', 'Costi fissi', 'Ammortamenti', 'Oneri finanziari'],
        datasets: [
            {
                data: [77.0, 14.4, 10.1, 1.7, 2.5],
                backgroundColor: [
                    COLORS.blue.transparent,
                    COLORS.red.transparent,
                    COLORS.green.transparent,
                    COLORS.yellow.transparent,
                    COLORS.purple.transparent
                ],
                borderColor: [
                    COLORS.blue.primary,
                    COLORS.red.primary,
                    COLORS.green.primary,
                    COLORS.yellow.primary,
                    COLORS.purple.primary
                ],
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Indici di Redditività
function getIndiciRedditData() {
    return {
        labels: ['ROI', 'ROE', 'ROS'],
        datasets: [
            {
                label: '2022',
                data: FINANCIAL_DATA.roi.slice(0, 1).concat(FINANCIAL_DATA.roe.slice(0, 1), FINANCIAL_DATA.ros.slice(0, 1)),
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1
            },
            {
                label: '2023',
                data: FINANCIAL_DATA.roi.slice(1, 2).concat(FINANCIAL_DATA.roe.slice(1, 2), FINANCIAL_DATA.ros.slice(1, 2)),
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1
            },
            {
                label: '2024',
                data: FINANCIAL_DATA.roi.slice(2, 3).concat(FINANCIAL_DATA.roe.slice(2, 3), FINANCIAL_DATA.ros.slice(2, 3)),
                backgroundColor: COLORS.green.secondary,
                borderColor: COLORS.green.primary,
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Struttura Patrimoniale
function getStrutturaPatrimonialeData() {
    return {
        labels: FINANCIAL_DATA.years.slice(0, 3),
        datasets: [
            {
                label: 'Attivo Fisso',
                data: FINANCIAL_DATA.attivoFisso,
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1,
                stack: 'Stack 0'
            },
            {
                label: 'Attivo Circolante',
                data: FINANCIAL_DATA.attivoCircolante,
                backgroundColor: COLORS.green.secondary,
                borderColor: COLORS.green.primary,
                borderWidth: 1,
                stack: 'Stack 0'
            },
            {
                label: 'Patrimonio Netto',
                data: FINANCIAL_DATA.patrimonioNetto,
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1,
                stack: 'Stack 1'
            },
            {
                label: 'Passività',
                data: FINANCIAL_DATA.passivita,
                backgroundColor: COLORS.yellow.secondary,
                borderColor: COLORS.yellow.primary,
                borderWidth: 1,
                stack: 'Stack 1'
            }
        ]
    };
}

// Funzione per generare dati per il grafico Cash Flow
function getCashFlowData() {
    return {
        labels: FINANCIAL_DATA.years.slice(0, 3),
        datasets: [
            {
                label: 'Cash Flow Operativo',
                data: FINANCIAL_DATA.cashFlowOperativo.slice(0, 3),
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1
            },
            {
                label: 'Cash Flow Investimenti',
                data: FINANCIAL_DATA.cashFlowInvestimenti,
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1
            },
            {
                label: 'Variazione Netta di Cassa',
                data: FINANCIAL_DATA.variazioneNettaCassa,
                backgroundColor: COLORS.green.secondary,
                borderColor: COLORS.green.primary,
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Componenti IRP
function getComponentiIRPData() {
    return {
        labels: ['Coefficiente di Ponderazione', 'Leanus Score', 'Rating MCC', 'Z-Score Altman'],
        datasets: [
            {
                label: 'Punteggio',
                data: [52.00, 54.70, 46.20, 70.40],
                backgroundColor: [
                    COLORS.blue.transparent,
                    COLORS.red.transparent,
                    COLORS.green.transparent,
                    COLORS.yellow.transparent
                ],
                borderColor: [
                    COLORS.blue.primary,
                    COLORS.red.primary,
                    COLORS.green.primary,
                    COLORS.yellow.primary
                ],
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Indicatori Component Score
function getIndicatoriCSData() {
    return {
        labels: ['PFN/EBITDA', 'EBIT/OF', 'Ciclo Circolante', 'EBITDA/Ricavi', 'Copertura AF', 'DSCR'],
        datasets: [
            {
                label: 'Punteggio',
                data: [100, 10, 10, 10, 80, 100],
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1
            },
            {
                label: 'Peso',
                data: [25, 20, 15, 15, 15, 10],
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Benchmark Settoriale
function getBenchmarkSettorialeData() {
    return {
        labels: ['EBITDA Margin', 'ROI', 'ROE', 'PFN/EBITDA', 'Giorni Clienti', 'Giorni Fornitori', 'Giorni Magazzino'],
        datasets: [
            {
                label: 'VAROLI GUIDO E FIGLIO S.R.L.',
                data: [-1.53, -6.65, -31.10, null, 41, 68, 194],
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1
            },
            {
                label: 'Media Settore',
                data: [5.0, 8.0, 10.0, 3.0, 60, 70, 90],
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Proiezioni Finanziarie
function getProiezioniFinanziarieData() {
    return {
        labels: FINANCIAL_DATA.years.slice(0, 5),
        datasets: [
            {
                label: 'Ricavi',
                data: FINANCIAL_DATA.ricavi.slice(0, 5),
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                label: 'EBITDA',
                data: FINANCIAL_DATA.ebitda.slice(0, 5),
                backgroundColor: COLORS.green.secondary,
                borderColor: COLORS.green.primary,
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                label: 'Cash Flow Operativo',
                data: FINANCIAL_DATA.cashFlowOperativo.slice(0, 5),
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1,
                yAxisID: 'y'
            }
        ]
    };
}

// Funzione per generare dati per il grafico Stress Test
function getStressTestData() {
    return {
        labels: ['Variazione Ricavi', 'Variazione Costi Fissi', 'Variazione Crediti', 'Variazione Debiti', 'Variazione Rimanenze'],
        datasets: [
            {
                label: 'Valore Critico',
                data: [38.12, -32.35, 46, -50, -78],
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1
            },
            {
                label: 'Valore Attuale',
                data: [-14.27, 0, 41, 68, 194],
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Indicatori CCII
function getIndicatoriCCIIData() {
    return {
        labels: ['OF/Ricavi', 'PN/Debiti', 'Attivo/Passivo Corrente', 'Cash Flow/Attivo', 'Debiti Prev./Attivo'],
        datasets: [
            {
                label: 'Valore Attuale',
                data: [2.36, 22.30, 116.53, -3.94, 5.21],
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1
            },
            {
                label: 'Soglia di Allerta',
                data: [2.1, 4.4, 90.6, 0.5, 3.0],
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Capacità di Indebitamento
function getCapacitaIndebitamentoData() {
    return {
        labels: ['PFN Attuale', 'Capacità Teorica (3.0x)', 'Capacità Incrementale', 'Fido Consigliato'],
        datasets: [
            {
                label: 'Importo (€)',
                data: [919610, 0, 0, 0],
                backgroundColor: [
                    COLORS.red.transparent,
                    COLORS.blue.transparent,
                    COLORS.green.transparent,
                    COLORS.yellow.transparent
                ],
                borderColor: [
                    COLORS.red.primary,
                    COLORS.blue.primary,
                    COLORS.green.primary,
                    COLORS.yellow.primary
                ],
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Evoluzione Liquidità
function getEvoluzioneGiacenzaData() {
    return {
        labels: FINANCIAL_DATA.years,
        datasets: [
            {
                label: 'Liquidità',
                data: FINANCIAL_DATA.liquidita,
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1,
                fill: true
            },
            {
                label: 'Liquidità/Ricavi',
                data: FINANCIAL_DATA.liquiditaRicavi,
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1,
                yAxisID: 'y1'
            }
        ]
    };
}

// Funzione per generare dati per il grafico Ottimizzazioni Suggerite
function getOttimizzazioniSuggeriteData() {
    return {
        labels: ['Redditività Operativa', 'Gestione Magazzino', 'Struttura Finanziaria', 'Controllo di Gestione', 'Modello di Business', 'Rafforzamento Patrimoniale', 'Dismissione Asset'],
        datasets: [
            {
                label: 'Impatto Potenziale (€)',
                data: [160000, 450000, 35000, 25000, 100000, 250000, 200000],
                backgroundColor: [
                    COLORS.blue.transparent,
                    COLORS.red.transparent,
                    COLORS.green.transparent,
                    COLORS.yellow.transparent,
                    COLORS.purple.transparent,
                    COLORS.orange.secondary,
                    COLORS.gray.secondary
                ],
                borderColor: [
                    COLORS.blue.primary,
                    COLORS.red.primary,
                    COLORS.green.primary,
                    COLORS.yellow.primary,
                    COLORS.purple.primary,
                    COLORS.orange.primary,
                    COLORS.gray.primary
                ],
                borderWidth: 1
            }
        ]
    };
}

// Funzione per generare dati per il grafico Scenario Post-Ottimizzazione
function getScenarioPostOttimizzazioneData() {
    // Valori pre-ottimizzazione
    const preOttimizzazione = [
        FINANCIAL_DATA.ebitda[2],
        FINANCIAL_DATA.ebit[0],
        FINANCIAL_DATA.utileNetto[0],
        FINANCIAL_DATA.cashFlowOperativo[2],
        FINANCIAL_DATA.roe[2],
        FINANCIAL_DATA.cicloCir[2],
        FINANCIAL_DATA.liquidita[2],
        FINANCIAL_DATA.irp[2]
    ];
    
    return {
        labels: ['EBITDA', 'EBIT', 'Utile Netto', 'Cash Flow Op.', 'ROE', 'Ciclo Circolante', 'Liquidità', 'IRP'],
        datasets: [
            {
                label: 'Pre-ottimizzazione',
                data: preOttimizzazione,
                backgroundColor: COLORS.red.secondary,
                borderColor: COLORS.red.primary,
                borderWidth: 1
            },
            {
                label: 'Post-ottimizzazione (Min)',
                data: [130000, 80000, 15000, 280000, 3.00, 120, 450000, 65.00],
                backgroundColor: COLORS.blue.secondary,
                borderColor: COLORS.blue.primary,
                borderWidth: 1
            },
            {
                label: 'Post-ottimizzazione (Max)',
                data: [160000, 110000, 40000, 320000, 8.00, 110, 500000, 70.00],
                backgroundColor: COLORS.green.secondary,
                borderColor: COLORS.green.primary,
                borderWidth: 1
            }
        ]
    };
}