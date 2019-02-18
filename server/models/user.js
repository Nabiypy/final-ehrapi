//Staff model.
'use strict';

var Sequelize = require('sequelize'),
    bcrypt = require('bcryptjs'),
    config = require('../config'),
    db = require('./database');

// 1: The model schema.
var modelDefinition = {
  id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
  },
  firstName: { type: Sequelize.STRING},
  lastName: { type: Sequelize.STRING},
  middleName: { type: Sequelize.STRING},
  email:{ type: Sequelize.STRING, unique: true, allowNull: false },
  username: { type: Sequelize.STRING, unique: false, allowNull: false },
  phoneNumber:{ type: Sequelize.TEXT, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false},
  gravatar: { type: Sequelize.BLOB('long') },
  status: {type: Sequelize.BOOLEAN, defaultValue: true },
  role: {type: Sequelize.STRING, defaultValue: config.userRoles.user},
  tokenDate: { type: Sequelize.DATE },
  email_confirmed: { type: Sequelize.BOOLEAN },
  mobile_confirmed: { type: Sequelize.BOOLEAN, defaultValue: false},
  secret: { type: Sequelize.STRING},
  last_secret_date: { type: Sequelize.STRING},
  blocked: {type: Sequelize.STRING, defaultValue: false },
};

// 2: The model options.
var modelOptions = {
  instanceMethods: {
    comparePasswords: comparePasswords,
    toProfileJsonFor: toProfileJsonFor
  },
  hooks: {
    beforeValidate: hashPassword
  },
  classMethods:{
    associate: associate
  }
};


// 3: Define the User model.
var UserModel = db.define('user', modelDefinition, modelOptions);

// Compares two passwords.
function comparePasswords(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if(error) {
      return callback(error);
    }
    return callback(null, isMatch);
  });
}

function toProfileJsonFor() {
  return{
    username: this.username,
    firstName: this.firstName,
    middleName: this.middleName,
    lastName: this.lastName,
    phoneNumber: this.phoneNumber,
    email: this.email,
    gravatar: this.gravatar,
  }
}

// Hashes the password for a user object.
function hashPassword(user) {
  if(user.changed('password')) {
    return bcrypt.hash(user.password, 10).then(function(password) {
      user.password = password;
    });
  }
}

function associate(models) {
  //A User can have many Makes.
  UserModel.hasMany(models.BioInfoModel, {onDelete: 'cascade'});
  UserModel.hasMany(models.PersonalInfoModel, {onDelete: 'cascade'});
  UserModel.hasMany(models.MedicalHistoryModel, {onDelete: 'cascade'});
  UserModel.hasMany(models.AilmentModel); 
  UserModel.hasMany(models.DoctorsModel); 

}

module.exports = UserModel;
