import puppeteer from 'puppeteer';

export default (async function (pnr:number) {
    try{
        console.log('entered puppeteer');
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-gpu",
            ]
        });
        const page = await browser.newPage();
        await page.goto(`https://www.confirmtkt.com/pnr-status/${pnr}`);
        await page.screenshot({path : 'xyz.png'})
        // const seat = await page.evaluate(()=>{
        //     document.getElementsByClassName("")
        // })
        await browser.close();
        // process.exit()
    } catch(err){
        console.log('error' + err);
    }
})