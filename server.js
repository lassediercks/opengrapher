var express = require("express");
var app = express();
let url = process.env ? "http://csstoimg.herokuapp.com/" : "http://localhost:3000"
const validUrl = require("valid-url");
const puppeteer = require("puppeteer");

async function createImage(req, res) {
  let file;
  console.log(`${req.params.content}+${req._parsedUrl.search}`);

  if (validUrl.isUri(req.params.content)) {
    const browser = await puppeteer.launch({
      args: ["--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: parseInt(req.query.width, 10),
      height: parseInt(req.query.height, 10),
      deviceScaleFactor: 1
    });
    await page.goto(`${req.params.content}${req._parsedUrl.search}`, {
      waitUntil: "networkidle2"
    });

    file = await page.screenshot({});
    res.contentType("image/png");
    console.log("created screenshot of ", req.url);

    await browser.close();

    res.status(200);
    res.send(file);
    res.end();
  } else {
    res.status(400).send("test");
    res.end();
  }
}

app.get("/generate/:content", async (req, res) => {
  console.log(req, res);
  createImage(req, res);
});

app.use("/", express.static("web"));

app.listen(process.env.PORT || 5000);
