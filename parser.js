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
            
            const freshArray = await page.$$(selectors.informationField+'> td')
            freshArray.pop()
            freshArray.pop()
            
            for(i=0;i<freshArray.length; i++){
                const element = freshArray[i]
                if (i==0){
                    console.log('info')
                }
                else if(i==freshArray.length-1){
                    const price = await element.evaluate(e=>e.firstElementChild.innerHTML,element)
                    console.log(price)
                }
                else{
                    const transit = await element.$('.transit')
                    const count = await element.$('.amois')
                    const tag = await element.$('.amono')
                    if(count){
                        const c= await page.evaluate(e=>e.innerHTML, count)
                        console.log(c)
                    }
                    else if(tag){
                        console.log(0)
                    }
                    if(transit){
                        await transit.click()
                        await page.waitForTimeout(2000)
                        const [date, count]= await page.$$eval(selectors.transitField+'> td',e=>e.map(e=>e.innerHTML))
                        console.log(date, count)
                        await page.click(selectors.transitFieldExit)
                    } 
                    else{
                        console.log('no transit')
                    }
                    await page.waitForTimeout(1000)
            }
                
            }
            await page.click(selectors.searchField)
            await page.keyboard.down( 'Control' );
            await page.keyboard.press( 'A' );
            await page.keyboard.up( 'Control' );
            await page.keyboard.press( 'Backspace' );
            
            await page.waitForTimeout(1000)
           
        } catch (error) {
            console.log(error)
        }

    }

    
})()