const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

// Para o express usar EJS como View engine.
app.set("view engine", "ejs");

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})