const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
  Pergunta.findAll({raw: true, order: [
    ["id", "DESC"]
  ]}).then(perguntas => {
    res.render("index", {
      perguntas: perguntas
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined) {
      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [["id", "DESC"]]
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      });
    }else {
      res.redirect("/")
    }
  })
});

app.post("/salvarpergunta", (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() =>{
    res.redirect("/");
  });
});

app.post("/responder", (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect("/pergunta/"+perguntaId);
  })
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
