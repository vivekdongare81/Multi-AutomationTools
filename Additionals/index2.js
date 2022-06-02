const fs = require("fs");
const puppeteer = require("puppeteer");
const DB = require("../database");

// To- get info of browser , tool from config file
(async function getInfo() {
  // - looking for additional pairs data from config
  await fs.readFile("../config.json", async function (err, data) {
    if (err) throw err;

    const file = JSON.parse(data);
    let { Browsers, url, Tools } = file;

    if (Browsers.includes("firefox") && Tools.includes("puppeteer")) {
      (async () => {
        // -- Getting Firefox browser
        const browserFetcher = puppeteer.createBrowserFetcher({
          product: "firefox",
          path: "./downloadedPath",
        });
        const revisionInfo = await browserFetcher.download(
          "102.0a1",
          (total) => {
            console.log("downloaded");
          }
        );
        const driver = await puppeteer.launch({
          executablePath: revisionInfo.executablePath,
          product: "firefox",
          headless: false,
        });

        let res = driver == null ? false : true;
        const page = await driver.newPage();

        // -- GET to provided URL
        await page.goto(url, { timeout: 100000, waitUntil: "load" });
        await page.setViewport({ width: 1536, height: 702 });
        const body = await page.$eval("body", (el) => el.textContent);
        console.log(body.length);
        await page.screenshot({
          path: `../Tools-Screenshots/Puppeteer/puppeteer-firefox.png`,
        });

        let detected = body.length == 0 ? true : false;

        //  -- saving results in database
        await DB.getResultSet(function (set_id) {
          console.log(set_id[0].Set_Id);
          (async () => {
            await DB.insertResult(
              "puppeteer",
              "firefox",
              detected,
              set_id[0].Set_Id
            );

            // _ Updating Results in Result.json
            await fs.readFile("../results.json", async function (err, data) {
              const pairs = JSON.parse(data);
              const { Tool_BrowserPairs } = pairs;
              let pair = {
                ATool: "puppeteer",
                Browser: "firefox",
                Result: res,
              };
              Tool_BrowserPairs.push(pair);

              await fs.writeFile(
                "../results.json",
                JSON.stringify(pairs, null, 2),
                (err) => {
                  if (err) console.log(err);
                  else {
                    console.log(pair, " --- test successful ");
                  }
                }
              );
            })
          })();
        });
      })();
    }
  });
})();
