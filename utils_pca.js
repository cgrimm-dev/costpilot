import { createPcaApp } from "./app_pca.js";
import { pcaProjectList } from "./dataService_pca.js";
import { renderResults } from "./ui_display_pca.js";

export function getComparisonString(baseValue, targetValue) {
  const difference = targetValue - baseValue || 0;
  const percent = (difference / baseValue) * 100 || 0;
  return `${formatEuroCurrency(difference)}, ${percent.toFixed(1)}%`;
}

export function formatEuroCurrency(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

// Bevor prod, im Backend maskieren und via API anbieten
export function getWeeklyMultipliers(range = 0.04, count = 12) {
  // Startdatum der aktuellen Woche (Sonntag)
  const now = new Date();
  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const seedBase = weekStart.toISOString().slice(0, 10);

  const baseSeed = [...seedBase].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0
  );

  return Array.from({ length: count }, (_, i) => {
    const seed = baseSeed + i * 31; // Variation je Index
    const random = Math.sin(seed) * 10000;
    const variation = (random - Math.floor(random)) * (range * 2) - range;
    const rounded = Math.round(variation * 100) / 100;

    return 1 + rounded;
  });
}

export function calcVariation(value) {
  const multiplier = value; // getDailyMultiplier();
  return parseFloat((value * multiplier).toFixed(2));
}

export function calculateAll(modifier) {
  return pcaProjectList.reduce((sum, row) => {
    return sum + row.calculateRow(modifier);
  }, 0);
}

export function renderCompareCalc(
  value,
  targetValue,
  element,
  currentNode = false
) {
  const fullCostEl = (currentNode || document).querySelector(
    `#${element}-costs`
  );
  const comparedEl = (currentNode || document).querySelector(
    `#${element}-statistics`
  );
  fullCostEl.innerText = formatEuroCurrency(targetValue);
  comparedEl.innerText = getComparisonString(value, targetValue);
}

export function renderEtengoCalc(value, currentNode = false) {
  const target = (currentNode || document).querySelector(
    "#projectcosts-etengo"
  );
  target.innerText = formatEuroCurrency(value);
}

export function createEl(tag, classNames = [], content = "", attributes = {}) {
  const el = document.createElement(tag);
  classNames.forEach((cls) => el.classList.add(cls));
  el.innerHTML = content;

  for (const [attr, value] of Object.entries(attributes)) {
    el.setAttribute(attr, value);
  }

  return el;
}

function cleanPcaRow(row) {
  console.log(row);
  row.id = 0;
  row.skill = "default";
  row.days = 0;
  row.prof = 0;
  row.sen = 0;
  row.jun = 0;
  console.log(row);
}
