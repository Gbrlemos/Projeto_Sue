const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Coordenador
const Coordenador = connection.define(
  'coordenador',
  {
    id_Coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    coordenador_Matricula: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    id_usuario_coord_pk: {
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
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Coordenador e a função de sincronização
module.exports = {
  Coordenador: Coordenador,
  sincronizarCoordenador: sincronizarCoordenador,
};
