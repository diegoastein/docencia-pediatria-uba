/**
 * BUSCADOR POR TEMA - Talleres EFU
 * Filtro interactivo para buscar casos EFU por palabras clave
 * Se integra en la pestaña "Talleres EFU" de index.html
 */

// Función para agregar el buscador en la UI
function initThemeSearcher() {
    // Crear contenedor del buscador si no existe
    const efuTab = document.getElementById('tab-efu');

    if (!document.getElementById('theme-search-container')) {
        const searchHTML = `
            <div id="theme-search-container" style="background: #e3f2fd; border: 1px solid #90caf9; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin-top: 0; color: #1976d2;">🔍 Buscador por Tema</h3>
                <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                    <input
                        type="text"
                        id="theme-search-input"
                        placeholder="Escribe un tema: varicela, convulsión, ictericia, trauma, etc."
                        style="flex: 1; min-width: 250px; padding: 10px 14px; border: 1px solid #64b5f6; border-radius: 6px; font-size: 14px;"
                    >
                    <button
                        onclick="searchByTheme()"
                        style="background: #1976d2; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: background 0.2s;"
                        onmouseover="this.style.background='#1565c0'"
                        onmouseout="this.style.background='#1976d2'"
                    >
                        Buscar
                    </button>
                    <button
                        onclick="clearThemeSearch()"
                        style="background: #f5f5f5; color: #424242; border: 1px solid #e0e0e0; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s;"
                        onmouseover="this.style.background='#eeeeee'"
                        onmouseout="this.style.background='#f5f5f5'"
                    >
                        Limpiar
                    </button>
                </div>
                <div id="theme-search-results" style="margin-top: 12px; font-size: 14px; color: #424242;"></div>
            </div>
        `;

        // Insertar el buscador después del filtro de semanas
        const weekFilter = document.getElementById('efu-week-filter');
        if (weekFilter) {
            weekFilter.parentElement.insertAdjacentHTML('afterend', searchHTML);
        } else {
            efuTab.insertAdjacentHTML('afterbegin', searchHTML);
        }

        // Agregar event listener al input
        document.getElementById('theme-search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchByTheme();
            }
        });
    }
}

// Función principal de búsqueda por tema
// NOTA: delega el filtrado a `refreshEfuVisibility()` (definida en index.html) a través de la
// variable compartida `efuSearchQuery`, para que el Modo Presentación de EFU también respete
// la búsqueda activa en vez de seguir mostrando los casos de la semana.
function searchByTheme() {
    const searchInput = document.getElementById('theme-search-input').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('theme-search-results');

    if (!searchInput) {
        resultsDiv.textContent = '⚠️ Por favor ingresa un término de búsqueda.';
        resultsDiv.style.color = '#e64a19';
        return;
    }

    efuSearchQuery = searchInput;
    refreshEfuVisibility();

    // Resaltar las tarjetas que coincidieron (refreshEfuVisibility ya resolvió qué mostrar/ocultar)
    const cards = document.querySelectorAll('#tab-efu .card[data-tema]');
    let matchCount = 0;
    cards.forEach(card => {
        if (card.style.display !== 'none') {
            card.style.borderLeft = '5px solid #4caf50';
            card.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.2)';
            matchCount++;
        }
    });

    // Mostrar resultado
    if (matchCount === 0) {
        resultsDiv.innerHTML = `❌ No se encontraron casos con el tema "<strong>${searchInput}</strong>". Intenta con otras palabras clave.`;
        resultsDiv.style.color = '#c62828';
    } else {
        resultsDiv.innerHTML = `✅ Se encontraron <strong>${matchCount}</strong> caso${matchCount !== 1 ? 's' : ''} con el tema "<strong>${searchInput}</strong>" — el Modo Presentación usará estos casos.`;
        resultsDiv.style.color = '#2e7d32';
    }
}

// Función para limpiar la búsqueda
function clearThemeSearch() {
    document.getElementById('theme-search-input').value = '';
    const resultsDiv = document.getElementById('theme-search-results');
    resultsDiv.textContent = '';

    efuSearchQuery = '';
    refreshEfuVisibility();

    // Restaurar el estilo por defecto de las tarjetas
    const cards = document.querySelectorAll('#tab-efu .card[data-tema]');
    cards.forEach(card => {
        card.style.borderLeft = '4px solid var(--primary)';
        card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    });
}

// Función auxiliar: listar todos los temas disponibles (para ayuda)
function listAvailableThemes() {
    const cards = document.querySelectorAll('#tab-efu .card[data-tema]');
    const themes = new Set();

    cards.forEach(card => {
        const temas = card.getAttribute('data-tema').split(',').map(t => t.trim());
        temas.forEach(tema => themes.add(tema));
    });

    return Array.from(themes).sort();
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Pequeño delay para asegurar que el tab EFU está cargado
    setTimeout(initThemeSearcher, 100);
});

// Exportar función para uso manual si es necesario
window.initThemeSearcher = initThemeSearcher;
window.searchByTheme = searchByTheme;
window.clearThemeSearch = clearThemeSearch;
window.listAvailableThemes = listAvailableThemes;

/**
 * EJEMPLOS DE BÚSQUEDA (pegar en console del navegador):
 *
 * listAvailableThemes()
 *   → Muestra todos los temas disponibles
 *
 * searchByTheme()
 *   → Busca por el valor del input
 *
 * TEMAS DISPONIBLES EN SEMANAS 6-9:
 * - convulsión febril, meningitis, fiebre sin foco, lactante
 * - fiebre neonatal
 * - neonato, ictericia, bilirrubina, lactancia, peso
 * - ictericia prolongada
 * - desarrollo, psicomotor, 6 meses, neurodesarrollo
 * - varicela, exantema, virus, inmunización
 * - urticaria, exantema, prurito, alergia
 * - faringitis, infección, estreptococo, antibiótico
 * - trauma, intoxicación, emergencia, adolescente, shock
 * - trauma, osteomielitis, post-traumática, cirugía
 * - estenosis píloro, abdomen agudo, cirugía, vómitos
 */
