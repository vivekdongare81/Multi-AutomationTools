const fs = require("fs");
const fsPromises = fs.promises;
const seleniumDriver = require("./Automation_Tools/selenium.js"); // - chrome - firefox - edge
const puppeteerDriver = require("./Automation_Tools/puppeteer.js"); // - chrome - edge (CHROMIUM BASED)
const playwrightDriver = require("./Automation_Tools/playwright"); // -firefox -webkit -chrome - edge
const DB  = require("./database");

// To- get info of browser , tool from config file
(async function getInfo() {

    await fs.readFile("config.json", async function (err, data) {
        if (err) throw err;
        const file = JSON.parse(data);

        let { Browsers, url, Tools } = file;
        let pairs = {
            Tool_BrowserPairs: [],
        };
    
     await DB.getResultSet(function(set_id){
       console.log(set_id[0].Set_Id);

        let inx = 0, Set_Id = set_id[0].Set_Id ;
        (async () => {
            await Tools.forEach((tool, i) => {
                Browsers.forEach((browser, j) => {

                    if (isValidMatch(tool, browser)) {
                        (async () => {
                            inx++;
                            let driver = null, detected = false ;
                            console.log(inx + " Using " + tool + " with " + browser);
                            // -- creating status 
                            let pair = {
                                "ATool": tool, "Browser": browser, "Result": false
                            }
                            // console.log(tool);
                            switch (tool) {
                                case "selenium": {
                                    driver = await seleniumDriver.buildDriver(browser);
                                    //driver != null ? seleniumDriver.openURL(driver, url) : ""
                                    //driver != null ? seleniumDriver.googleSearch(driver, "Automation Technologies") : ""
                                    driver != null ? seleniumDriver.takeScreenShot(driver, browser, url , Set_Id) : ""
                                    break;
                                }
                                case "puppeteer": {
                                    driver = await puppeteerDriver.buildDriver(browser);
                                    // driver != null ? puppeteerDriver.openURL(driver, url) : ""
                                    // driver != null ? puppeteerDriver.googleSearch(driver, "Automation Technologies") : ""
                                    driver != null ? puppeteerDriver.takeScreenShot(driver, browser,url , Set_Id ) : ""
                                    break;
                                }
                                case "playwright": {
                                    driver = await playwrightDriver.buildDriver(browser);
                                    // driver != null ? playwrightDriver.openURL(driver, url) : ""
                                    //driver != null ? playwrightDriver.googleSearch(driver, "Automation Technologies") : ""
                                    driver != null ? playwrightDriver.takeScreenShot(driver, browser, url , Set_Id ) : ""
                                    break;
                                }
                                default:
                                    console.log("Browser not detected in Index");
                                    pair.Result = false;
                                    break;
                            }
                            // -- validation and writing results
                            pair.Result = driver != null ? true : false;
                            pairs.Tool_BrowserPairs.push(pair);
                            await fs.writeFile("results.json", JSON.stringify(pairs, null, 2), (err) => {
                                if (err)
                                    console.log(err);
                                else {
                                    console.log(pair, " --- test successful ");
                                };
                            })

                        })();
                   }
               });
            });

        })();

       (function checkDirectories() {
        
            if (!fs.existsSync(__dirname+puppeteerDriver.dir_Puppeteer)) {
                fs.mkdir(__dirname +puppeteerDriver.dir_Puppeteer, err => { })
            }
            if (!fs.existsSync(__dirname+playwrightDriver.dir_Playwright)) {
                fs.mkdir(__dirname +playwrightDriver.dir_Playwright, err => { })
            }
            if (!fs.existsSync(__dirname+seleniumDriver.dir_Selenium)) {
                fs.mkdir(__dirname + seleniumDriver.dir_Selenium, err => { })
            }

        })();

     });
    });
    
    // -- validation of tool to acquire only for supported browser 
    function isValidMatch(tool, browser) {
        let seleniumSupported = ["chrome", "firefox", "MicrosoftEdge"];
        let playwrightSupported = ["chrome", "firefox", "webkit","MicrosoftEdge" ];
        let puppeteerSupported = ["chrome", "MicrosoftEdge"];

        if (tool == "selenium" && seleniumSupported.includes(browser)) { return true; }
        else if (tool == "playwright" && playwrightSupported.includes(browser)) { return true; }
        else if (tool == "puppeteer" && puppeteerSupported.includes(browser)) { return true; }
        return false;
    };

})();

         // .REFERENCE TABLE
        //          --chrome --firefox  --microsoft edge  --webkit
        // selenium    1            1             1         0
        // playwriter   1            1             0         1
        // puppeteer    1            0             1         0

// TO-REMOVE - Individual Test methods

// (async () => {
//     let driver = await playwrightDriver.buildDriver("");
//      //let val = await  playwrightDriver.openURL(driver,"https://sujathaiyer-7920.zcodeusers.com/pricing.html");
//     // console.log(val);
//     //playwrightDriver.googleSearch(driver,"Heyys");
//     playwrightDriver.takeScreenShot(driver,"chrome","https://sujathaiyer-7920.zcodeusers.com/pricing.html");
// })();

// (async () => {
//     let driver = await puppeteerDriver.buildDriver("chrome");
//     puppeteerDriver.openURL(driver, "https://sujathaiyer-7920.zcodeusers.com/pricing.html");
//    // puppeteerDriver.googleSearch(driver,"Heyys");
//     //puppeteerDriver.takeScreenShot(driver,"chrome","https://www.google.com");
// })();

// (async () => {
 
//     let driver = await seleniumDriver.buildDriver("chrome");
//  //seleniumDriver.openURL(driver, "https://sujathaiyer-7920.zcodeusers.com/pricing.html");
//    // DB.insertResult("selenium", "firefox", detected);
//    //seleniumDriver.googleSearch(driver,"Heyys");
//    seleniumDriver.takeScreenShot(driver,"chrome","https://sujathaiyer-7920.zcodeusers.com/pricing.html");
  
// })();
