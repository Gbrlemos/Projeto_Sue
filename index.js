const express = require ('express')
const app = express()

app.set("view engine", "ejs");

const port = 3000;
const connection = require("./database/database");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const disciplina = require("./database/disciplina");
//importando e chamando os modulos disciplina, recuperacao e usuario
//chamando a funcao dentro de cada modulo
//const disciplina = require("./database/disciplina");
//disciplina1 = disciplina.sincronizarDisciplina();

const usuario = require("./database/usuario");
usuario1 = usuario.sincronizarUsuario();

const recuperacao = require("./database/recuperacao");
recuperacao1 = recuperacao.sincronizarRecuperacao();

/*
let pessoa = [
    {
        nome: "Gabriel",
        idade: "25"
    },
    {
        nome: "Rodrigo",
        idade: "40"
    },
    {
        nome: "Ana",
        idade: "29"
    }
]

app.get("/pessoas", (req, res) => {
    res.render("pessoas", { pessoas: pessoa})
});

//testando a conexão
connection
.authenticate()
.then(() => {
    console.log("conexão feita com o banco de dados!");
})
.catch((msgErro) => {
    console.log(msgErro)
});
*/

app.get("/disciplinas", (req, res) => {
  res.render('/disciplinas');
})

module.exports = app;
/*
app.get("/disciplinas", (req, res) => {
    disciplina.findAll({
      raw: true,
      order: [
        ["id_disciplina", "DESC"], // ASC = Crescente || DESC = Decrescente
      ],
    }).then((disciplinas) => {
      res.render("cad_disciplinas", {
        disciplinas: disciplinas,
      });
    });
  });
  
  // Rota para inserir dados na tabela
  app.post("/editar_disciplina", async (req, res) => {
    const { nome_disciplina, carga_horaria, descricao_disciplina, action } =
      req.body;
    const id = req.params.id;
    console.log(
      "****Dados disciplina: => ESTOU EM /editar_disciplina",
      nome_disciplina,
      carga_horaria,
      descricao_disciplina,
      action,
      id
    );
    // ESTA INCLUSÃO ESTÁ FUNCIONANDO
    if (action === "incluir") {
      try {
        //const { nome_disciplina, carga_horaria, descricao_disciplina } = req.body;
        const id = req.params.id;
        await disciplina.create({
          nome_disciplina,
          carga_horaria,
          descricao_disciplina,
        });
        //res.status(201).json(disciplina);
        res.status(201).redirect("/disciplinas");
      } catch (error) {
        console.error(
          "Erro ao inserir dados PARA A DISCIPLINA: /editardisciplina",
          error
        );
        res.status(500).json({
          error: "Erro ao inserir dados PARA A DISCIPLINA. /editardisciplina",
        });
      }
    }
    // A ALTERAÇÃO ESTÁ FUNCINANDO
    if (action === "alterar") {
      try {
        const {
          nome_disciplina,
          carga_horaria,
          descricao_disciplina,
          id_disciplina,
        } = req.body;
        const id = id_disciplina;
        //const id = req.params.id;
        const disciplina = await disciplina.findByPk(id);
        if (!disciplina) {
          return res.status(404).json({
            error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
          });
        }
        disciplina.nome_disciplina = nome_disciplina;
        disciplina.carga_horaria = carga_horaria;
        disciplina.descricao_disciplina = descricao_disciplina;
        await disciplina.save();
        res.status(201).redirect("/disciplinas");
      } catch (error) {
        console.error(
          `Erro ao ALTERAR dados PARA A DISCIPLINA: /editardisciplina ${nome_disciplina}`,
          error
        );
        res.status(500).json({
          error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editardisciplina ${nome_disciplina}`,
        });
      }
    }
  });
  
  
  // Rota para excluir dados da tabela
  // ESTA FUNCIONA. iNCLUIR Mensagem de operação BEM SUCEDIDA.
  app.post("/excluir_disciplina/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const disciplina = await disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
      }
      // PARA EXCLUIR A DISCIPLINA COM A CHAVE INFORMADA
      await disciplina.destroy({
        where: {
          id_disciplina: id,
        },
      });
      res.redirect("/disciplinas");
      //res.json({ message: "Disciplina excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir dados:", error);
      res
        .status(500)
        .json({ error: "Erro ao excluir dados da tabela de disciplina." });
    }
  }); 

  */

app.listen(port, () => {
        console.log(`O servidor foi iniciado com sucesso na porta http://127.0.0.1:${port}`);
});