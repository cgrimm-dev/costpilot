import { pcaProjectList, pcaSkillRow } from "./dataService_pca.js";
import { registerFormularListener } from "./eventlistener_pca.js";
import { getFormularEl, setFormularEl } from "./states__pca.js";
import { createEl } from "./utils_pca.js";

export function createFormularSection() {
  const el = createEl("div", ["pca-formular"]);
  setFormularEl(el);
  createNewRow();

  renderFormularSection();
  registerFormularListener(el);
  return el;
}

export function createNewRow() {
  const newRow = new pcaSkillRow();
  pcaProjectList.push(newRow);
  console.log("createNewRow: ", pcaProjectList);
  return newRow;
}

export function renderFormularSection() {
  const formularEl = getFormularEl();
  formularEl.innerHTML = "";

  pcaProjectList.forEach((row) => {
    const newWrapper = createEl(
      "div",
      ["pca-formular__wrapper"],
      createRowHTMLString(row),
      { "data-id": row.id }
    );
    formularEl.append(newWrapper);
  });
}

export function checkFormularVisibility(id) {
  const wrapper = document.querySelector(
    `.pca-formular__wrapper[data-id="${id}"]`
  );

  const dataRow = pcaProjectList.find((entry) => entry.id === id);
  if (!dataRow) return;

  const isSkillSet = dataRow.skill !== "default";
  const hasDays = dataRow.days !== 0;
  const notYetVisible = dataRow.levelState === false;

  if (isSkillSet && hasDays && notYetVisible) {
    const employeeEl = wrapper.querySelector(".pca-employees-wrapper");
    const nextEl = wrapper.querySelector(".pca-formular__lower");

    employeeEl.classList.add("pca-employees-wrapper--active");
    nextEl.classList.add("pca-formular__lower--active");

    dataRow.levelState = true;
    dataRow.lowerState = true;
  }
}

function createRowHTMLString(row) {
  const { skill, days, jun, prof, sen, levelState, lowerState, id } = row;
  const displaySkill = skill === "default" ? "Skillbereich wählen" : skill;

  return `<div class="pca-formular__upper">
            <div class="pca-dropdown-wrapper">
              <div class="pca-dropdown">
                <div class="pca-dropdown__btn">
                  <span
                    data-id="${id}"
                    data-value="${skill}"
                    class="pca-dropdown__name"
                    >${displaySkill}</span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="pca-dropdown__chevron"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                    />
                  </svg>
                </div>
                <div class="pca-dropdown__content">
                  <ul  class="pca-dropdown__list">
                    <li data-value="Cloud">Cloud</li>
                    <li data-value="Data Science & KI">
                      Data Science & KI
                    </li>
                    <li data-value="Datamanagement/ - analyse">
                      Datamanagement/ - analyse
                    </li>
                    <li
                      data-value="Embedded & Hardware Engineering"
                    >
                      Embedded & Hardware Engineering
                    </li>
                    <li data-value="IT-Security">IT-Security</li>
                    <li data-value="Netzwerke & Infrastruktur">
                      Netzwerke & Infrastruktur
                    </li>
                    <li
                      data-value="Non-IT (HR, Finance, Marketing, Sales)"
                    >
                      Non-IT (HR, Finance, Marketing, Sales)
                    </li>
                    <li
                      data-value="Organisations- & Prozessberatung"
                    >
                      Organisations- & Prozessberatung
                    </li>
                    <li data-value="SAP">SAP</li>
                    <li data-value="Softwareentwicklung">
                      Softwareentwicklung
                    </li>
                    <li
                      data-value="Sonstiger IT-Skillbereich (CRM, ERP, MES)"
                    >
                      Sonstiger IT-Skillbereich (CRM, ERP, MES)
                    </li>
                    <li data-value="UI/UX Design">UI/UX Design</li>
                  </ul>
                </div>
              </div>
              <div class="pca-projectdays">
                <span>Einsatztage:</span
                ><input
                  type="number"
                  class="pca-projectdays__input"
                  data-id="${id}"
                  data-role="days"
                  min="0"
                  placeholder="-"
                  value='${days || ""}'
                />
              </div>
            </div>
            <div class="pca-employees-wrapper ${
              levelState ? "pca-employees-wrapper--active" : ""
            }">
            <div class="pca-junior">
                <span>Junior:</span>
                <input 
                  type="number" 
                  data-id="${id}" 
                  data-role="jun" 
                  min="0" 
                  placeholder="-" 
                  value='${jun || ""}'/>
              </div>
               <div class="pca-professional">
                <span>Professional: </span>
                <input 
                  type="number" 
                  data-id="${id}" 
                  data-role="prof"
                  min="0" 
                  placeholder="-" 
                  value='${prof || ""}'/>
              </div>
            <div class="pca-senior">
                <span>Senior:</span>
                <input 
                  type="number" 
                  data-id="${id}" 
                  data-role="sen"
                  min="0" 
                  placeholder="-" 
                  value='${sen || ""}'/>
              </div>
              <div class="pca-delete" data-id="${id}">   
                <svg data-id="${id}" xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  class="pca-delete__icon">
                  <path data-id="${id}"
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div> 
            </div>
          </div>
          <div class="pca-formular__lower ${
            lowerState ? "pca-formular__lower--active" : ""
          }">
            <div class="pca-addnew" data-id="${id}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="pca-addnew__symbol"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span class="pca-addnew__text"
                >Weiteren Skillbereich anlegen</span
              >
            </div>
          </div>`;
}
