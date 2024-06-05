// models/Curso.js

const { DataTypes } = require('sequelize');
const connection = require('../database/database'); // Importe o arquivo database.js onde está a instância do Sequelize

const Curso = connection.define('curso', {
  id_curso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_curso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_coordenador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Supondo que você tenha uma tabela de Coordenador com o nome 'Coordenador'
    references: {
      model: 'coordenador',
      key: 'id_coordenador'
    }
  }
},
  {
    timestamps: true,
    tableName: 'curso',
  
});

async function sincronizarCurso() {
  try {
    await Curso.sync({ force: false });
    console.log('Tabela Curso sincronizada com sucesso.')
  } catch (error) {
    console.error('Erro ao sincronizar a tabela Curso:', error);
  }
}

module.exports = Curso;