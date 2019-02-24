'use strict';
/**
 * Created by hanso on 01/02/2019.
 * National Voters Identity model
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
    userId: {type: Sequelize.STRING, unique: false},
    ehrUUID: {type: Sequelize.STRING, allowNull: false},
    firstName: {type: Sequelize.STRING},
    lastName: {type: Sequelize.STRING},
    fullName: {type: Sequelize.STRING},
    idType: {type: Sequelize.STRING},
    idNumber: {type: Sequelize.STRING},
    expiredDate: {type: Sequelize.DATE},
    picture: {type: Sequelize.STRING}

};

// 2: The model options.
var modelOptions = {
    classMethods: {
        associate: associate
    }
};

// 3: Define the User model.
var VotesIdModel = db.define('voters', modelDefinition, modelOptions);

function associate(models) {
    VotesIdModel.belongsTo(models.BioInfoModel, {onDelete: 'cascade'})
}

module.exports = VotesIdModel;
