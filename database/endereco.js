const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Endereco
const Endereco = connection.define(
  'endereco',
  {
    id_Endereco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Endereco_cep: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    Endereco_rua: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Endereco_cidade: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Endereco_numero: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    id_usuario_ender_pk: {
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
    tableName: 'endereco',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarEndereco() {
  try {
    await Endereco.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Endereco:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Endereco e a função de sincronização
module.exports = {
  Endereco: Endereco,
  sincronizarEndereco: sincronizarEndereco,
};
