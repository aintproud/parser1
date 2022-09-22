const selectors = require( "./selectors")
const puppeteer = require( 'puppeteer');
const json = require("./xlsx");
const login= "plevako.k.a@gmail.com"
const password = 'FdnjCthutq2017';

(async () => {
    const browser = await puppeteer.launch({headless: 0});
    const page = await browser.newPage()
    await page.setViewport({width: 1000, height: 500})
    await page.goto('https://sklad.autotrade.su/')

    //1
    try {
        await page.type(selectors.loginButton, login)
        await page.type(selectors.passwordButton, password)
        await page.click(selectors.registrationButton)

        await page.waitForTimeout(2000)
        await page.click(selectors.searchPage)
    }
    catch (error) {
        console.log(error)
    }

    for (const informationArray of json) {
        const number = informationArray[0]
        const code = informationArray[1]
        const name = informationArray[2]
        const producer = informationArray[3]
        //3
        try {
            await page.waitForTimeout(2000)
            await page.type(selectors.searchField, code)
            await page.click(selectors.searchButton)
            
            await page.waitForTimeout(2000)
            await page.waitForSelector(selectors.informationField)
            
            const elements = await page.$$(selectors.informationField+'> td')
            for(const element of elements){
                const transit = await element.$('.transit')
                if(transit){
                    await transit.click()
                    await page.waitForTimeout(2000)
                    const [date, count]= await page.$$eval(selectors.transitField+'> td',e=>e.map(e=>e.innerHTML))
                    console.log(date, count)

                } else{
                    awa
                    console.log('element isnt found')
                }
                await page.waitForTimeout(1000)
            }
                
            
           
        } catch (error) {
            console.log(3333)
        }

    }

    
})()