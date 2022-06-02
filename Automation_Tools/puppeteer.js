const puppeteer = require('puppeteer-extra')
const fs = require("fs");
const DB  = require("../database");
module.exports.dir_Puppeteer = "/Tools-Screenshots/Puppeteer";
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
puppeteer.use(StealthPlugin())

exports.buildDriver = async (Browser) => {
  // console.log(Browser+" In puppeteer");
  let driver = null;
  try {
    // NOTE - Local  Drivers must be Installed 
    if (Browser == "chrome") {
      driver = await puppeteer.launch({ headless: false });

    } else if (Browser == "MicrosoftEdge") {
      driver = await puppeteer.launch({ headless: false, executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" });

    } else {
      console.log("Browser not supported for puppeteer");
      return;
    }

    return driver;

  } catch (error) {
    console.log("Error in getting Puppeteer Driver for " + Browser);
    return null;
  }
}

exports.openURL = async (driver, url) => {

  const page = await driver.newPage();
  await page.goto(url, { 'timeout': 100000, 'waitUntil': 'load' }); // - wait 10 sec after loading website

  // const content = await page.content();
  // console.log("val is"+content+"-"+content.length);
  // await driver.close();
};

exports.googleSearch = async (driver, text) => {

  const page = await driver.newPage();
  await page.goto('https://www.google.com', { 'timeout': 100000, 'waitUntil': 'load' });
  await page.type('.gLFyf', text);
  await page.waitFor(2000);
  await page.click('.gNO89b', { clickCount: 1 });
  // await driver.close();
};


exports.takeScreenShot = async (driver, browser, url, Set_Id) => {

  const page = await driver.newPage();
  await page.goto(url, { 'timeout': 100000, 'waitUntil': 'load' });
  await page.waitFor(20000);
  const body = await page.$eval(
    'body',
    (el) => el.textContent
  )
  console.log(body.length);
  await page.screenshot({ path: `Tools-Screenshots/Puppeteer/puppeteer-${browser}.png` });

  let detected = body.length == 0 ? true : false;
  // -- saving results in database
  await DB.insertResult("puppeteer", browser, detected, Set_Id+1);

  //await driver.close();

};
