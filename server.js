var express = require("express");
var app = express();

const puppeteer = require("puppeteer");

async function createImage(req, res) {
  console.log(req);
  let file;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto(req.url, { waitUntil: "networkidle2" });

  file = await page.screenshot({});
  res.contentType("image/png");
  console.log("created screenshot of ", req.url);

  await browser.close();

  res.status(200);
  res.send(file);
  res.end();
}

app.get("/generate/:content", async (req, res) => {
  console.log(req);
  createImage(req);
});

app.use("/", express.static("web"));

app.listen(3000);
