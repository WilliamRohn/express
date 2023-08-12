const puppeteer = require("puppeteer");

module.exports.launch = async function (userId) {
  let responseBody;
  puppeteer.launch({ headless: "new" }).then(async (browser) => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on("request", (req) => {
      if (req.resourceType() === 'xhr' && req.url().includes(`/search/${userId}`)) {
          req.continue();
        } else {
          req.abort();
      }
      console.log("req", req.resourceType());
      //   const response = request.response();
      //   if (request.redirectChain().length === 0) {
      //     // Because body can only be accessed for non-redirect responses.
      //     if (request.url().includes("/discover/search/")) {
      //       responseBody = await response.buffer();

      //     }
      //   }
      //   // You now have a buffer of your response, you can then convert it to string :
      //   console.log(responseBody);

      //   request.continue();
    });
    page.on("response", (res) => {
        console.log('res',res.statusText());
    })
    await page.goto(
      `https://www.douyin.com/search/${userId}?source=switch_tab&type=user`,
      { timeout: 0 }
    );
    await browser.close();
  });
  return responseBody;
};
