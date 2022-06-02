const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const edge = require("selenium-webdriver/edge");
const firefox = require("selenium-webdriver/firefox");
const fs = require("fs");
const DB  = require("../database");
module.exports.dir_Selenium = "/Tools-Screenshots/Selenium";
;

exports.buildDriver = async (Browser) => {
  //console.log(Browser+" In sele");
  let browser = null;
  try {
    switch (Browser) {
      case "chrome":
        browser = chrome;
        break;
      case "MicrosoftEdge":
        browser = edge;
        break;
      case "firefox":
        browser = firefox;
        break;
      default:
        console.log("browser not detected");
        break;
    }

    let options = new browser.Options();
    let driver = await new Builder()
      .setChromeOptions(options)
      .forBrowser(Browser)
      .build();

    return driver;
  } catch (error) {
    console.log("Error in getting Selenium Driver for " + Browser);
    return null;
  }
};

exports.openURL = async (driver, url) => {
 
  await driver.get(url);

};

exports.googleSearch = async (driver, text) => {
  await driver.get("https://www.google.com");
  await driver.findElement(By.className("gLFyf gsfi")).sendKeys(text);
  await driver.sleep(2000);
  await driver.findElement(By.className("gNO89b")).click();
  // await driver.close();
};

exports.takeScreenShot = async (driver, browser, url , Set_Id) => {

  await driver.get(url);
  await driver.sleep(10000);
  
 const body = await driver.findElement(By.css("body")).getText();
  console.log(body.length);
  await driver.takeScreenshot().then((image) => {
    fs.writeFileSync(`Tools-Screenshots/Selenium/selenium-${browser}.png`, image, 'base64');
  });
  let detected = body.length == 0 ? true : false;
  //  -- saving results in database
  await driver.sleep(3000);
  await DB.insertResult("selenium", browser, detected, Set_Id+1);
  
  //await driver.close();
};
