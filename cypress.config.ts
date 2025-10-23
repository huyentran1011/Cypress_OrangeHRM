import { defineConfig } from "cypress";
import { downloadFile } from 'cypress-downloadfile/lib/addPlugin';
import mochawesome from "cypress-mochawesome-reporter/plugin";
import fs from 'fs';
import path from 'path';

export default defineConfig({
  projectId: "tx4dvo",
  e2e: {
    setupNodeEvents(on, config) {
      // register downloadFile task
      on('task', {
        downloadFile,
        log(message) {
          console.log(message);
          return null;
        }
      });

      on('task', {
        downloadFile,

        // Custom task to delete downloaded files
        deleteDownloads(downloadsFolderPath: string) {
          const downloadsFolder = path.join(__dirname, downloadsFolderPath);

          if (fs.existsSync(downloadsFolder)) {
            fs.readdirSync(downloadsFolder).forEach((file) => {
              fs.unlinkSync(path.join(downloadsFolder, file));
            });
          }
          return null;
        },
        log(message) {
          console.log(message);
          return null;
        },
      });
      // handle dynamic report paths
      if (config.env.reportDir) {
        config.reporterOptions.reportDir = config.env.reportDir;
        config.screenshotsFolder = config.env.screenshotsDir;
        config.videosFolder = config.env.videosFolderDir;
      }
      require("cypress-mochawesome-reporter/plugin")(on);
      mochawesome(on); // <-- required for screenshots and UI support
      return config;
    },
    // Enable Cypress Studio
    experimentalStudio: true,
    // Turn off file watching
    watchForFileChanges: false,
    supportFile: 'cypress/support/e2e.ts',

    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      // reportDir: "cypress/reports", // default; overridden dynamically
      reportDir: process.env.npm_config_reportDir || "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    screenshotsFolder: "cypress/screenshots", // default; overridden dynamically
    videosFolder: "cypress/videos",
    video: true,
    env: {
      reportDir: "",
      screenshotsDir: "",
      videosFolderDir: "",
    },
  },
});


