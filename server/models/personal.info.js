'use strict';
/**
 * Created by hanso on 01/02/2019.
 * Personal information model
 */

var Sequelize = require('sequelize'),
    config = require('../config'),
    db = require('./database');

var modelDefinition = {
      userId: { type: Sequelize.STRING, unique: true },
      bioInfoId: { type: Sequelize.STRING, allowNull: false},
      levelOfEducation: { type: Sequelize.STRING, allowNull: false, validate: { notEmpty: true } },
      spokenLanguages: { type: Sequelize.TEXT },
      profession: { type: Sequelize.STRING },
      maritalStatus: { type: Sequelize.STRING },
      noOfKids: { type: Sequelize.INTEGER},
      religion: { type: Sequelize.STRING },
      emergencyNumbers: { type: Sequelize.TEXT }
};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var PersonalInfoModel = db.define('personalinfo', modelDefinition, modelOptions);

function associate(models) {
  PersonalInfoModel.belongsTo(models.BioInfoModel,{onDelete: 'cascade'})
}
module.exports = PersonalInfoModel;
