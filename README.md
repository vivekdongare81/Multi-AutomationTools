
# Multi-Automation

A project consists of Web Automation using multiple Automation Libraries / tools with respective Supported browsers installed. <br/>

Tools/Tech used - Node.js, Express, ejs, mysql, Automation Tools/Libraries (Selenium, Playwright, Puppeteer-Stelth )

## Demo

- Setup a tools and browsers in config.json as per requirements and run project to perform web automation tasks on all supported browsers respectively.

![image](https://user-images.githubusercontent.com/74758376/170940938-534ae94f-9452-4f4e-b336-a319dc030d40.png)

  
        * Browse to given URL to record the tools-browser which gets detected.
        
![image](https://user-images.githubusercontent.com/74758376/170940621-4bc505c5-cf1c-4bf2-99ee-a3814f4abb67.png)

      * Take a Screenshot of pages on GET URL using tool, parallelly save the results in Database to analyze the data. 

![image](https://user-images.githubusercontent.com/74758376/170940348-101414d9-555f-4a76-be98-61daf28ef342.png)

     * Analyze Results according to date performed in Admin Panel.
![image](https://user-images.githubusercontent.com/74758376/170940792-655e3c53-6bc7-4854-935e-fba8a5fc063f.png)


- All Combinations of Tool-Browser with their test Status will be recorded in results.json

![image](https://user-images.githubusercontent.com/74758376/170771018-da3193f9-9623-47a5-a2d1-848b0d1b853c.png)

## Prerequisite 

- Node.js runtime environment 
     
     node -v  (to check Node.js is installed) 
- WebDriver of Browsers Installed - Chrome, Microsoft Edge, Firefox 


## Webdrivers

| WebDrivers             | Download Link                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Chrome| [https://chromedriver.chromium.org/downloads](https://chromedriver.chromium.org/downloads)|
| Firefox| https://github.com/mozilla/geckodriver/releases|
| Microsoft Edge |[https://developer.microsoft.com/en-us/microsoft-edge](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/#downloads)| |

 Move all Drivers in any specific folder and add this folder into PATH of Environmental Variables. <br />
-- Search for 'edit environmental variable' > Environmental variable > System variable > PATH <br />
-- Add a new folder's path in PATH.  <br />
![image](https://user-images.githubusercontent.com/74758376/170932144-40f6f187-fea2-46d2-8725-c8b5bca77f2e.png)


## Used Library / tools with supported browsers

| Library / Tools             |  Browsers                                                               |
| ----------------- | ------------------------------------------------------------------ |
| Selenium  |  Chrome, Firefox, Microsoft Edge |
| Playwright|  Chrome, Firefox, Webkit |
| Puppeteer |  Chrome, Microsoft Edge | |


## Installation to Run Locally


 -  Step 1 - Clone the project and navigate to the project directory
  
```bash
git init 
git clone < repo link >

```


  -  Step 2 - Install required Dependencies 

```bash
  npm install --save

```
![image](https://user-images.githubusercontent.com/74758376/170021068-62a60db1-28f2-4850-a123-d4415c7e5378.png)

 -  Step 3 - Run the project

```bash
  node index 

```



  -  Step 4 - Open admin panel to analysis test results 

```bash
  node admin 

```
URL - https://localhost:3000/admin

## Documentations

- [Selenium](https://www.selenium.dev/documentation)
- [Playwright](https://playwright.dev/docs/intro)
- [Puppeteer](https://pptr.dev)




