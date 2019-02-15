'use strict';
/**
 * Created by hanso on 01/02/2019.
 * International Passport model
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
      bioInfoId: { type: Sequelize.STRING, allowNull: false},
      firstName: { type: Sequelize.STRING},
      lastName: { type: Sequelize.STRING},
      idType: { type: Sequelize.STRING},
      idNumber: { type: Sequelize.STRING},
      expiredDate: { type: Sequelize.DATE}
};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var PassportModel = db.define('passport', modelDefinition, modelOptions);

function associate(models) {
  PersonalInfoModel.belongsTo(models.BioInfoModel,{onDelete: 'cascade'})
}
module.exports = PassportModel;
