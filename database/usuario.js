// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Usuario = connection.define(
  "usuario",
  {
    id_Usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Usuario_nome: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Usuario_cpf: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Usuario_data_nasc: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Usuario_telefone: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    Usuario_email: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "usuario", // Nome da tabela no banco de dados
  }
);

async function sincronizarUsuario() {
  try {
    await Usuario.sync({ force: false });
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
    Usuario: Usuario,
    sincronizarUsuario: sincronizarUsuario
  }; 
