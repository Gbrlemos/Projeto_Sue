const express = require ('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3000;
const connection = require("./database/database");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

const Curso = require("./database/Curso");
const Coordenador = require('./database/Coordenador');

//rotas coordenador
app.get('/cad_coordenador', async (req, res) => {
  try {
    const coordenador = await Coordenador.findAll();
    res.render('cad_coordenador', { coordenador });
  } catch (error) {
    console.error('Erro ao carregar coordenadores', error);
    res.status(500).send('Erro ao carregar coordenadores');
  }
});


app.post('/cad_coordenador', async (req, res) => {
  const { nome_coordenador , email_coordenador , cel_coordenador } = req.body;
  try {
    const novoCoordenador = await Coordenador.create ({
      nome_coordenador,
      email_coordenador,
      cel_coordenador
    });
    console.log('Coordenador criado com sucesso:', novoCoordenador.toJSON());
    res.redirect('cad_coordenador');
  } catch (error) {
    console.error('Erro ao cadastrar coordenador', error);
    res.status(500).send('Erro ao cadastrar coordenador');
  }
});

app.post('/deletar_coordenador/:id', async (req, res) =>{
  const id_coordenador = req.params.id;
  try {
    await Coordenador.destroy({where: {id_coordenador}});
    console.log('Coordenador deletado com sucesso');
    res.redirect('/cad_coordenador');
  } catch (error) {
    console.error('Erro ao deletar coordenador', error);
    res.status(500).send('Erro ao deletar coordenador');
  }
});



//rotas curso

app.get("/cad_curso", async (req,res) => {
    

    try {
      const curso = await Curso.findAll();

      res.render('cad_curso', { curso });
    } catch(error) {
      console.error('Erro ao carregar pagina de curso', error);
      res.status(500).send('Erro ao carregar pagina de curso');
    }

});

app.post("/cad_curso", async (req,res) => {
  const { id_curso , nome_curso, id_coordenador } = req.body;
  try {
    if (id_curso) {
      await Curso.update({ nome_curso, id_coordenador}, { where: { id_curso }});
    } else {
      await Curso.create({ nome_curso, id_coordenador });
    } 
    res.redirect("/cad_curso");
  } catch (error) {
    console.error('Erro ao criar/adicionar curso', error);
    res.status(500).send('Erro ao criar/editar curso');
  }
});



/*
const Disciplina = require("./database/Disciplina");
const DisciplinaCurso = require("./database/DisciplinaCurso");

// Rota para exibir todas as associações entre disciplinas e cursos
app.get("/disciplina_curso", async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    const disciplinas = await Disciplina.findAll();

    const disciplinaCursos = await DisciplinaCurso.findAll();
    res.render("cad_disciplina_curso", {
      disciplinaCursos,
      cursos,
      disciplinas,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de disciplinas e cursos:", error);
    res.status(500).send("Erro ao buscar associações de disciplinas e cursos.");
  }
});

// Rota para inserir ou editar uma associação entre disciplina e curso
app.post("/editar_disciplina_curso", async (req, res) => {
  try {
    const { curso, disciplina, action } = req.body;

    if (action === "incluir") {
      await DisciplinaCurso.create({
        id_curso: curso,
        id_disciplina: disciplina,
      });
      res.redirect("/disciplina_curso");
    } else if (action === "alterar") {
      const id_disciplina_curso = req.body.id_disciplina_curso;
      await DisciplinaCurso.update(
        { id_curso: curso, id_disciplina: disciplina },
        { where: { id_disciplina_curso } }
      );
      res.redirect("/disciplina_curso");
    } else {
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre disciplina e curso.");
  }
});

// Rota para excluir uma associação entre disciplina e curso
app.post("/excluir_disciplina_curso/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await DisciplinaCurso.destroy({ where: { id_disciplina_curso: id } });
    res.redirect("/disciplina_curso");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao excluir associação entre disciplina e curso.");
  }
});
*/
app.listen(port, () => {
        console.log(`O servidor foi iniciado com sucesso na porta http://127.0.0.1:${port}`);
});