import { pcaProjectList } from "./dataService_pca.js";
import { createDisplaySection } from "./ui_display_pca.js";
import { createFooterSection } from "./ui_footer_pca.js";
import { createFormularSection } from "./ui_formular_pca.js";
import { createHeaderSection } from "./ui_header_pca.js";
import { createEl } from "./utils_pca.js";

export function createPcaApp() {
  const app = createEl("div", ["pca-app"], "");
  console.log(pcaProjectList);
  app.append(
    createHeaderSection(),
    createFormularSection(),
    createDisplaySection(),
    createFooterSection()
  );

  return app;
}
