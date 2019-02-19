'use strict';
/**
 * Created by hanso on 01/02/2019.
 * Personal information model
 */

var Sequelize = require('sequelize'),
  config = require('../config'),
  db = require('./database');

var modelDefinition = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  userId: { type: Sequelize.STRING, unique: false },
  ehrUUID: { type: Sequelize.STRING, allowNull: false},
  levelOfEducation: { type: Sequelize.STRING, allowNull: false},
  spokenLanguages: { type: Sequelize.TEXT },
  profession: { type: Sequelize.STRING },
  maritalStatus: { type: Sequelize.STRING },
  noOfKids: { type: Sequelize.INTEGER },
  religion: { type: Sequelize.STRING },
  emergencyNumbers: { type: Sequelize.TEXT },

  familyContactOneName: { type: Sequelize.STRING },
  familyContactOneNumber: { type: Sequelize.STRING },
  familyContactOneRelationship: { type: Sequelize.STRING },
  familyContactTwoName: { type: Sequelize.STRING },
  familyContactTwoNumber: { type: Sequelize.STRING },
  familyContactTwoRelationship: { type: Sequelize.STRING },
  familyContactThreeName: { type: Sequelize.STRING },
  familyContactThreeNumber: { type: Sequelize.STRING },
  familyContactThreeRelationship: { type: Sequelize.STRING },

  nonFamilyContactOneName: { type: Sequelize.STRING },
  nonFamilyContactOneNumber: { type: Sequelize.STRING },
  nonFamilyContactOneRelationship:{ type: Sequelize.STRING },
  nonFamilyContactTwoName: { type: Sequelize.STRING },
  nonFamilyContactTwoNumber: { type: Sequelize.STRING },
  nonFamilyContactTwoRelationship: { type: Sequelize.STRING },
  nonFamilyContactThreeName: { type: Sequelize.STRING },
  nonFamilyContactThreeNumber: { type: Sequelize.STRING },
  nonFamilyContactThreeRelationship: { type: Sequelize.STRING },
  residentialAddress: { type: Sequelize.TEXT },
  digitalAddress: { type: Sequelize.STRING},
  latitude: { type: Sequelize.TEXT },
  longitude: { type: Sequelize.TEXT },
  employmentType: { type: Sequelize.TEXT },
  companyName: { type: Sequelize.TEXT },
  companyLocation: { type: Sequelize.TEXT },
  phoneNumber: { type: Sequelize.TEXT },
  geolocation: { type: Sequelize.TEXT }
};

// 2: The model options.
var modelOptions = {
  classMethods: {
    associate: associate
  }
};

// 3: Define the User model.
var PersonalInfoModel = db.define('personalinfo', modelDefinition, modelOptions);

function associate(models) {
  PersonalInfoModel.belongsTo(models.BioInfoModel, {foreignKey: 'bioInfoId'},{ onDelete: 'cascade' });
  PersonalInfoModel.belongsTo(models.UserModel, {foreignKey: 'userId'});
}
module.exports = PersonalInfoModel;
