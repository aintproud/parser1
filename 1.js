const puppeteer = require( 'puppeteer');
const selector = '#content > div > div.mainTabs > div.selector > div > div > a.realty';

(async () => {
    const browser = await puppeteer.launch({headless: 0});
    const page = await browser.newPage()
    await page.setViewport({width: 1000, height: 500})
    await page.goto('https://www.farpost.ru/vladivostok/')
    await page.waitForSelector(selector)

    const e = await page.$(selector)
    await e.click()
}
)()
