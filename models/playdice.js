'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PlayDice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  PlayDice.init(
    {
      user_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      rest_of_shake: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: {
            args: [0],
            message: 'Jatah dadu anda habis'
          }
        }
      },
      rest_of_turn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      modelName: 'PlayDice'
    }
  )
  return PlayDice
}
