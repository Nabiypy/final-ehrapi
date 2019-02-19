'use strict';
/**
 * Created by hanso on 01/02/2019.
 * Biological information model
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
     userId: { type: Sequelize.STRING },
     ehrUUID: { type: Sequelize.STRING, allowNull: false},
     fullName: { type: Sequelize.STRING, allowNull: false },
     firstName: { type: Sequelize.STRING },
     middleName: { type: Sequelize.STRING },
     lastName: { type: Sequelize.STRING },
     dateOfBirth: { type: Sequelize.STRING },
     passportPicture: { type: Sequelize.BLOB('long') },
     gender: { type: Sequelize.STRING },
     bloodType: { type: Sequelize.STRING },
     bloodDonor: { type: Sequelize.STRING },
     allergies: { type: Sequelize.TEXT },
     medications: { type: Sequelize.TEXT },
     infections: { type: Sequelize.TEXT },
     isHandicap: { type: Sequelize.BOOLEAN, defaultValue: false},
     sickleCellType: { type: Sequelize.STRING},
     NHISNumber: { type: Sequelize.TEXT},
     height: { type: Sequelize.STRING },
     weight: { type: Sequelize.STRING },
     bmi: { type: Sequelize.DOUBLE }
};

// 2: The model options.
var modelOptions = {
  classMethods:{
    associate: associate
  }
};

// 3: Define the User model
var BioInfoModel = db.define('bioinfo', modelDefinition, modelOptions);

function associate(models) {
  BioInfoModel.belongsTo(models.UserModel,{foreignKey: 'userId'},{onDelete: 'cascade'});
  BioInfoModel.hasMany(models.PersonalInfoModel, {foreignKey: 'personalinfoId'}, {onDelete: 'cascade'});
}

module.exports = BioInfoModel;
