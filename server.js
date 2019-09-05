var express = require("express");
var app = express();
const puppeteer = require("puppeteer");

async function createImage(req, res) {
  console.log(`${req.params.content}${req._parsedUrl.search}`);

  let completeUrl = `${req.params.content}${req._parsedUrl.search}`;
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: parseInt(req.query.width, 10),
    height: parseInt(req.query.height, 10),
    deviceScaleFactor: 1
  });
  await page.goto(completeUrl, {
    waitUntil: "networkidle2"
  });

  let file = await page.screenshot({});
  res.contentType("image/png");
  console.log("created screenshot of ", completeUrl);

  await browser.close();

  res.status(200);
  res.send(file);
  res.end();
}

app.get("/generate/:content", async (req, res) => {
  console.log(req, res);
  createImage(req, res);
});

app.use("/", express.static("web"));

app.listen(process.env.PORT || 5000);
