'use strict';
/**
 * Created by hanso on 01/02/2019.
 * National Voters Identity model
 */

var Sequelize = require('sequelize'),
    config = require('../config'),
    db = require('./database');

var modelDefinition = {
      userId: { type: Sequelize.STRING, unique: true },
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
var VotesIdModel = db.define('voters', modelDefinition, modelOptions);

function associate(models) {
  VotesIdModel.belongsTo(models.BioInfoModel,{onDelete: 'cascade'})
}
module.exports = VotesIdModel;
