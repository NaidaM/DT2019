const puppeteer = require('puppeteer')

const BASE_URL = "https://www.instagram.com/accounts/login/?hl=fr"
const TAG_URL = "https://www.instagram.com/explore/tags/outfit/"

const instagram = {
	browser: null,
	page: null,
	initialize: async () => {
		browser = await puppeteer.launch({headless:false,slowMo:10})
		page = await browser.newPage()
		await page.goto(BASE_URL, {waitUntil:'networkidle0'})
	},
	login: async () => {
		await page.focus('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(2) > div > label > input')
		await page.keyboard.type('user')
		await page.focus('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(3) > div > label > input')
		await page.keyboard.type('password')
		await page.click('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4) > button')
		await page.waitForNavigation({ waitUntil: 'networkidle2' })
	},
	like: async () => {
		await page.goto(TAG_URL, {waitUntil:'networkidle0'})
		let [img] = await page.$x('/html/body/span/section/main/article/div[2]/div/div[1]/div[1]/a/div')
		if(img) img.click();
		for (var i = 0 ; i<3 ; i++) {
			await page.waitFor(1500)
			let [heart] = await page.$x('/html/body/div[3]/div[2]/div/article/div[2]/section[1]/span[1]/button')
			if(heart) heart.click();
			let [next] = await page.$x('/html/body/div[3]/div[1]/div/div/a[2]')
			if(next) next.click();
		}	
	}
}

module.exports=instagram;
