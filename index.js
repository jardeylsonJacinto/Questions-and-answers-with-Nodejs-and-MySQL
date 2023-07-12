const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados");
  })
  .catch((error) => {
    console.log("Error: " + error);
  });

const PORT = process.env.PORT || 3000;

// Para o express usar EJS como View engine.
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  res.send(`formulario recebido! Titulo: ${titulo}, descrição ${descricao}`);
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
