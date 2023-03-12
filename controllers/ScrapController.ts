import puppeteer from "puppeteer";

interface SeatStatus {
  currentStatus: string;
  bookingStatus: string;
  coachNumber: string;
}

interface AllSeats {
  status: SeatStatus[];
}

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

export default (async function (pnr: number) {
  //try entering puppeteer
  try {
    console.log("entered puppeteer");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-gpu"],
    });
    const page = await browser.newPage();
    await page.goto(`https://www.confirmtkt.com/pnr-status/${pnr}`); //going to the url and fetching the status
    await page.screenshot({ path: "xyz.png" }); //taking a screenshot

    //trying to getthe confirm-c elements
    try {
      //$$ acts as querySelectorAll
      // const currentStatusElements = await page.$$(".confirm-c");
      // // console.log(currentStatusElements.length===0);
      // //if confirm-c is not found,
      // if (currentStatusElements.length !== 0) {
      //   /**
      //    * We are using Promise.all() and elementHandle.evaluate()
      //    * to evaluate the textContent property of each element. This returns an array of Promises that
      //    * resolve to the text content of each element. We are then using Promise.all() again to wait
      //    * for all Promises to resolve and return an array of all text content for elements with the
      //    * class name "confirm-c".
      //    */

      //   //this will remain an array of the text inside "current status"
      //   const currentStatus =
      //   //replaced the promise.all with aysnc await inside map function. the old code is below
      //     currentStatusElements?.map(async (element) => {
      //       return await element.evaluate((el) => el.textContent);
      //     })

      //     console.log(currentStatus);
      // } else{
      const tableData = await page.$$("table tr td");
      // select the table you want to scrape

      /**
         * const currentStatus = await Promise.all(
          currentStatusElements?.map((element) => {
            return element.evaluate((el) => el.textContent);
          })
        );
         */
      const allSeats: AllSeats = {
        status: [
          // [ 'CNF S3 65', 'CNF S3 65', '0' ] currrent status, booking status, coach number
        ],
      };
      if (tableData) {
        // const text = await Promise.all([
        //   currentSeats[1].evaluate((node) => node.innerText), //current status
        //   currentSeats[2].evaluate((node) => node.innerText), //booking status
        // ]);
        // console.log(text);
        // console.log(currentSeats.length);
        for (let i = 0; i < tableData.length; i = i + 4) {
          let status = await Promise.all([
            tableData[i + 1]?.evaluate((node) => node.innerText),
            tableData[i + 2]?.evaluate((node) => node.innerText),
            tableData[i + 3]?.evaluate((node) => node.innerText),
          ]);
          // console.log(status[0].includes("\n"));
          //preventing failed pages to load
          if (status[0].includes("\n")) {
            return {
              status: 404,
              message: "seat not found",
            };
          }
          //storing all all the seat status
          const seatStatus: SeatStatus = {
            currentStatus: status[0],
            bookingStatus: status[1],
            coachNumber: status[2],
          };

          allSeats.status.push(seatStatus);
        }
      }

      /**
       * for confirmed tickets - sometimes it is CNF or CNF S5 14 - need to figure out a solution
       * for WL with chart not prepared - getting the status back
       *      ***solution - get the chart status beforehand.
       * if the chart is not perpared and the status wl, do not calculate. instead send "chart not prepared"
       * if the chart is prepared and the status is wl, do not calculate. send the status
       */

      /**
       * there are two scenarios
       * 1. confirm-c is CNF if the ticket is already confirmed
       * 2. confirm-c gives seat number and all when it is rac/wl
       * confirm-c gives the current status
       * booking stat
       */
      return allSeats;
    } catch (err) {
      console.log(`the error is - ${err}`);
    }
    await browser.close();
    return {
      status: 404,
      message: "seat not found",
    };

    // process.exit()
  } catch (err) {
    console.log("error" + err);
  }
});

/**
 *           
 * IMPORTANT NOTE HERE
 * elements by class and id has be to done using promise.all
 * if it is not included, they output unresolved promises. While getting elements using their tags,
 * we are able to loop over them get their text
 * 
 * 
 * 
 * 
         * No, we cannot replace the Promise.all line with element.evaluate() in this case because we need to get the text content of multiple elements at once.
Using element.evaluate() in a loop to get the text content of each element one at a time would be less efficient than using Promise.all because it would require waiting for each promise to resolve before moving on to the next one. With Promise.all, we can get the text content of all the elements at once and wait for all the promises to resolve in parallel.
Therefore, we should continue using Promise.all in this case to get the text content of multiple elements at once.
  
 * old code for curentStatus
 * const currentStatus = await Promise.all(
          currentStatusElements?.map((element) => {
            return element.evaluate((el) => el.textContent);
          })
        );
 */
// const table = await page.$("table");

// if (table) {
//   // Check if the table is not null
//   // get all the rows in the table
//   const rows = await table.$$("tr");

//   // loop through each row and get the text inside the td tags
//   for (const row of rows) {
//     const cells = await row.$$("td");
//     for (const cell of cells) {
//       const text = await cell.evaluate((node) => node.innerText);
//       console.log(text);
//     }
//   }
// } else {
//   console.log("Table not found.");
// }
