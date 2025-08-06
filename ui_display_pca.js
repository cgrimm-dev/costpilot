import { registerDisplayListener } from "./eventlistener_pca.js";
import {
  calculateAll,
  createEl,
  renderCompareCalc,
  renderEtengoCalc,
} from "./utils_pca.js";

export function createDisplaySection() {
  const displaySection = createEl("div", ["pca-display"], createDisplayHTML());
  renderEtengoCalc(0, displaySection);
  renderCompareCalc(0, 0, "internal", displaySection);
  renderCompareCalc(0, 0, "consulting", displaySection);
  registerDisplayListener(displaySection);
  return displaySection;
}
export function renderResults() {
  console.log("RenderResult");
  const baseResult = calculateAll();
  const internalResult = calculateAll("internal");
  const consultingResult = calculateAll("consulting");
  renderEtengoCalc(baseResult);

  renderCompareCalc(baseResult, internalResult, "internal");
  renderCompareCalc(baseResult, consultingResult, "consulting");
}

function createSwitchSymbol(idName, symbol) {
  let icon;
  if (symbol === "info") {
    icon = `
            <div class="pca-display__switch-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    id="${idName}"
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.5" stroke="currentColor" 
                    class="pca-display__switchSymbol">
                    <path stroke-linecap="round" stroke-linejoin="round" 
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
            </div>`;
  } else if (symbol === "back") {
    icon = `
             <div class="pca-display__switch-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" 
                id="${idName}"
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.5" stroke="currentColor" 
                    class="pca-display__switchSymbol">
                    <path stroke-linecap="round" 
                    stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>

            </div> `;
  }

  return icon;
}

const disclaimerIntern = `
    <div class="pca-display__title">Weiterführende Informationen</div>
    <p>
        <strong>Interne Besetzung</strong> bezeichnet die Zuweisung eins Projekts an festangestellte Mitarbeitende.
    </p>
    <p>
        Die hierfür kalkulierten Beträge basieren auf marktüblichen Bruttogehältern 
        und berücksichtigen zusätzlich die Opportunitätskosten, die durch den Abzug 
        dieser Mitarbeitenden von ihren originären Aufgaben entstehen können.
    </p>
    <p>
        Zu beachten ist, dass interne Besetzungen potenziell mit <strong>Interessens-, 
        Zuständigkeits-, Verfügbarkeits- und Organisationskonflikten</strong> einhergehen 
        können.
    </p>
`;

const disclaimerSyshouse = `
    <div class="pca-display__title">Weiterführende Informationen</div>
    <p>
        <strong>Die Besetzung durch ein Beratungshaus</strong> beschreibt die exklusive Beauftragung eines externen Beratungs- 
        oder Systemhauses zur Durchführung des Projekts.
    </p>
    <p>
        Die hierbei veranschlagten Tagessätze orientieren sich an branchenüblichen 
        Marktpreisen und beinhalten neben den direkten Einsatzkosten auch typische 
        Overhead- und Verwaltungskosten sowie projektbezogene Managementaufschläge.
    </p>
    <p>
        In diesem Modell kann es zu <strong>Abhängigkeiten hinsichtlich der eingesetzten 
        Methoden, Werkzeuge und Templates</strong> des jeweiligen Dienstleisters kommen.
    </p>
`;

function createDisplayHTML() {
  return `
    <div class="pca-display__calculation-wrapper">
        <div class="pca-display__card" id="etengo-card">
            <div class="pca-display__card--front">
                <div class="pca-display__title">Projektbesetzung durch Etengo</div>
                <div class="pca-display__content">
                    <p>
                        Ihre kalkulierten Projektkosten:
                        <strong id="projectcosts-etengo"></strong>
                    </p>
                </div>
            </div>
            <div class="pca-display__card--back pca-display__card--hidden">
                Das ist die Rückseite
            </div>
        </div>
        <div class="pca-display__card" id="intern-card">
            <div class="pca-display__card--front">
                <div class="pca-display__title">
                    Projektbesetzung durch interne Kräfte
                </div>
                <div class="pca-display__content">
                    <p>
                        Kosten bei vollständiger Eigenbesetzung:
                        <strong id="internal-costs"></strong>
                        <span class="pca-display__compare-name" id="internal-name">
                            Mehrbelastung im Vergleich zu Etengo:
                        </span>
                        <span
                            class="pca-display__compare-value"
                            id="internal-statistics"
                        ></span>
                    </p>
                </div>
                ${createSwitchSymbol("intern-front", "info")}
            </div>
            <div class="pca-display__card--back pca-display__card--hidden">
                ${disclaimerIntern}                
                ${createSwitchSymbol("intern-back", "back")}
            </div>
        </div>
        <div class="pca-display__card" id="syshouse-card">
            <div class="pca-display__card--front">
                <div class="pca-display__title">
                    Projektbesetzung durch Beratungshaus
                </div>
                <div class="pca-display__content">
                    <p>
                        Kosten bei Vergabe an Beratungshaus:
                        <strong id="consulting-costs"></strong>
                        <span class="pca-display__compare-name" id="consulting-name"
                        >Mehrbelastung im Vergleich zu Etengo:</span>
                        <span
                            class="pca-display__compare-value"
                            id="consulting-statistics"
                        ></span>
                    </p>
                </div>
                ${createSwitchSymbol("syshouse-front", "info")}
            </div>
             <div class="pca-display__card--back pca-display__card--hidden">
                ${disclaimerSyshouse}
                ${createSwitchSymbol("syshouse-back", "back")}
            </div>
        </div>
       `;
}
