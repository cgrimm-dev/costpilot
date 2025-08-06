import { renderResults } from "./ui_display_pca.js";
import { getWeeklyMultipliers } from "./utils_pca.js";

export const CONSULTING_MODIFIER = 1.13;
export const INTERNAL_MODIFIER = 1.152;

// price-variations
const priceVariations = getWeeklyMultipliers(0.02, 39);

// mod-variations
const modVariations = getWeeklyMultipliers(0.1, 26);
const consultingVariations = modVariations.slice(0, 13);
const internalVariations = modVariations.slice(13, 26);

export const pcaProjectList = [];

export class pcaSkillRow {
  static #counter = 0;
  constructor(
    skill = "default",
    days = 0,
    jun = 0,
    prof = 0,
    sen = 0,
    levelState = false,
    lowerState = false
  ) {
    this.id = pcaSkillRow.#counter++;
    this.skill = skill;
    this.days = days;
    this.prof = prof;
    this.sen = sen;
    this.jun = jun;
    this.levelState = levelState;
    this.lowerState = lowerState;
  }

  calculateRow(modifier) {
    const dayPrices =
      priceMatrix.find((row) => {
        return row.skill === this.skill;
      }) || priceMatrix[0]; // fallback to zero-values

    let mod;
    switch (modifier) {
      case "consulting":
        mod = dayPrices.consultingMod;
        break;
      case "internal":
        mod = dayPrices.internalMod;
        break;
      default:
        mod = 1;
    }
    return (
      this.days *
      (this.jun * dayPrices.jun +
        this.prof * dayPrices.prof +
        this.sen * dayPrices.sen) *
      mod
    );
  }
}

export class dayRate {
  static #counter = 0;

  constructor(skill, jun, prof, sen) {
    const i = dayRate.#counter;

    if (i === 0) {
      // define fallback
      this.skill = skill;
      this.jun = jun;
      this.prof = prof;
      this.sen = sen;
      this.consultingMod = 1.0;
      this.internalMod = 1.0;
    } else {
      this.skill = skill;
      this.jun = Math.round(jun * priceVariations[i * 3 - 2]);
      this.prof = Math.round(prof * priceVariations[i * 3 - 1]);
      this.sen = Math.round(sen * priceVariations[i * 3]);
      this.consultingMod =
        Math.round(consultingVariations[i] * CONSULTING_MODIFIER * 1000) / 1000;
      this.internalMod =
        Math.round(internalVariations[i] * INTERNAL_MODIFIER * 1000) / 1000;
    }
    dayRate.#counter++;
  }
}

export const priceMatrix = [
  new dayRate("Fallback", 0, 0, 0), // fallback for zero-values
  new dayRate("Netzwerke & Infrastruktur", 822, 967, 1111),
  new dayRate("IT-Security", 865, 1017, 1169),
  new dayRate("SAP", 886, 1042, 1198),
  new dayRate("Softwareentwicklung", 709, 834, 958),
  new dayRate("Organisations- & Prozessberatung", 900, 1059, 1217),
  new dayRate("Datamanagement/ - analyse", 709, 834, 958),
  new dayRate("Cloud", 723, 850, 977),
  new dayRate("UI/UX Design", 652, 767, 881),
  new dayRate("Data Science & KI", 943, 1109, 1274),
  new dayRate("Sonstiger IT-Skillbereich (CRM, ERP, MES)", 830, 975, 1121),
  new dayRate("Embedded & Hardware Engineering", 666, 784, 901),
  new dayRate("Non-IT (HR, Finance, Marketing, Sales)", 688, 809, 929),
];

export function setData(row, target, value) {
  const selectedEntry = pcaProjectList.find((entry) => entry.id === row);
  selectedEntry[target] = value;
  renderResults();
}
