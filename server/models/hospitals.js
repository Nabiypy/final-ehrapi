'use strict';
/**
 * Created by hanso on 01/02/2019.
 * Physicians model
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
      hospitalFullName: { type: Sequelize.STRING},
      branches: { type: Sequelize.TEXT},
      location: { type: Sequelize.STRING},
      history: { type: Sequelize.TEXT}

};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var HospitalModel = db.define('hospital', modelDefinition, modelOptions);

function associate(models) {
    HospitalModel.hasMany(models.DoctorsModel,{onDelete: 'cascade'})
    HospitalModel.belongsTo(models.BioInfoModel,{onDelete: 'cascade'})
}
module.exports = HospitalModel;
