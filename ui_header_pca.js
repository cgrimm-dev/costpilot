import { createEl } from "./utils_pca.js";

export function createHeaderSection() {
  const headerSectionEl = createEl("div", ["pca-header"]);
  headerSectionEl.append(
    createEl("span", ["pca-header__title"], "Etengo CostPilot")
  );
  headerSectionEl.append(
    createEl("div", ["pca-header__textwrapper"], headerText())
  );
  return headerSectionEl;
}

function headerText() {
  return `
  <span class="pca-header__text">
    Sie möchten die Besetzungskosten Ihrer IT-Vakanz transparent vergleichen?
    Oder suchen Sie eine fundierte Grundlage zur Kalkulation eines gesamten Projektteams?
  </span>
  <span class="pca-header__text">
    Ob durch den Einsatz externer Experten aus unserem Netzwerk, über ein 
    Beratungshaus oder mit internen Ressourcen: Der Etengo Projektkalkulator gibt Ihnen eine 
    Ersteinschätzung zu den typischen Kostenstrukturen der drei gängigsten Besetzungswege.
  </span>
  <span class="pca-header__text">
    <strong>Wählen Sie zunächst den gewünschten Skillbereich und die geplanten Einsatztage aus.</strong>
    
  </span>
  <span class="pca-header__text">
    In den anschließend eingeblendeten Feldern können Sie die benötigte Anzahl an Expert:innen 
    nach Senioritätslevel festlegen. Über das Plussymbol fügen Sie bei Bedarf weitere Positionen hinzu, mit dem 
    Löschsymbol entfernen Sie nicht mehr benötigte Zeilen.
  </span>
  <span class="pca-header__text">
    Die angezeigten Gesamtkosten berechnen sich dabei automatisch auf Basis Ihrer Eingaben.
  </span>`;
}
