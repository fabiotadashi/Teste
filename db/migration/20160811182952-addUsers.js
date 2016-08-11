'use strict';

module.exports = {
up: function (queryInterface, Sequelize) {
    queryInterface.bulkInsert('User', [
      { name: "User 1", password: "Teste" , createdAt: new Date(), updatedAt: new Date()},
      { name: "User 2", password: "Teste1", createdAt: new Date(), updatedAt: new Date()},
    ]);
},
  down: function(queryInterface, Sequelize) {
    queryInterface.bulkDelete('User', { name: {$in: ['User 1','User 2']} }, {}, {primaryKeys:[],primaryKeyAttributes:[]});
  }
};