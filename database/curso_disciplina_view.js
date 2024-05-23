const { DataTypes } = require('sequelize');
const connection = require ('./connection');

const CursoDisciplinaView = connection.define(   
    'curso_has_disciplina',
    {
        curso_id_Curso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
            model: 'curso',
            key: 'id_Curso',
        },
    },
        disciplina_id_Disciplina: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'disciplina',
                key: 'id_Disciplina'
            },
        },
    },
    {
        tableName: 'curso_has_disciplina',
    }
);

async function sincronizarCursoDisciplinaView() {
    try {
      await CursoDisciplinaView.sync({ force: false });
    } catch (error) {
      console.error('Erro ao sincronizar a tabela Professor_has_Disciplina:', error);
    }
}

module.exports = {
    CursoDisciplinaView: CursoDisciplinaView,
    sincronizarCursoDisciplinaView: sincronizarCursoDisciplinaView,
  };
  