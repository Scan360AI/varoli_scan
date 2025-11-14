# 📊 SCAN - Sistema JSON Modulare

## Guida Completa alla Gestione Dati

**Versione:** 2.0
**Data:** 2025-11-14
**Obiettivo:** Separazione completa tra dati e struttura HTML/JS

---

## 🎯 Obiettivo del Refactoring

Il sistema è stato completamente refactorizzato per **separare i dati dalla struttura**. Ora tutti i dati aziendali, KPI, grafici e tabelle sono contenuti in file JSON facilmente modificabili.

### Vantaggi:
- ✅ **Cambio azienda in 5 minuti**: basta sostituire i JSON
- ✅ **Zero codice HTML/JS**: nessuna modifica ai file di presentazione
- ✅ **Manutenzione semplificata**: dati centralizzati e organizzati
- ✅ **Scalabile**: facile aggiungere nuovi KPI o grafici
- ✅ **Multi-tenant ready**: pronto per gestire più aziende

---

## 📁 Struttura File JSON

### `data/company.json` - Informazioni Azienda
**Dimensione:** ~50 righe
**Frequenza aggiornamento:** Raramente (solo cambio azienda)

```json
{
  "name": "NOME AZIENDA S.R.L.",
  "shortName": "AZIENDA",
  "logo": "assets/img/logo_scan.png",
  "fiscalYear": 2024,
  "lastUpdate": "2025-11-12",
  "profile": {
    "legalName": "NOME COMPLETO AZIENDA",
    "ateco": "46.83.10",
    "sector": "Settore di appartenenza",
    "founded": 1985,
    "employees": 9,
    ...
  },
  "authentication": {
    "username": "Admin",
    "password": "Admin2025"
  }
}
```

**Come aggiornare:**
1. Modifica `name`, `shortName`, `profile` con i dati della nuova azienda
2. Aggiorna `lastUpdate` con la data corrente
3. Sostituisci il logo in `assets/img/`

---

### `data/kpis.json` - KPI Dashboard
**Dimensione:** ~150 righe
**Frequenza aggiornamento:** Mensile/Trimestrale

```json
{
  "irp": {
    "title": "IRP - Indice Rischio",
    "value": 51.42,
    "displayValue": "51,42",
    "category": "D+",
    "status": "danger",
    "icon": "fa-shield-alt",
    "description": "Descrizione del KPI",
    "trend": {
      "direction": "down",
      "value": -7.93,
      "displayValue": "-7,93 p.p.",
      "label": "vs 2023"
    }
  },
  "revenue": {
    "value": 2850000,
    "displayValue": "€ 2,85 M",
    ...
  }
}
```

**KPI disponibili:** irp, revenue, ebitdaMargin, pfnEbitda, dso, cashFlowOperativo, leanusScore, azionePrioritaria

**Come aggiornare:**
1. Modifica solo il campo `value` con il nuovo valore numerico
2. Il `displayValue` può essere formattato come desideri
3. Aggiorna `trend.value` e `trend.direction` (up/down/none)
4. Cambia `status` (danger/warning/success) per il colore

---

### `data/charts.json` - Dati Grafici
**Dimensione:** ~400 righe
**Frequenza aggiornamento:** Mensile/Trimestrale

```json
{
  "dashboard": {
    "trendChart": {
      "labels": ["2022", "2023", "2024"],
      "datasets": {
        "revenue": {
          "data": [3722214, 3324256, 2849913]
        },
        "ebitdaMargin": {
          "data": [5.3, 6.4, -1.53]
        }
      }
    }
  },
  "reports": {
    "parte1": { ... },
    "parte2": { ... }
  }
}
```

**Grafici disponibili:**
- **Dashboard:** trendChart, pfnChart
- **Reports:** 18+ grafici suddivisi per sezione (parte1-parte6)

**Come aggiornare:**
1. Modifica array `labels` con gli anni/periodi
2. Aggiorna array `data` con i nuovi valori numerici
3. Mantieni la stessa lunghezza degli array (es: 3 anni = 3 valori)

---

### `data/tables.json` - Tabelle Report
**Dimensione:** ~700 righe (45+ tabelle)
**Frequenza aggiornamento:** Trimestrale/Annuale

```json
{
  "parte2_economico": {
    "contoEconomicoRiclassificato": {
      "headers": ["Voce", "2022", "% Ricavi 22", ...],
      "rows": [
        {
          "voce": "Ricavi",
          "2022": 3722214,
          "pct2022": 100.0,
          "2023": 3324256,
          "pct2023": 100.0,
          "2024": 2849913,
          "pct2024": 100.0,
          "var": -14.27,
          "highlight": false
        }
      ]
    }
  }
}
```

**Tabelle disponibili:** 45+ tabelle organizzate per sezione
- `parte1_sintesi`: SWOT, IRP, KPI overview
- `parte2_economico`: Conto economico, marginalità, benchmark
- `parte3_patrimoniale`: Stato patrimoniale, PFN, solidità
- `parte4_bancabilita`: Sostenibilità debito, CCII
- `parte5_circolante`: Ciclo circolante, cash flow
- `parte6_rischi`: Red flags, piano d'azione, dashboard KPI
- `irp_dettaglio`: Componenti IRP dettagliati

**Come aggiornare:**
1. Individua la tabella da modificare (es: `contoEconomicoRiclassificato`)
2. Aggiorna i valori numerici nell'array `rows`
3. Imposta `highlight: true` per righe importanti (EBITDA, totali, etc.)

---

### `data/config.json` - Configurazione
**Dimensione:** ~130 righe
**Frequenza aggiornamento:** Raramente (solo per soglie/benchmark)

```json
{
  "theme": {
    "colors": {
      "primary": { "main": "rgb(25, 25, 112)", ... }
    }
  },
  "benchmarks": {
    "ebitdaMargin": 2.5,
    "dso": 55,
    "pfnEbitda": 3.0,
    ...
  },
  "thresholds": {
    "irp": { "excellent": 70, "good": 60, ... },
    "zScore": { "safe": 2.99, "distress": 1.81 }
  }
}
```

**Come aggiornare:**
1. Modifica i `benchmarks` per cambiare i valori di riferimento settoriali
2. Aggiorna le `thresholds` per cambiare le soglie di alert
3. **NON modificare** `theme.colors` se non necessario (mantiene coerenza visiva)

---

## 🔧 Come Funziona il Sistema

### 1. Caricamento Automatico

All'apertura della dashboard, il sistema:
1. Carica tutti i 5 file JSON in parallelo (tramite `data-manager.js`)
2. Popola automaticamente i KPI cards
3. Renderizza i grafici con i dati JSON
4. Aggiorna il nome azienda in tutti i punti

### 2. Data Manager

Il file `js/data-manager.js` fornisce un'interfaccia unica per accedere ai dati:

```javascript
// Esempio di utilizzo
const companyName = window.dataManager.getCompanyName();
const irpKPI = window.dataManager.getKPI('irp');
const trendData = window.dataManager.getChartData('dashboard', 'trendChart');
const contoEconomico = window.dataManager.getTable('parte2_economico', 'contoEconomicoRiclassificato');
```

### 3. Helper Methods

Il Data Manager include metodi utility:
- `formatCurrency(value)` - Formatta € con K/M
- `formatPercentage(value)` - Formatta percentuali
- `getThemeColors()` - Ottiene colori tema
- `getBenchmarks()` - Ottiene benchmark settoriali
- `isLoaded()` - Verifica caricamento completato

---

## 🔄 Procedura Cambio Azienda

### Passo 1: Backup
```bash
cp -r data/ data_backup_$(date +%Y%m%d)/
```

### Passo 2: Aggiorna company.json
- Nome azienda
- Profilo (settore, ATECO, dipendenti, etc.)
- Logo (sostituire file in `assets/img/`)

### Passo 3: Aggiorna kpis.json
- 8 KPI con i nuovi valori
- Trend e descrizioni

### Passo 4: Aggiorna charts.json
- Dati grafici dashboard (2 grafici)
- Dati grafici reports (18+ grafici)

### Passo 5: Aggiorna tables.json
- 45+ tabelle con tutti i dati finanziari

### Passo 6: Verifica
- Apri `dashboard.html` nel browser
- Controlla console JavaScript (F12) per errori
- Verifica che tutti i dati siano aggiornati

**Tempo stimato:** 30-60 minuti per cambio completo

---

## 🐛 Troubleshooting

### Errore: "Failed to fetch data/..."
**Causa:** File JSON non trovato o sintassi errata
**Soluzione:**
1. Verifica che il file esista in `data/`
2. Valida la sintassi JSON su jsonlint.com
3. Controlla i permessi file (lettura)

### Grafico non visualizzato
**Causa:** Dati mancanti o formato errato
**Soluzione:**
1. Apri console browser (F12)
2. Cerca errori nel log
3. Verifica che `labels` e `data` abbiano la stessa lunghezza
4. Controlla che i valori siano numerici (non stringhe)

### KPI non aggiornati
**Causa:** Cache browser
**Soluzione:**
1. Hard refresh: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)
2. Svuota cache browser
3. Verifica che il file JSON sia stato modificato

---

## 📊 Checklist Aggiornamento Dati

- [ ] Backup dati precedenti
- [ ] Aggiornato `company.json` (nome, profilo, date)
- [ ] Aggiornato `kpis.json` (8 KPI + trend)
- [ ] Aggiornato `charts.json` (20+ grafici)
- [ ] Aggiornato `tables.json` (45+ tabelle)
- [ ] Verificato sintassi JSON (no errori)
- [ ] Testato dashboard in browser
- [ ] Verificato console per errori
- [ ] Controllato grafici renderizzati
- [ ] Verificato KPI cards visualizzate
- [ ] Testato report dettagliati

---

## 🚀 Best Practices

1. **Validazione JSON:** Usa [jsonlint.com](https://jsonlint.com) prima di salvare
2. **Backup:** Mantieni sempre un backup dell'ultima versione funzionante
3. **Incrementale:** Aggiorna un file alla volta e testa
4. **Numeri:** Usa sempre numeri (non stringhe) per valori numerici
5. **Null values:** Usa `null` (non "N/A" o "n.d.") per valori mancanti
6. **Date:** Formato ISO: "YYYY-MM-DD"
7. **Decimali:** Usa punto (.) non virgola (,) per decimali

---

## 📞 Supporto

Per domande o problemi:
- **Documentazione completa:** `/data/README_JSON_STRUCTURE.md` (questo file)
- **Esempi:** I file JSON attuali contengono dati di esempio completi
- **Console browser:** F12 per vedere log ed errori dettagliati

---

**Ultima modifica:** 2025-11-14
**Versione:** 2.0 - Refactoring completo JSON modulare
