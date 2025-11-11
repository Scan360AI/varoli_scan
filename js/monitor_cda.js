// ======================================
// HELPER FUNCTIONS
// ======================================

/**
 * Formats a number as currency with Euro symbol
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted currency string
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
 * Formats a number as percentage with 1 decimal place
 * @param {number} value - The value to format
 * @returns {string} Formatted percentage string
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
 * Initializes or updates a chart
 * @param {string} canvasId - The ID of the canvas element
 * @param {string} type - Chart type (bar, line, etc.)
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Object|null} Chart instance or null if error
 */
function initChart(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas element with ID '${canvasId}' not found.`);
        return null;
    }
    const ctx = canvas.getContext('2d');

    // Clear previous chart instance if exists
    if (canvas.chartInstance) {
        try {
            canvas.chartInstance.destroy();
        } catch(e) { 
            console.warn(`Could not destroy previous chart instance for ${canvasId}: ${e}`); 
        }
    }

    if (!data || !data.labels || !data.datasets) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Errore: Dati non disponibili o malformati.', canvas.width / 2, canvas.height / 2);
        console.error(`Dati non validi forniti a initChart per ${canvasId}`);
        return null;
    }

    try {
        canvas.chartInstance = new Chart(ctx, {
            type,
            data,
            options
        });
        return canvas.chartInstance;
    } catch (error) {
        console.error(`Errore durante la creazione del grafico ${canvasId}:`, error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        const errorMessage = error.message.length > 100 ? error.message.substring(0, 97) + '...' : error.message;
        ctx.fillText(`Errore grafico: ${errorMessage}`, canvas.width / 2, canvas.height / 2);
        return null;
    }
}

/**
 * Formats tooltip labels based on dataset type
 * @param {Object} context - Chart.js tooltip context
 * @returns {string} Formatted label
 */
function formatTooltipLabel(context) {
    let label = context.dataset.label || context.label || '';
    if (label) label += ': ';
    let value = context.parsed.y;
    if (value === null || value === undefined) value = context.parsed.r;

    if (value !== null && value !== undefined) {
        const axisID = context.dataset.yAxisID;
        const labelText = context.label;
        const datasetLabel = context.dataset.label || '';

        // Determine format based on dataset label or axis
        if (datasetLabel.includes('%') || (axisID === 'y1' && context.chart.options.scales?.y1?.title?.text.includes('%'))) {
            label += formatPercentage(value);
        } else if (datasetLabel.includes('(gg)') || labelText?.includes('(gg)') || 
                  ['DSO', 'DIO', 'DPO', 'Ciclo Circolante'].some(term => datasetLabel.includes(term))) {
            label += value.toFixed(0) + ' gg';
        } else if (datasetLabel.includes('(x)') || labelText?.includes('(x)') || 
                  ['PFN/EBITDA', 'D/E', 'Z-Score'].some(term => datasetLabel.includes(term))) {
            label += value.toFixed(2) + (datasetLabel.includes('Z-Score') ? '' : 'x');
        } else if (datasetLabel.includes('Score') && !datasetLabel.includes('Z-Score')) {
            label += value.toFixed(2);
        } else if (datasetLabel.includes('Variazione Critica')) {
            label += value.toFixed(2) + (labelText.includes('(gg)') ? ' gg' : '%');
        } else if (Math.abs(value) >= 1000000) {
            label += formatCurrency(value / 1000000, 1) + ' M';
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

// ======================================
// CHART DATA (VAROLI GUIDO E FIGLIO S.R.L.)
// ======================================
const chartData = {
    trendRicaviEbitda: {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: "Ricavi (€)",
                data: [3722214, 3324256, 2849913],
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
                data: [196510, 213142, -43535],
                borderColor: 'rgb(77, 140, 87)',
                backgroundColor: 'rgba(77, 140, 87, 0.7)',
                type: 'bar', 
                yAxisID: 'y', 
                barPercentage: 0.6, 
                categoryPercentage: 0.7
            },
            {
                label: "EBITDA Margin (%)",
                data: [5.3, 6.4, -1.53],
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
    },
    trendPfnEbitda: {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: "ROE (%)",
                data: [19.18, 17.65, -31.10],
                borderColor: 'rgb(77, 140, 87)',
                backgroundColor: 'rgba(77, 140, 87, 0.2)',
                tension: 0.1, 
                fill: true, 
                pointRadius: 5, 
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(77, 140, 87)'
            },
            {
                label: "ROI (%)",
                data: [14.96, 17.52, -6.65],
                borderColor: 'rgb(217, 140, 0)',
                backgroundColor: 'rgba(217, 140, 0, 0.2)',
                tension: 0.1, 
                fill: true, 
                pointRadius: 5, 
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(217, 140, 0)'
            },
            {
                label: 'D/E (x)',
                data: [1.29, 0.78, 2.66],
                borderColor: 'rgb(74, 105, 189)',
                backgroundColor: 'rgba(74, 105, 189, 0.2)',
                tension: 0.1, 
                fill: true, 
                pointRadius: 5, 
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(74, 105, 189)'
            }
        ]
    },
    trendWorkingCapital: {
        labels: ['2022', '2023', '2024'],
        datasets: [
            { label: 'DSO', data: [59, 55, 41], borderColor: '#4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.2)', fill: false, tension: 0.1 },
            { label: 'DIO', data: [159, 186, 194], borderColor: '#FFC107', backgroundColor: 'rgba(255, 193, 7, 0.2)', fill: false, tension: 0.1 },
            { label: 'DPO', data: [73, 67, 68], borderColor: '#4a69bd', backgroundColor: 'rgba(74, 105, 189, 0.2)', fill: false, tension: 0.1 },
            { label: 'Ciclo Circolante', data: [145, 174, 167], borderColor: '#F44336', backgroundColor: 'rgba(244, 67, 54, 0.2)', fill: true, tension: 0.1, borderWidth: 2 }
        ]
    },
    trendCashFlowOp: {
        labels: ['2022', '2023', '2024'],
        datasets: [{
            label: 'Cash Flow Operativo / Ricavi (%)',
            data: [-3.4, 2.9, 7.42],
            borderColor: 'rgb(77, 140, 87)',
            backgroundColor: 'rgba(77, 140, 87, 0.2)',
            fill: true,
            tension: 0.1
        }]
    }
};

// ======================================
// CHART OPTIONS
// ======================================

/**
 * Common chart options used as base for all charts
 */
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
                label: formatTooltipLabel
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

// Specific options for Ricavi/EBITDA chart
const trendRicEbitdaOptionsCda = {
    ...commonChartOptions,
    scales: {
        y: {
            beginAtZero: true,
            title: { display: true, text: 'Valore (€)' },
            position: 'left',
            ticks: {
                callback: function(value) {
                    if (Math.abs(value) >= 1000000) return (value / 1000000).toFixed(1) + ' M';
                    if (Math.abs(value) >= 1000) return (value / 1000).toFixed(0) + ' K';
                    return value;
                }
            }
        },
        y1: {
            beginAtZero: false,
            title: { display: true, text: 'EBITDA Margin (%)' },
            position: 'right',
            grid: { drawOnChartArea: false },
            suggestedMin: -5,
            suggestedMax: 10,
            ticks: {
                callback: function(value) { return value.toFixed(1) + '%'; }
            }
        },
        x: { grid: { display: false } }
    },
    plugins: {
        ...commonChartOptions.plugins,
        title: { display: false }
    }
};

// Specific options for PFN/EBITDA chart
const trendPfnEbitdaOptionsCda = {
    ...commonChartOptions,
    scales: {
        y: {
            beginAtZero: false,
            suggestedMin: -35,
            suggestedMax: 25,
            title: { display: true, text: 'Valore (%)' }
        },
        x: { grid: { display: false } }
    },
    plugins: {
        ...commonChartOptions.plugins,
        title: { display: false }
    }
};

// Specific options for Working Capital chart
const trendWorkingCapitalOptionsCda = {
    ...commonChartOptions,
    scales: {
        y: {
            beginAtZero: false,
            suggestedMin: 0,
            suggestedMax: 200,
            title: { display: true, text: 'Giorni' }
        },
        x: { grid: { display: false } }
    },
    plugins: {
        ...commonChartOptions.plugins,
        title: { display: false }
    }
};

// Specific options for Cash Flow Op chart
const trendCashFlowOpOptionsCda = {
    ...commonChartOptions,
    scales: {
        y: {
            beginAtZero: false,
            title: { display: true, text: 'Cash Flow Operativo / Ricavi (%)' },
            ticks: {
                callback: function(value) { return value.toFixed(1) + '%'; }
            },
            suggestedMin: -5,
            suggestedMax: 10
        },
        x: { grid: { display: false } }
    },
    plugins: {
        ...commonChartOptions.plugins,
        title: { display: false }
    }
};

/**
 * Updates IRP display elements based on score
 * @param {number} irpScoreValue - The IRP score value
 * @param {Object} elements - DOM elements to update
 */
function updateIrpDisplay(irpScoreValue, elements) {
    // Default values for risk display
    let displayConfig = {
        badgeHeaderClass: 'bg-danger',
        circleClass: 'risk-high',
        categoryText: 'Elevato',
        categoryTextColor: 'text-danger',
        badgeClass: 'bg-danger',
        categoryBadgeText: 'D+',
        categoryBadgeTextColor: ''
    };

    // Update display configuration based on IRP score
    if (irpScoreValue >= 80) {
        displayConfig = {
            badgeHeaderClass: 'bg-success',
            circleClass: 'risk-low',
            categoryText: 'Basso',
            categoryTextColor: 'text-success',
            badgeClass: 'bg-success',
            categoryBadgeText: 'B+',
            categoryBadgeTextColor: ''
        };
    } else if (irpScoreValue >= 75) {
        displayConfig = {
            badgeHeaderClass: 'bg-success',
            circleClass: 'risk-low',
            categoryText: 'Moderato-Basso',
            categoryTextColor: 'text-success',
            badgeClass: 'bg-success',
            categoryBadgeText: 'B',
            categoryBadgeTextColor: ''
        };
    } else if (irpScoreValue >= 65) {
        displayConfig = {
            badgeHeaderClass: 'bg-warning',
            circleClass: 'risk-medium',
            categoryText: 'Moderato',
            categoryTextColor: 'text-warning',
            badgeClass: 'bg-warning',
            categoryBadgeText: 'C+',
            categoryBadgeTextColor: 'text-dark'
        };
    } else if (irpScoreValue >= 55) {
        displayConfig = {
            badgeHeaderClass: 'bg-warning',
            circleClass: 'risk-medium',
            categoryText: 'Medio-Alto',
            categoryTextColor: 'text-warning',
            badgeClass: 'bg-warning',
            categoryBadgeText: 'C',
            categoryBadgeTextColor: 'text-dark'
        };
    }

    // Update header badge
    if (elements.headerBadge) {
        elements.headerBadge.className = `badge ${displayConfig.badgeHeaderClass} me-3`;
        elements.headerBadge.textContent = `IRP: ${irpScoreValue.toFixed(1)}`;
    }

    // Update score circle
    if (elements.scoreCircle) {
        elements.scoreCircle.classList.remove('risk-low', 'risk-medium', 'risk-high');
        elements.scoreCircle.classList.add(displayConfig.circleClass);
    }

    // Update category text and badge
    if (elements.categoryTextElement && elements.categoryBadge) {
        elements.categoryTextElement.classList.remove('text-success', 'text-warning', 'text-danger');
        elements.categoryTextElement.textContent = '';
        elements.categoryTextElement.appendChild(document.createTextNode(`Rischio ${displayConfig.categoryText} `));
        elements.categoryTextElement.classList.add(displayConfig.categoryTextColor);
        
        elements.categoryBadge.className = `status-badge ${displayConfig.badgeClass}`;
        elements.categoryBadge.textContent = displayConfig.categoryBadgeText;
        
        if (displayConfig.categoryBadgeTextColor) {
            elements.categoryBadge.classList.add(displayConfig.categoryBadgeTextColor);
        } else {
            elements.categoryBadge.classList.remove('text-dark');
        }
        
        elements.categoryTextElement.appendChild(elements.categoryBadge);
    }
}

/**
 * Updates year elements in the document
 */
function updateYearElements() {
    const currentYear = new Date().getFullYear();
    const yearElements = [
        document.getElementById('currentYearSidebar'),
        document.getElementById('currentYearFooterReport')
    ];
    
    yearElements.forEach(element => {
        if (element) element.textContent = currentYear;
    });
}

// ======================================
// CHART INITIALIZATION LOGIC
// ======================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing CDA charts for VAROLI GUIDO E FIGLIO S.R.L.");

    // Initialize all charts
    const charts = [
        { id: 'trendRicaviEbitdaChart', type: 'bar', data: chartData.trendRicaviEbitda, options: trendRicEbitdaOptionsCda },
        { id: 'trendPfnEbitdaChart', type: 'line', data: chartData.trendPfnEbitda, options: trendPfnEbitdaOptionsCda },
        { id: 'trendWorkingCapitalChart', type: 'line', data: chartData.trendWorkingCapital, options: trendWorkingCapitalOptionsCda },
        { id: 'trendCashFlowOpChart', type: 'line', data: chartData.trendCashFlowOp, options: trendCashFlowOpOptionsCda }
    ];
    
    // Initialize each chart
    charts.forEach(chart => {
        initChart(chart.id, chart.type, chart.data, chart.options);
    });

    // Update year elements
    updateYearElements();

    // Set up IRP score display
    const irpScoreValue = 54.12; // VAROLI GUIDO E FIGLIO S.R.L. IRP score
    const irpElements = {
        headerBadge: document.getElementById('irp-header-badge'),
        scoreCircle: document.querySelector('.irp-score-circle'),
        categoryTextElement: document.querySelector('.irp-category-text'),
        categoryBadge: document.querySelector('.irp-category-text')?.querySelector('.status-badge')
    };

    // Update IRP display
    updateIrpDisplay(irpScoreValue, irpElements);

    // Define utility functions if not already defined
    if (typeof window.logout !== 'function') {
        window.logout = function() {
            console.log("Logout action triggered (placeholder)");
        };
    }
    
    if (typeof window.printDocument !== 'function') {
        window.printDocument = function() {
            window.print();
        };
    }

    console.log("CDA charts initialization complete.");
});