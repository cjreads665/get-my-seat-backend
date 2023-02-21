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
        await page.goto(`https://www.confirmtkt.com/pnr-status/${pnr}`); //going to the url and fetching the status
        await page.screenshot({path : 'xyz.png'}) //taking a screenshot

        
        try{

            // data-bind="text: BookingStatus" <- to target for status
            const text = await page.evaluate(className => {
                /**currently trying to get all the seats instead of one */
                return document.querySelectorAll(className)[0].textContent;
              }, '[data-bind="text: BookingStatus"]'); //getting all the elements with the classname in an array 
            await browser.close();
            const seats = text?.split(' ')
            return {
                status : 200,
                message : seats
            }
        } catch(err){
            // console.log(5);
            await browser.close();
            return {
                status : 404,
                message : "seat not found"
            }
        }
        
        // process.exit()
    } catch(err){
        console.log('error' + err);
    }
})