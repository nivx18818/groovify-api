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
      audio_preview: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify({ url: "" }),
      },
      image: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify([]),
      },
      release_date: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify({ isoString: "" }),
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tracks");
  },
};
