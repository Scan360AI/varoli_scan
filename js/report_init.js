/**
 * SCAN - Initializzazione Grafici Report Dettagliati (report/parteX_*.html)
 * 
 * Questo script gestisce l'inizializzazione di tutti i grafici presenti nei report dettagliati.
 * Utilizza Chart.js e funzioni di configurazione definite in charts_config.js.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Inizializzazione grafici report (se presenti)...");
    
    // Mappa di configurazione dei grafici per migliorare manutenibilità e ridurre duplicazione
    const chartConfigs = {
        // --- PARTE 1: Sintesi ---
        'mainMetricsChart': {
            type: 'bar',
            dataFn: getMainMetricsData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Valori in €000' }, 
                        ticks: { callback: (v) => v.toLocaleString('it-IT') } 
                    } 
                },
                plugins: { title: { display: true, text: 'Evoluzione Ricavi, EBITDA e Patrimonio Netto' } }
            }
        },
        'currentAssetsLiabilitiesChart': {
            type: 'bar',
            dataFn: getCurrentAssetsLiabilitiesData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Valore (€)' }, 
                        ticks: { callback: (v) => formatCurrency(v) } 
                    } 
                },
                plugins: { title: { display: true, text: 'Andamento Attivo e Passivo Corrente' } }
            }
        },
        
        // --- PARTE 2: Economico ---
        'economicTrendChart': {
            type: 'bar', // Tipo base, i dataset possono specificare tipi diversi
            dataFn: getEconomicTrendData,
            options: {
                scales: {
                    y: { 
                        title: { display: true, text: 'Valori in €000' }, 
                        ticks: { callback: (v) => v.toLocaleString('it-IT') } 
                    },
                    y1: { 
                        position: 'right', 
                        title: { display: true, text: 'EBITDA %' }, 
                        grid: { drawOnChartArea: false }, 
                        suggestedMin: 0, 
                        suggestedMax: 15, 
                        ticks: { callback: (v) => `${v}%` } 
                    }
                },
                plugins: { title: { display: true, text: 'Andamento Ricavi ed EBITDA 2022-2024' } }
            }
        },
        'marginalityChart': {
            type: 'line',
            dataFn: getMarginalityData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Percentuale sui Ricavi (%)' }, 
                        suggestedMax: 25, 
                        ticks: { callback: (v) => `${v}%` } 
                    } 
                },
                plugins: { title: { display: true, text: 'Evoluzione delle Marginalità' } }
            }
        },
        'profitabilityIndicesChart': {
            type: 'line',
            dataFn: getProfitabilityIndicesData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Percentuale (%)' }, 
                        suggestedMin: 0, 
                        suggestedMax: 40, 
                        ticks: { callback: (v) => `${v}%` } 
                    } 
                },
                plugins: { title: { display: true, text: 'Andamento Indici di Redditività' } }
            }
        },
        'leverageChart': {
            type: 'bar',
            dataFn: getLeverageData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Percentuale (%)' }, 
                        ticks: { callback: (v) => `${v}%` } 
                    } 
                },
                plugins: { title: { display: true, text: 'Confronto ROI vs ROE' } }
            }
        },
        
        // --- PARTE 3: Patrimoniale ---
        'assetsChart': {
            type: 'pie',
            dataFn: getAssetsData,
            options: pieChartOptions
        },
        'liabilitiesChart': {
            type: 'pie',
            dataFn: getLiabilitiesData,
            options: pieChartOptions
        },
        'investmentsStructureChart': {
            type: 'bar',
            dataFn: getInvestmentsStructureData,
            options: {
                scales: { 
                    x: { stacked: true }, 
                    y: { 
                        stacked: true, 
                        title: { display: true, text: 'Valori in Euro' }, 
                        ticks: { callback: (v) => formatCurrency(v) } 
                    } 
                },
                plugins: { title: { display: true, text: 'Evoluzione Struttura Investimenti' } }
            }
        },
        'equityCompositionChart': {
            type: 'doughnut',
            dataFn: getEquityCompositionData,
            options: doughnutChartOptions
        },
        'financialDebtChart': {
            type: 'doughnut',
            dataFn: getFinancialDebtData,
            options: doughnutChartOptions
        },
        'pfnTrendChart': {
            type: 'bar',
            dataFn: getPfnTrendData,
            options: {
                scales: { 
                    x: { stacked: true }, 
                    y: { 
                        stacked: true, 
                        title: { display: true, text: 'Valori in Euro' }, 
                        ticks: { callback: (v) => formatCurrency(v) } 
                    } 
                },
                plugins: { title: { display: true, text: 'Andamento Posizione Finanziaria Netta (Stack: Debiti vs Liquidità)' } }
            },
            preProcess: (data) => {
                // Modifica tipo per PFN in linea, sovrapposto a barre stacked
                data.datasets.forEach(ds => {
                    ds.type = ds.label === 'PFN' ? 'line' : 'bar';
                });
                return data;
            }
        },
        
        // --- PARTE 4: Bancabilità ---
        'debtSustainabilityChart': {
            type: 'radar',
            dataFn: getDebtSustainabilityData,
            options: radarChartOptions
        },
        'debtCostChart': {
            type: 'bar',
            dataFn: getDebtCostData,
            options: {
                scales: {
                    y: { 
                        type: 'linear', 
                        position: 'left', 
                        title: { display: true, text: 'Valore (€000)' }, 
                        ticks: { callback: (v) => v.toLocaleString('it-IT') } 
                    },
                    y1: { 
                        type: 'linear', 
                        position: 'right', 
                        title: { display: true, text: 'Capacità Teorica Indebitamento (€000)' }, 
                        grid: { drawOnChartArea: false }, 
                        suggestedMin: 0, 
                        ticks: { callback: (v) => v.toLocaleString('it-IT') } 
                    }
                },
                plugins: { title: { display: true, text: 'EBITDA e Capacità di Indebitamento' } }
            }
        },
        
        // --- PARTE 5: Circolante e Flussi ---
        'workingCapitalCycleChart': {
            type: 'bar',
            dataFn: getWorkingCapitalCycleData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Giorni' } 
                    } 
                },
                plugins: { title: { display: true, text: 'Ciclo del Capitale Circolante vs Benchmark' } }
            }
        },
        'cashFlowWaterfallChart': {
            type: 'bar',
            dataFn: getCashFlowWaterfallData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Euro' }, 
                        ticks: { callback: (v) => formatCurrency(v) } 
                    } 
                },
                plugins: { 
                    title: { display: true, text: 'Composizione Flussi di Cassa 2024' }, 
                    legend: { display: false } 
                }
            }
        },
        'cashFlowTrendChart': {
            type: 'line',
            dataFn: getCashFlowTrendData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Euro' }, 
                        ticks: { callback: (v) => formatCurrency(v) } 
                    } 
                },
                plugins: { title: { display: true, text: 'Evoluzione Flussi di Cassa' } }
            }
        },
        'cashFlowProjectionChart': {
            type: 'bar',
            dataFn: getCashFlowProjectionData,
            options: {
                scales: {
                    y: { 
                        type: 'linear', 
                        position: 'left', 
                        title: { display: true, text: 'Flussi (€)' }, 
                        ticks: { callback: (v) => formatCurrency(v) } 
                    },
                    y1: { 
                        type: 'linear', 
                        position: 'right', 
                        title: { display: true, text: 'Liquidità Finale (€)' }, 
                        grid: { drawOnChartArea: false }, 
                        ticks: { callback: (v) => formatCurrency(v) } 
                    }
                },
                plugins: { title: { display: true, text: 'Proiezioni Finanziarie 2024-2028' } }
            }
        },
        
        // --- PARTE 6: Rischi ---
        'zscoreChart': {
            type: 'line',
            dataFn: getZscoreData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Z-Score' }, 
                        suggestedMin: 0, 
                        suggestedMax: 4 
                    } 
                },
                plugins: { title: { display: true, text: 'Evoluzione Z-Score e Soglie di Riferimento' } }
            }
        },
        'riskIndicatorsChart': {
            type: 'radar',
            dataFn: getRiskIndicatorsData,
            options: radarChartOptions
        },
        'sensitivityChart': {
            type: 'bar',
            dataFn: getSensitivityData,
            options: {
                scales: { 
                    y: { 
                        title: { display: true, text: 'Variazione percentuale critica (%)' }, 
                        ticks: { callback: (v) => `${v}%` } 
                    } 
                },
                plugins: { title: { display: true, text: 'Analisi di Sensitività - Variazioni Critiche' } }
            }
        }
    };

    /**
     * Inizializza un grafico se l'elemento DOM esiste
     * @param {string} chartId - ID dell'elemento canvas
     * @returns {void}
     */
    const initializeChartIfExists = (chartId) => {
        const chartElement = document.getElementById(chartId);
        if (!chartElement) return;

        const config = chartConfigs[chartId];
        if (!config) {
            console.warn(`Configurazione mancante per il grafico: ${chartId}`);
            return;
        }

        try {
            // Ottieni i dati dalla funzione di configurazione
            let data = config.dataFn();
            
            // Applica eventuali pre-elaborazioni ai dati
            if (config.preProcess && typeof config.preProcess === 'function') {
                data = config.preProcess(data);
            }
            
            // Combina le opzioni specifiche con quelle comuni
            const options = {
                ...commonChartOptions,
                ...config.options,
                plugins: {
                    ...commonChartOptions.plugins,
                    ...(config.options.plugins || {})
                }
            };
            
            // Inizializza il grafico
            initChart(chartId, config.type, data, options);
        } catch (error) {
            console.error(`Errore nell'inizializzazione del grafico ${chartId}:`, error);
        }
    };

    // Inizializza tutti i grafici configurati
    Object.keys(chartConfigs).forEach(initializeChartIfExists);

    console.log("Inizializzazione grafici report completata (per elementi presenti).");
});