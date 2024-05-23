const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Professor
const Professor = connection.define(
  'professor',
  {
    id_Professor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    professor_Matricula: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    id_usuario_prof_pk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id_Usuario',
      },
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
    tableName: 'professor',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarProfessor() {
  try {
    await Professor.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Professor:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Professor e a função de sincronização
module.exports = {
  Professor: Professor,
  sincronizarProfessor: sincronizarProfessor,
};
