'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Room.hasMany(models.PlayDice, {
        foreignKey: 'room_id'
      })
    }
  }
  Room.init(
    {
      current_player: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      max_player: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 1,
          max: 4
        }
      },
      user_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Room',
      underscored: true
    }
  )
  return Room
}
