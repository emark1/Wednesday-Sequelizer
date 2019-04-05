'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addColumn(
     'Comments',
     'postId',{
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: 'Posts',
         key: 'id'
       }
     }
   )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   queryInterface.removeColumn(
     'Comments',
     'postId'
   )
  }
};
