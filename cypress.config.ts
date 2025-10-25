import { defineConfig } from "cypress";
import { downloadFile } from 'cypress-downloadfile/lib/addPlugin';
import mochawesome from "cypress-mochawesome-reporter/plugin";
import fs from 'fs';
import path from 'path';
import { RowDataPacket, OkPacket } from 'mysql2';


const mysql = require('mysql2');


export default defineConfig({
  projectId: "tx4dvo",
  e2e: {
    setupNodeEvents(on, config) {

      // the connection strings for different databases could
      // come from the Cypress configuration or from environment variables
      const connections = {
        stagingA: {
          host: '127.0.0.1',
          port: 3309,
          user: 'root',
          password: '12345',
          database: 'orangehrm5',
        },
        stagingB: {
         host: 'localhost',
          port: 3309,
          user: 'root',
          password: '12345',
          database: 'orangehrm5',
        },
      }

      // connecting the database from Node
      const connection = mysql.createConnection(connections.stagingA);

      // register queryDatabase task
      on('task', {
        // destructure the argument into the individual fields
        queryDatabase({ query }) {
          return new Promise((resolve, reject) => {
            connection.query(query, (error: Error | null, results: RowDataPacket[] | OkPacket) => {
              if (error) {
                return reject(error);
              }
              resolve(results);
            });
          });
        }
      });

      // register downloadFile task
      on('task', {
        downloadFile,
        // Custom task to delete downloaded files
        deleteDownloads(downloadsFolderPath: string) {
          console.log('Deleting files in folder:', downloadsFolderPath);
          const downloadsFolder = path.join(__dirname, downloadsFolderPath);

          if (fs.existsSync(downloadsFolder)) {
            fs.readdirSync(downloadsFolder).forEach((file) => {
              fs.unlinkSync(path.join(downloadsFolder, file));
            });
          }
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


