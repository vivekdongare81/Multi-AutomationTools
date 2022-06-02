const playwright = require("playwright");
const fs = require("fs");
const DB  = require("../database");
module.exports.dir_Playwright = "/Tools-Screenshots/Playwright";

exports.buildDriver = async (Browser) => {
        //  console.log(Browser + " In playwright");
        let driver = null ,channel = "";
        try {
            channel = Browser == "MicrosoftEdge" ? "msedge" : "";
            Browser = Browser == "chrome" || Browser == "MicrosoftEdge"  ? "chromium" : Browser;
            driver = await playwright[Browser].launch({
                headless: false,
                channel: channel,
            });
        
            return driver;
    
        } catch (error) {
            console.log("Error in getting Playwright Driver for " + Browser);
            return null;
        }
};

exports.openURL = async (driver, url) => {
    // -  
    const context = await driver.newContext();
    const page = await context.newPage();

    await page.goto(url, { timeout: 60000 });
  
};

exports.googleSearch = async (driver, text) => {
    const context = await driver.newContext();
    const page = await context.newPage();

    await page.goto("https://www.google.com", { timeout: 60000 });
    await page.locator(".gLFyf").fill(text);
    await page.click('[aria-label="Google Search"]', { timeout: 1000000 });
    // await page.pause();
};

exports.takeScreenShot = async (driver, browser, url, Set_Id) => {
 
    const context = await driver.newContext();
    const page = await context.newPage();
    await page.goto(url, { timeout: 100000 });
    // Explicitly wait as no inbuild Function is provided to wait 
    await page.evaluate(() => {
        return new Promise((resolve) => setTimeout(resolve, 10000));
    }); 
    
    const body = await page.innerText('body');
    console.log(body.length);
    await page.screenshot({ path: `Tools-Screenshots/Playwright/playwright-${browser}.png` },{ timeout: 10000 });
  
    let detected = body.length == 0 ? true : false;
    // -- saving results in database
   await DB.insertResult("playwright", browser, detected, Set_Id+1);


};
