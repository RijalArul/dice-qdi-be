'use strict'
const { Model } = require('sequelize')
const { generatePassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.Room, {
        foreignKey: 'user_id'
      })

      // User.hasMany(models.PlayDice, {
      //   foreignKey: 'user_id'
      // })
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        unique: {
          args: true,
          msg: 'Username already exists'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: {
            args: [6],
            msg: 'password minimal 6 character.'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      hooks: {
        beforeCreate (instance, options) {
          instance.password = generatePassword(instance.password)
        }
      }
    }
  )
  return User
}
