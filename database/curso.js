const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Curso
const Curso = connection.define(
  'curso',
  {
    id_Curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Curso_nome: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Coordenador_id_Coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Coordenador,
        key: 'id_Coordenador',
      },
    },
    Curso_valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
    tableName: 'curso',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarCurso() {
  try {
    await Curso.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Curso:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Curso e a função de sincronização
module.exports = {
  Curso: Curso,
  sincronizarCurso: sincronizarCurso,
};
