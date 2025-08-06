import { createPcaApp } from "./app_pca.js";
import { renderCompareCalc } from "./utils_pca.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = createPcaApp();
  document.body.appendChild(app);
});

/*
createNewRow(-1);

 */
