/**
 * SCAN - Data Manager
 * Gestisce il caricamento centralizzato di tutti i dati JSON
 * Versione 2.0 - Architettura modulare separata dai dati
 */

class DataManager {
    constructor() {
        this.data = {
            company: null,
            config: null,
            kpis: null,
            charts: null,
            tables: null,
            content: null
        };
        this.loaded = false;
        this.loading = false;
        this.loadPromise = null;
    }

    /**
     * Carica tutti i file JSON in parallelo
     * @returns {Promise<Object>} Promise che si risolve con tutti i dati caricati
     */
    async loadAll() {
        // Se già in caricamento, ritorna la promise esistente
        if (this.loading && this.loadPromise) {
            return this.loadPromise;
        }

        // Se già caricato, ritorna i dati
        if (this.loaded) {
            return this.data;
        }

        this.loading = true;

        this.loadPromise = Promise.all([
            this.loadJSON('data/company.json'),
            this.loadJSON('data/config.json'),
            this.loadJSON('data/kpis.json'),
            this.loadJSON('data/charts.json'),
            this.loadJSON('data/tables.json'),
            this.loadJSON('data/content.json')
        ])
        .then(([company, config, kpis, charts, tables, content]) => {
            this.data = { company, config, kpis, charts, tables, content };
            this.loaded = true;
            this.loading = false;
            console.log('✅ DataManager: Tutti i dati caricati con successo');
            return this.data;
        })
        .catch(error => {
            this.loading = false;
            console.error('❌ DataManager: Errore nel caricamento dei dati', error);
            throw error;
        });

        return this.loadPromise;
    }

    /**
     * Carica un singolo file JSON
     * @param {string} url - URL del file JSON
     * @returns {Promise<Object>} Promise con i dati del file
     */
    async loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${url}`);
            }
            const data = await response.json();
            console.log(`✅ Caricato: ${url}`);
            return data;
        } catch (error) {
            console.error(`❌ Errore caricando ${url}:`, error);
            throw error;
        }
    }

    // =============================================
    // METODI HELPER PER ACCEDERE AI DATI
    // =============================================

    /**
     * Verifica se i dati sono stati caricati
     * @returns {boolean} true se i dati sono caricati
     */
    isLoaded() {
        return this.loaded;
    }

    /**
     * Ottiene i dati completi dell'azienda
     * @returns {Object|null} Oggetto con i dati aziendali
     */
    getCompany() {
        return this.data.company;
    }

    /**
     * Ottiene il nome dell'azienda
     * @returns {string|null} Nome dell'azienda
     */
    getCompanyName() {
        return this.data.company?.name || null;
    }

    /**
     * Ottiene il nome breve dell'azienda
     * @returns {string|null} Nome breve
     */
    getCompanyShortName() {
        return this.data.company?.shortName || null;
    }

    /**
     * Ottiene il profilo completo dell'azienda
     * @returns {Object|null} Profilo aziendale
     */
    getCompanyProfile() {
        return this.data.company?.profile || null;
    }

    /**
     * Ottiene la configurazione completa
     * @returns {Object|null} Configurazione
     */
    getConfig() {
        return this.data.config;
    }

    /**
     * Ottiene i colori del tema
     * @returns {Object|null} Oggetto con i colori
     */
    getThemeColors() {
        return this.data.config?.theme?.colors || null;
    }

    /**
     * Ottiene i benchmark configurati
     * @returns {Object|null} Oggetto con i benchmark
     */
    getBenchmarks() {
        return this.data.config?.benchmarks || null;
    }

    /**
     * Ottiene le soglie di alert
     * @returns {Object|null} Oggetto con le soglie
     */
    getThresholds() {
        return this.data.config?.thresholds || null;
    }

    /**
     * Ottiene un singolo KPI
     * @param {string} key - Chiave del KPI (es: 'irp', 'revenue')
     * @returns {Object|null} Dati del KPI
     */
    getKPI(key) {
        return this.data.kpis?.[key] || null;
    }

    /**
     * Ottiene tutti i KPI
     * @returns {Object|null} Oggetto con tutti i KPI
     */
    getAllKPIs() {
        return this.data.kpis;
    }

    /**
     * Ottiene i dati per un grafico specifico
     * @param {string} section - Sezione (es: 'dashboard', 'reports')
     * @param {string} chartId - ID del grafico
     * @returns {Object|null} Dati del grafico
     */
    getChartData(section, chartId) {
        return this.data.charts?.[section]?.[chartId] || null;
    }

    /**
     * Ottiene i dati dei grafici della dashboard
     * @returns {Object|null} Grafici dashboard
     */
    getDashboardCharts() {
        return this.data.charts?.dashboard || null;
    }

    /**
     * Ottiene i dati dei grafici di un report specifico
     * @param {string} reportKey - Chiave del report (es: 'parte1', 'parte2')
     * @returns {Object|null} Grafici del report
     */
    getReportCharts(reportKey) {
        return this.data.charts?.reports?.[reportKey] || null;
    }

    /**
     * Ottiene una tabella specifica
     * @param {string} section - Sezione (es: 'parte1_sintesi', 'parte2_economico')
     * @param {string} tableId - ID della tabella
     * @returns {Object|null} Dati della tabella
     */
    getTable(section, tableId) {
        return this.data.tables?.[section]?.[tableId] || null;
    }

    /**
     * Ottiene tutte le tabelle di una sezione
     * @param {string} section - Sezione
     * @returns {Object|null} Tutte le tabelle della sezione
     */
    getSectionTables(section) {
        return this.data.tables?.[section] || null;
    }

    /**
     * Ottiene tutti i dati delle tabelle
     * @returns {Object|null} Tutte le tabelle
     */
    getAllTables() {
        return this.data.tables;
    }

    // =============================================
    // METODI CONTENT
    // =============================================

    /**
     * Ottiene un contenuto testuale
     * @param {string} section - Sezione (es: 'parte1_sintesi', 'parte2_economico')
     * @param {string} contentKey - Chiave del contenuto (es: 'irpDescription', 'businessModel')
     * @returns {string|Object|null} Contenuto testuale
     */
    getContent(section, contentKey) {
        return this.data.content?.[section]?.[contentKey] || null;
    }

    /**
     * Ottiene tutti i contenuti di una sezione
     * @param {string} section - Sezione
     * @returns {Object|null} Tutti i contenuti della sezione
     */
    getSectionContent(section) {
        return this.data.content?.[section] || null;
    }

    /**
     * Ottiene tutti i dati dei contenuti
     * @returns {Object|null} Tutti i contenuti
     */
    getAllContent() {
        return this.data.content;
    }

    // =============================================
    // METODI UTILITY
    // =============================================

    /**
     * Formatta un valore numerico come valuta
     * @param {number} value - Valore da formattare
     * @param {number} decimals - Numero di decimali
     * @returns {string} Valore formattato
     */
    formatCurrency(value, decimals = 0) {
        if (value === null || value === undefined) return 'N/D';

        const absValue = Math.abs(value);
        const sign = value < 0 ? '-' : '';

        if (absValue >= 1000000) {
            return `${sign}€ ${(absValue / 1000000).toFixed(2)} M`;
        } else if (absValue >= 1000) {
            return `${sign}€ ${(absValue / 1000).toFixed(decimals)} K`;
        } else {
            return `${sign}€ ${absValue.toLocaleString('it-IT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
        }
    }

    /**
     * Formatta un valore come percentuale
     * @param {number} value - Valore da formattare
     * @param {number} decimals - Numero di decimali
     * @returns {string} Valore formattato
     */
    formatPercentage(value, decimals = 2) {
        if (value === null || value === undefined) return 'N/D';
        return `${value.toFixed(decimals)}%`;
    }

    /**
     * Ottiene una classe CSS per uno status
     * @param {string} status - Status (danger, warning, success, info)
     * @returns {string} Classe CSS
     */
    getStatusClass(status) {
        const statusMap = {
            'danger': 'text-danger',
            'warning': 'text-warning',
            'success': 'text-success',
            'info': 'text-info',
            'primary': 'text-primary',
            'secondary': 'text-secondary'
        };
        return statusMap[status] || '';
    }

    /**
     * Ottiene un'icona per il trend
     * @param {string} direction - Direzione (up, down, none)
     * @returns {string} Classe icona FontAwesome
     */
    getTrendIcon(direction) {
        const iconMap = {
            'up': 'fa-arrow-up',
            'down': 'fa-arrow-down',
            'none': 'fa-minus'
        };
        return iconMap[direction] || 'fa-minus';
    }

    /**
     * Valida se un valore è critico rispetto a una soglia
     * @param {number} value - Valore da valutare
     * @param {number} threshold - Soglia
     * @param {string} compareType - Tipo di comparazione ('gt' = greater than, 'lt' = less than)
     * @returns {boolean} true se il valore è critico
     */
    isCritical(value, threshold, compareType = 'gt') {
        if (value === null || value === undefined || threshold === null || threshold === undefined) {
            return false;
        }

        if (compareType === 'gt') {
            return value > threshold;
        } else if (compareType === 'lt') {
            return value < threshold;
        }

        return false;
    }
}

// =============================================
// ESPORTAZIONE E INIZIALIZZAZIONE GLOBALE
// =============================================

// Crea un'istanza globale
if (typeof window !== 'undefined') {
    window.dataManager = new DataManager();
    console.log('✅ DataManager istanziato e disponibile globalmente come window.dataManager');
}

// Export per moduli ES6 (se supportati)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
