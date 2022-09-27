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

        const product = {}

        const number = informationArray[0]
        const code = informationArray[1] 
        product.code = code
        const name = informationArray[2] 
        product.name = name
        const producer = informationArray[3] 
        product.producer = producer 
        //3
        try {
            await page.waitForTimeout(2000)
            await page.type(selectors.searchField, code)
            await page.click(selectors.searchButton)
            
            await page.waitForTimeout(3000)
            
            const freshArray = await page.$$(selectors.informationField+'> td')
            freshArray.shift()
            freshArray.pop()
            freshArray.pop()
            
            const storages = []
            for(i=0;i<freshArray.length; i++){
                const element = freshArray[i]
                if (i==0){}
                else if(i==freshArray.length-1){
                    const price = await element.evaluate(e=>e.firstElementChild.innerHTML,element)
                    product.price = price
                    console.log('price: ' + price)
                }
                else{
                    function manager(i){
                        const literalObject = {
                            [1]: 'Артем (Фрунзе)',
                            [2]: 'Биробиджан (Пионерская)',
                            [3]: 'Благовещенск (Воронкова)',
                            [4]: 'Благовещенск (Театральная)',
                            [5]: 'Владивосток (Военное Шоссе)',
                            [6]: 'Владивосток (Камская)',
                            [7]: 'Владивосток (Кубанская)',
                            [8]: 'Комсомольск-на-Амуре (Кирова)',
                            [9]: 'Находка (Вторая)',
                            [10]: 'Уссурийск (Чичерина)',
                            [11]: 'Хабаровск (Индустриальная, 1)',
                            [12]: 'Хабаровск (Индустриальная, ТЦ Универсал)',
                            [13]: 'Хабаровск (Металлистов)'
                        }
                        return literalObject[i]
                    }
                    const storage = {
                        location: manager(i)
                    }
                    
                    
                    const transit = await element.$('.transit')
                    const count = await element.$('.amois')
                    const tag = await element.$('.amono')//проверка на прочерк
                    if(count){
                        const c= await page.evaluate(e=>e.innerHTML, count)
                        storage.count = +c
                    }
                    else if(tag){
                        storage.count = 0
                    }
                    if(transit){
                        await transit.click()
                        await page.waitForTimeout(2000)
                        const [date, count]= await page.$$eval(selectors.transitField+'> td',e=>e.map(e=>e.innerHTML))
                        storage.transit = {date: date, count: count}
                        await page.click(selectors.transitFieldExit)
                    } 
                    storages.push(storage)
                    console.log(storage)
                    await page.waitForTimeout(1000)
            }
                
        }

        product.storages = storages
        console.log(product)


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