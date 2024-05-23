const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Professor_has_Disciplina
const Professor_has_Disciplina = connection.define(
  'professor_has_disciplina',
  {
    Professor_id_Professor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Professor',
        key: 'id_Professor',
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
    tableName: 'professor_has_disciplina',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarProfessor_has_Disciplina() {
  try {
    await Professor_has_Disciplina.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Professor_has_Disciplina:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Professor_has_Disciplina e a função de sincronização
module.exports = {
  Professor_has_Disciplina: Professor_has_Disciplina,
  sincronizarProfessor_has_Disciplina: sincronizarProfessor_has_Disciplina,
};
