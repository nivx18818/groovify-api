"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tracks", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      artists: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify([]),
      },
      audioPreview: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify({ url: "" }),
      },
      image: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify([]),
      },
      releaseDate: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify({ isoString: "" }),
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tracks");
  },
};
