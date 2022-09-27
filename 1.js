// const puppeteer = require( 'puppeteer');
// const selector = '#content > div > div.mainTabs > div.selector > div > div > a.realty';

// (async () => {
//     const browser = await puppeteer.launch({headless: 0});
//     const page = await browser.newPage()
//     await page.setViewport({width: 1000, height: 500})
//     await page.goto('https://www.farpost.ru/vladivostok/')
//     await page.waitForSelector(selector)

//     const e = await page.$(selector)
//     await e.click()
// }
// )()








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
console.log(manager(6))
