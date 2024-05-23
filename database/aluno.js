const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Aluno
const Aluno = connection.define(
  'aluno',
  {
    id_Aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    aluno_Matricula: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    id_usuario_aluno_pk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id_Usuario',
      },
    },
    Recuperacao_id_Recuperacao: {
      type: DataTypes.INTEGER,
      allowNull: true, // Permitindo valor nulo para Recuperacao_id_Recuperacao
      references: {
        model: Recuperacao,
        key: 'id_Recuperacao',
      },
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
    tableName: 'aluno',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarAluno() {
  try {
    await Aluno.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Aluno:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Aluno e a função de sincronização
module.exports = {
  Aluno: Aluno,
  sincronizarAluno: sincronizarAluno,
};
