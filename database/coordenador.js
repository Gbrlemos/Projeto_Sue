const { DataTypes } = require('sequelize');
const connection = require('./database'); // Importando a conexão de banco de dados existente

// Definição da tabela Coordenador
const Coordenador = connection.define('coordenador',{
    id_coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_coordenador: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email_coordenador: {
      type: DataTypes.STRING(100),
      allowNull: false,
      
    },
    cel_coordenador: {
      type: DataTypes.STRING(11),
      allowNull: false,
    }
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
    tableName: 'coordenador',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarCoordenador() {
  try {
    await Coordenador.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Coordenador:', error);
  }
}

sincronizarCoordenador();
// Exportando a tabela Coordenador e a função de sincronização
module.exports = Coordenador;