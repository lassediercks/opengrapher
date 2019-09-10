const puppeteer = require("puppeteer");

const createImage = async (url, res, vpWidth, vpHeight) => {
  console.log(`
    Url is ${url}
    Width is ${vpWidth}
    Height is ${vpHeight}
    `);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: vpWidth,
    height: vpHeight,
    deviceScaleFactor: 1
  });
  await page.goto(url, {
    waitUntil: "networkidle2"
  });

  let file = await page.screenshot({});
  res.contentType("image/png");
  console.log("created screenshot of ", url);

  await browser.close();

  res.status(200);
  res.send(file);
  res.end();
};

module.exports = createImage;
