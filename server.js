const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static("web"));

async function createImage(url, res, vpWidth, vpHeight) {
  console.log(`
  Url is ${url}
  Width is ${vpWidth}
  Height is ${vpHeight}
  res is ${[res]}`);
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
}

app.get("/generate/:content", async (req, res) => {
  let completeUrl = `${req.params.content}${req._parsedUrl.search}`;
  createImage(
    completeUrl,
    res,
    parseInt(req.query.width, 10),
    parseInt(req.query.height, 10)
  );
});

// posttest

app.post("/generate", async (req, res) => {
  app.set("data", req.body);
  console.log(req.body);
  let url = `http://localhost:5000/displayPost`;
  createImage(
    url,
    res,
    parseInt(app.get("data").width),
    parseInt(app.get("data").height)
  );
});

app.get("/displayPost", function(req, res) {
  res.render("./degah.ejs", {
    html: app.get("data").html,
    css: app.get("data").css,
    width: app.get("data").width,
    height: app.get("data").height
  });
});

app.listen(process.env.PORT || process.argv[2] || "3000");
