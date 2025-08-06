import { pcaProjectList, setData } from "./dataService_pca.js";
import { renderResults } from "./ui_display_pca.js";
import {
  checkFormularVisibility,
  createNewRow,
  renderFormularSection,
} from "./ui_formular_pca.js";

export function registerFormularListener(formularEl) {
  // central eventHandler
  formularEl.addEventListener("click", (e) => {
    const target = e.target;
    // trigger dropdownListener
    if (target.matches(".pca-dropdown__list li")) {
      dropdownListener(target);
    }
    // trigger next-buton
    if (target.closest(".pca-addnew")) {
      nextButtonListener();
    }

    if (target.closest(".pca-delete")) {
      deleteButtonListener(target);
    }
  });
  formularEl.addEventListener("input", (e) => {
    const target = e.target;
    // trigger input-fields
    if (
      target.matches(".pca-projectdays__input") ||
      target.matches("input[data-role='jun']") ||
      target.matches("input[data-role='prof']") ||
      target.matches("input[data-role='sen']")
    ) {
      valueInputListener(target);
      console.log(pcaProjectList);
    }
  });
}

export function registerDisplayListener(displayEl) {
  displayEl.addEventListener("click", (e) => {
    if (e.target.matches(".pca-display__switchSymbol"))
      flipButtonListener(e.target.id, displayEl);
  });
}

function dropdownListener(target) {
  const selectedSkill = target.dataset.value;
  const wrapper = target.closest(".pca-formular__wrapper");
  const id = Number(wrapper.dataset.id);
  const menuEl = wrapper.querySelector(".pca-dropdown__name");
  // UI-Update
  menuEl.innerText = selectedSkill;
  menuEl.dataset.value = selectedSkill;
  // Datamodel-Update
  setData(id, "skill", selectedSkill);
  checkFormularVisibility(id);
}

function valueInputListener(target) {
  const id = Number(target.dataset.id);
  const role = target.dataset.role;
  const value = Number(target.value);
  setData(id, role, value);
  if (role === "days") checkFormularVisibility(id);
}

function nextButtonListener() {
  const newRow = createNewRow();
  if (pcaProjectList.length >= 2) {
    pcaProjectList[pcaProjectList.length - 2].lowerState = false;
  }

  renderFormularSection();
}

function deleteButtonListener(target) {
  const id = Number(target.dataset.id);
  const index = pcaProjectList.findIndex((row) => row.id === id);
  pcaProjectList.splice(index, 1);

  if (pcaProjectList.length === 0) {
    createNewRow();
  } else {
    pcaProjectList.forEach((row) => (row.lowerState = false));
    pcaProjectList[pcaProjectList.length - 1].lowerState = true;
  }

  renderFormularSection();
  renderResults();
}

function flipButtonListener(currentId, displayEl) {
  let targetCard;

  switch (currentId) {
    case "etengo-front":
    case "etengo-back":
      targetCard = displayEl.querySelector("#etengo-card");
      break;
    case "intern-front":
    case "intern-back":
      targetCard = displayEl.querySelector("#intern-card");
      break;
    case "syshouse-front":
    case "syshouse-back":
      targetCard = displayEl.querySelector("#syshouse-card");
      break;
    default:
      console.warn(`no case processed for ID: ${currentId}`);
      return;
  }

  if (targetCard) {
    const front = targetCard.querySelector(".pca-display__card--front");
    const back = targetCard.querySelector(".pca-display__card--back");
    const hidden = "pca-display__card--hidden";

    if (front.classList.contains(hidden)) {
      front.classList.remove(hidden);
      back.classList.add(hidden);
    } else {
      front.classList.add(hidden);
      back.classList.remove(hidden);
    }
  }
}
