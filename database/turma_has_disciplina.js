const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Turma_has_Disciplina
const Turma_has_Disciplina = connection.define(
  'turma_has_disciplina',
  {
    Turma_id_Turma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Turma',
        key: 'id_Turma',
      },
    },
    Disciplina_id_Disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Disciplina',
        key: 'id_Disciplina',
      },
    },
  },
  {
    tableName: 'turma_has_disciplina',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarTurma_has_Disciplina() {
  try {
    await Turma_has_Disciplina.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Turma_has_Disciplina:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Turma_has_Disciplina e a função de sincronização
module.exports = {
  Turma_has_Disciplina: Turma_has_Disciplina,
  sincronizarTurma_has_Disciplina: sincronizarTurma_has_Disciplina,
};
