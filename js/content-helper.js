/**
 * SCAN - Content Helper
 * Funzioni helper per popolare contenuti da content.json
 * Versione 1.0
 */

/**
 * Popola tutti gli elementi con data-content attribute
 */
function populateContentElements() {
    // Populate all text content from content.json
    document.querySelectorAll('[data-content]').forEach(el => {
        const contentPath = el.dataset.content;
        const content = getContentByPath(contentPath);

        if (content) {
            el.innerHTML = content;
        }
    });

    // Populate button text content
    document.querySelectorAll('[data-content-btn]').forEach(el => {
        const contentPath = el.dataset.contentBtn;
        const content = getContentByPath(contentPath);

        if (content) {
            // Keep the icon, just append the text
            const icon = el.querySelector('i');
            el.innerHTML = '';
            if (icon) {
                el.appendChild(icon);
                el.innerHTML += ' ' + content;
            } else {
                el.textContent = content;
            }
        }
    });

    // Populate list content
    document.querySelectorAll('[data-content-list]').forEach(el => {
        const contentPath = el.dataset.contentList;
        const content = getContentByPath(contentPath);

        if (content && Array.isArray(content)) {
            el.innerHTML = '';
            content.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = item;
                el.appendChild(li);
            });
        }
    });
}

/**
 * Ottiene un contenuto da content.json tramite path
 * @param {string} path - Path in formato "section.key" o "section.nested.key"
 * @returns {any} Contenuto trovato o null
 */
function getContentByPath(path) {
    const parts = path.split('.');
    const section = parts[0];
    const keys = parts.slice(1);

    let content = window.dataManager.getContent(section, keys[0]);

    // Navigate nested keys (e.g., cciiAlert.title)
    for (let i = 1; i < keys.length; i++) {
        if (content && typeof content === 'object') {
            content = content[keys[i]];
        }
    }

    return content;
}
