const puppeteer = require( 'puppeteer');
const selector = '#apicontent > ul > li';

(async () => {
    const browser = await puppeteer.launch({headless: 0});
    const page = await browser.newPage()
    await page.setViewport({width: 1000, height: 500})
    await page.goto('https://nodejs.org/dist/latest-v16.x/docs/api/')
    await page.waitForSelector(selector)
    // const r = await page.$$eval(selector, (links)=>{
    //     links = links.map(el => el.innerText)
	// 	return links;
    // }
    const e = await page.$(selector)
    await e.click()
    // await page.waitForTimeout(1000)
    // for(const i of e){
    //     await i.click()
        
    // }
}
)()
