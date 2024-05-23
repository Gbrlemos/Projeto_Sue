 //importar a biblioteca sequelize
 const Sequelize = require("sequelize");

 //Criando uma instância do Sequelize
 //Esta instância é uma conexxão com o banco Mysql
 const connection = new Sequelize("sue", "root", "", {
 host: "localhost",
 dialect: "mysql",
});

 module.exports = connection;
