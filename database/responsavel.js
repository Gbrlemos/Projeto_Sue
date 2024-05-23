const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente
const { Usuario } = require('./Usuario'); // Importando a tabela Usuario definida anteriormente

// Definição da tabela Responsavel
const Responsavel = connection.define(
  'responsavel',
  {
    id_Responsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario_responsavel_pk: {
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
    tableName: 'responsavel',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarResponsavel() {
  try {
    await Responsavel.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Responsavel:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Expo
