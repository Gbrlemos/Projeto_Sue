// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Recuperacao = connection.define(
  "recuperacao",
  {
    id_Recuperacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Recuperacao_valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "recuperacao", // Nome da tabela no banco de dados
  }
);

async function sincronizarRecuperacao() {
  try {
    await Recuperacao.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  }
   /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

//Disciplina.sync({ force: false }).then(() => {});

//module.exports = Disciplina;
//module.exports = sincronizarDisciplina();

 module.exports = {
    Recuperacao: Recuperacao,
    sincronizarRecuperacao: sincronizarRecuperacao
  }; 
