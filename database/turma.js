const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Turma
const Turma = connection.define(
  'turma',
  {
    id_Turma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Turma_ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Curso_id_Curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Curso,
        key: 'id_Curso',
      },
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
    tableName: 'turma',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarTurma() {
  try {
    await Turma.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Turma:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Turma e a função de sincronização
module.exports = {
  Turma: Turma,
  sincronizarTurma: sincronizarTurma,
};
