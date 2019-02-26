'use strict';
/**
 * Created by hanso on 26/02/2019.
 * Ambulance model
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
    userId: { type: Sequelize.STRING},
    requestType: {type: Sequelize.STRING, defaultValue: 'self'},
    ailment: {type: Sequelize.STRING},
    latitude: {type: Sequelize.STRING},
    longitude: {type: Sequelize.STRING},
    geolocation: {type: Sequelize.TEXT},
    otherInfo: { type: Sequelize.TEXT}

};

// 2: The model options.
var modelOptions = {
    classMethods: {
        associate: associate
    }
};

// 3: Define the User model.
var AmbulanceModel = db.define('ambulance', modelDefinition, modelOptions);

function associate(models) {
    AmbulanceModel.belongsTo(models.UserModel, {onDelete: 'cascade'})
    AmbulanceModel.belongsTo(models.AilmentModel, {onDelete: 'cascade'})

}

module.exports = AmbulanceModel;
