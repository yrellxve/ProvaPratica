// Per il desktop troviamo gli elementi e leggiamo la larghezza
const navigationButton = document.querySelector('.navigation-toggle');
const navigationLabel = document.querySelector('.navigation-label');
const navigationPanel = document.querySelector('.navigation-panel');
const desktopMedia = window.matchMedia('(min-width: 1000px)');
const supportsNavigation = 'popover' in HTMLElement.prototype &&
  CSS.supports('top', 'anchor(bottom)') &&
  CSS.supports('width', 'anchor-size(width)');

// Scegliamo la modalità di navigazione al caricamento (il popover funziona già in HTML)
function updateNavigationLabel() {
  const text = navigationPanel.matches(':popover-open') ? 'Chiudi menu' : 'Apri menu';
  navigationButton.setAttribute('aria-label', text);
  navigationLabel.textContent = text;
}
function updateNavigationLayout() {
  if (desktopMedia.matches) { // Siamo su desktop, disattiva il popover!
    navigationButton.removeAttribute('popovertarget');
    navigationPanel.removeAttribute('popover');
    navigationButton.hidden = true;
  } else { // Non siamo su desktop, riattiva il popover!
    navigationPanel.setAttribute('popover', 'auto');
    navigationButton.setAttribute('popovertarget', navigationPanel.id);
    navigationButton.hidden = false;
  }
  updateNavigationLabel();
}
if (supportsNavigation) {
  navigationPanel.addEventListener('toggle', updateNavigationLabel);
  updateNavigationLayout();
} else {
  // Qui si può eventualmente inserire un ripiego per i browser privi delle funzionalità richieste.
  navigationButton.removeAttribute('popovertarget');
  navigationPanel.removeAttribute('popover');
  navigationButton.hidden = true;
}

// Chiudiamo il popover se clicchiamo fuori (ad eccezione di alcuni casi) e lasciamo al link HTML la navigazione al capitolo
navigationPanel.addEventListener('click', function (event) {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  if (supportsNavigation && navigationPanel.matches(':popover-open')) navigationPanel.hidePopover();
  // Il link continua ad aggiornare il frammento e a scorrere con il comportamento HTML.
});
document.querySelector('.skip-link').addEventListener('click', function () {
  document.querySelector('#top').focus();
});

// Bonus accessibilità: se cambia il breakpoint, manteniamo il focus dove serve
desktopMedia.addEventListener('change', function () {
  if (!supportsNavigation) return;
  const focused = document.activeElement;
  const focusInNavigation = navigationPanel.contains(focused);
  const focusOnButton = focused === navigationButton;
  updateNavigationLayout();
  if (desktopMedia.matches && focusInNavigation) focused.focus();
  else if (desktopMedia.matches && focusOnButton) navigationPanel.querySelector('a').focus();
  else if (!desktopMedia.matches && focusInNavigation) navigationButton.focus();
});



/* ============ 4. JAVASCRIPT ============  
. - cerca dentro di te
() - fallo ora, elementri all'interno sono info che dai
=> - esegui questo
= - capisci prima cosa c'è a destra, poi dove viene messo a sinistra
*/

/*
const - crea una variabile ex. const x = 5; y = 3; come una scatola con etichetta che non cambierà piu

querySelector è piu flessibile
document.querySelector('.breakdownTabs-list') significa "cerca nella pagina l'elemento con quella classe". 
il risultato è una lista di 3 bottoni, che salvo nella scatola chiamata 'tabs'.

poi dici dentro tabs cercami TUTTE le voci (querySelectorAll) e salvamele in 'items'
*/

const tabs = document.querySelector('.breakdownTabs-list');
const items = document.querySelectorAll('.breakdownTabs-item');


/*
Element.classList - gestisce le classi come una semplice stringa di testo
classList - lista delle classi dell'elemento
.add('...') - aggiungi questa classe all'html
->> contenitore diventa class="breakdownTabs breakdownTabs-ready"
*/

tabs.classList.add('breakdownTabs-ready');


/* prendi lista items e per ognuno
trova il suo button e crea la sua scatola chiamata 'button' */

items.forEach(item => { 
  const button = item.querySelector('.breakdownTabs-button');

/*
addEventListener - ascolta, gli dici cosa aspettare ('click') e cosa fare quando succede () => {...}
non dice subito quello che c'è dentro. lo mette da parte e lo esegue solo quando qualcuno lo clicca.
*/

  button.addEventListener('click', () => {
    items.forEach(other => { 
      const isOpen = other === item; /* per ognun click, verifica other è esattamente la stessa cosa di item?
      ->> risposta è 'true' o 'false'. questo risultato viene messo nella scatola 'isOpen'
      */

      other.classList.toggle('is-selected', isOpen); 
      other.querySelector('.breakdownTabs-button')
           .setAttribute('aria-expanded', isOpen);
    });
  });
});





/* 

NodeList

*/
