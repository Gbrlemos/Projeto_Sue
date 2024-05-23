const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Aluno_has_Turma
const Aluno_has_Turma = connection.define(
  'aluno_has_turma',
  {
    Aluno_id_Aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Aluno',
        key: 'id_Aluno',
      },
    },
    Turma_id_Turma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Turma',
        key: 'id_Turma',
      },
    },
    Turma_Curso_id_Curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Curso',
        key: 'id_Curso',
      },
    },
    Turma_Curso_Coordenador_id_Coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Coordenador',
        key: 'id_Coordenador',
      },
    },
  },
  {
    tableName: 'aluno_has_turma',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarAluno_has_Turma() {
  try {
    await Aluno_has_Turma.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Aluno_has_Turma:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Aluno_has_Turma e a função de sincronização
module.exports = {
  Aluno_has_Turma: Aluno_has_Turma,
  sincronizarAluno_has_Turma: sincronizarAluno_has_Turma,
};
