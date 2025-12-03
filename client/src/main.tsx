import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeConfig, AppData } from "./lib/configLoader";

/**
 * Initialize configuration from settings.json
 * This loads all dynamic settings before rendering the app
 */
initializeConfig().then((appData: AppData) => {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App appData={appData} />
    </React.StrictMode>
  );
});
