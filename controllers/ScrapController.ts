import puppeteer from 'puppeteer';

function getSeatPosition(seatNumber: number): string {
    if (seatNumber % 8 === 1 || seatNumber % 8 === 4) {
        return "side lower";
    } else if (seatNumber % 8 === 3 || seatNumber % 8 === 6) {
        return "lower";
    } else if (seatNumber % 8 === 5) {
        return "middle";
    } else if (seatNumber % 8 === 2 || seatNumber % 8 === 7) {
        return "side upper";
    } else {
        return "upper";
    }
}



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
        const text = await page.evaluate(className => {
            return document.getElementsByClassName(className)[0].textContent;
          }, 'confirm-c');
        await browser.close();
        console.log(text?.split(' '));
        
        // process.exit()
    } catch(err){
        console.log('error' + err);
    }
})