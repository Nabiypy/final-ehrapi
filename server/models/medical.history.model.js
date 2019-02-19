'use strict';
/**
 * Created by hanso on 01/02/2019.
 * Medical History model
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
     userId: {
      type: Sequelize.STRING,
      allowNull: false
     },
     ehrUUID: {type: Sequelize.STRING },
     lastHospitalVisited: { type: Sequelize.STRING },
     dateOfVisitation: { type: Sequelize.STRING },
     diagnosis: { type: Sequelize.TEXT },
     statusOfTreatment: { type: Sequelize.TEXT },
     medications: { type: Sequelize.TEXT },
     dateOfCompletion: { type: Sequelize.STRING },
     seenByDoctor: { type: Sequelize.TEXT }
};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var MedicalHistoryModel = db.define('medicalhistory', modelDefinition, modelOptions);

function associate(models) {
  MedicalHistoryModel.belongsTo(models.UserModel, {foreignKey: 'userId'});
  MedicalHistoryModel.hasMany(models.BioInfoModel)
}
module.exports = MedicalHistoryModel;
