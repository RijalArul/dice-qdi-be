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
      room_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      total_dice: {
        type: DataTypes.INTEGER,
        defaultValue: 4
      }
    },
    {
      sequelize,
      modelName: 'PlayDice'
    }
  )
  return PlayDice
}
