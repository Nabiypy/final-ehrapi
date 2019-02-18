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
      userId: { 
        type: Sequelize.STRING, 
        references: { model: "user", key: "id"}
      },
      bioInfoId: { 
        type: Sequelize.STRING, 
        allowNull: false,
        references: { model: "bioinfo", key: "id"}
      },
      doctorFullName: { type: Sequelize.STRING},
      doctorFirstName: { type: Sequelize.STRING},
      doctorLastName: { type: Sequelize.STRING},
      location: { type: Sequelize.STRING},
      currentWorkPlace: { type: Sequelize.STRING },
      hospital: { type: Sequelize.String}

};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model.
var DoctorsModel = db.define('doctors', modelDefinition, modelOptions);

function associate(models) {
  DoctorsModel.belongsTo(models.UserModel,{onDelete: 'cascade'})
  DoctorsModel.belongsTo(models.BioInfoModel,{onDelete: 'cascade'})

}
module.exports = DoctorsModel;
