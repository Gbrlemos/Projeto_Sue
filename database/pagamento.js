const { DataTypes } = require('sequelize');
const connection = require('./connection'); // Importando a conexão de banco de dados existente

// Definição da tabela Pagamento
const Pagamento = connection.define(
  'pagamento',
  {
    id_Pagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Pagamento_valor_curso: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Pagamento_valor_recu: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Pagamento_vencimento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Pagamento_dataPagamento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Pagamento_valorPagamento: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Responsavel_id_Responsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Responsavel',
        key: 'id_Responsavel',
      },
    },
    Recuperacao_id_Recuperacao: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Recuperacao',
        key: 'id_Recuperacao',
      },
    },
    Curso_id_Curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Curso',
        key: 'id_Curso',
      },
    },
    Curso_Coordenador_id_Coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Coordenador',
        key: 'id_Coordenador',
      },
    },
  },
  {
    tableName: 'pagamento',
  }
);

// Função para sincronizar a tabela com o banco de dados
async function sincronizarPagamento() {
  try {
    await Pagamento.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Pagamento:', error);
  }
  // Código comentado para fechar a conexão, caso necessário em um ambiente diferente
  /* finally {
    await connection.close();
    console.log("Conexão fechada.");
  } */
}

// Exportando a tabela Pagamento e a função de sincronização
module.exports = {
  Pagamento: Pagamento,
  sincronizarPagamento: sincronizarPagamento,
};
