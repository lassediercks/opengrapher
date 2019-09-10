const createImage = require("./node/createImage.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || process.argv[2] || "3000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static("web"));

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

// app.post("/generate", async (req, res) => {
//   app.set("data", req.body);
//   console.log(req.body);
//   let url = `http://localhost:5000/displayPost`;
//   createImage(
//     url,
//     res,
//     parseInt(app.get("data").width),
//     parseInt(app.get("data").height)
//   );
// });

// app.get("/displayPost", function(req, res) {
//   res.render("./degah.ejs", {
//     html: app.get("data").html,
//     css: app.get("data").css,
//     width: app.get("data").width,
//     height: app.get("data").height
//   });
// });

app.listen(PORT);

console.log(`Server is running at http://localhost:${PORT}`);
