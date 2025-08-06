
import { createEl } from "./utils_pca.js";

export function createFooterSection() {
  return createEl("div", ["pca-footer"], disclaimerText());
}

function disclaimerText() {
  return `
  
    <span class="pca-disclaimer__text">
        Die im Etengo CostPilot dargestellten Werte basieren auf 
        aktuellen Marktpreisen sowie Erfahrungswerten aus vergangenen Projekten 
        und dienen ausschließlich der unverbindlichen Orientierung. 
   
        Es handelt sich hierbei ausdrücklich nicht um ein verbindliches Angebot. 
        Die tatsächlichen Kosten und Aufwände können aufgrund projektindividueller 
        Anforderungen, Rahmenbedingungen und Komplexitäten abweichen.
    
        Für eine belastbare Einschätzung buchen Sie ein persönliches Beratungsgespräch 
        mit unseren Ansprechpartner:innen.
    </span>  
    <div class="pca-cta__title">Sie möchten wissen, wie Sie mit Etengo profitieren?</div>
    <div class="pca-cta__sub">Lassen Sie uns über Ihren individuellen Bedarf sprechen!<div>
    <div class="pca-cta__btn" id="pca-cta__btn">Vereinbaren Sie jetzt einen unverbindlichen Austauschtermin!</div>
    `;
}
