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
      allowNull: false,
      references: {
        model: 'UserModel',
        key: 'id'
      }
     },
     bioInfoId: {
         type: Sequelize.STRING,
         references: {
             model: 'BioInfoModel'
         }
     },
     lastHospitalVisited: { type: Sequelize.STRING },
     dateOfVisitation: { type: Sequelize.STRING },
     middleName: { type: Sequelize.STRING },
     diagnosis: { type: Sequelize.STRING },
     statusOfTreatment: { type: Sequelize.TEXT },
     medications: { type: Sequelize.TEXT },
     dateOfCompletion: { type: Sequelize.DATE },
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
  MedicalHistoryModel.belongsTo(models.UserModel,{foreignKey: 'userId'},{onDelete: 'cascade'});
  MedicalHistoryModel.hasMany(models.BioInfoModel, {onDelete: 'cascade'})
}
module.exports = MedicalHistoryModel;