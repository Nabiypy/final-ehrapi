'use strict';
/**
 * Created by hanso on 01/02/2019.
 * Ailment model
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
      userId: { type: Sequelize.STRING, unique: true },
      bioInfoId: { type: Sequelize.STRING, allowNull: false},
      ailmentName: { type: Sequelize.STRING},
      ailmentType: { type: Sequelize.STRING},
};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var AilmentModel = db.define('ailment', modelDefinition, modelOptions);

function associate(models) {
  AilmentModel.belongsTo(models.BioInfoModel,{onDelete: 'cascade'})
}
module.exports = AilmentModel;
