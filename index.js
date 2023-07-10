const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Para o express usar EJS como View engine.
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});