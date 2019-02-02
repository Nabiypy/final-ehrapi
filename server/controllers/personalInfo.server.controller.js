/**
 * Created by hanso on 01/02/2019.
 * Biological information server controller
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  PersonalInfo = require('../models/personal.info'),
  PersonalInfoServiceController = {};

// create Bioinfo controller
PersonalInfoServiceController.createPersonalInfo = function (req, res) {
  var body = req.body;
  console.log("post request body >>>", body);

  db.sync().then(function () {
    var newPersonalInfo = {
    userId: req.body.userId,
    bioInfoId: req.body.bioInfoId,
    levelOfEducation: req.body.levelOfEducation,
    spokenLanguages: req.body.spokenLanguages,
    profession: req.body.profession,
    maritalStatus: req.body.maritalStatus,
    noOfKids: req.body.noOfKids,
    religion: req.body.religion,
    emergencyNumbers: req.body.emergencyNumbers

    };

    return PersonalInfo.create(newPersonalInfo).then(function () {
      res.status(201)
         .json({message: 'new Personal info saved successfully'});
    });
  }).catch(function (error) {
    console.log(error);
    res.status(403).json({ message: 'an error occured saving Personal info' });
  });
}

// Read all Biological Info
PersonalInfoServiceController.getAllPersonalInfo = function (req, res) {
  PersonalInfo.findAll()
    .then(function (personalInfos) {
      res.status(200)
        .json(personalInfos);
      console.info('find all personalInfo load ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
//Read Biological info
PersonalInfoServiceController.getBioInfo = function (req, res) {
  PersonalInfo.findById(req.params.id)
    .then(function (personalInfo) {
      res.status(200)
        .json(personalInfo);
      console.log('error: false ', 'message: read single post ~', personalInfo);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
// Update Biological info
PersonalInfoServiceController.updateBioInfo = function (req, res) {
  PersonalInfo.update(req.body, {
    where: { id: req.params.id }
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
      console.log('updateRecords >>', updatedRecords)
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//delete Biological info
PersonalInfoServiceController.removePersonalInfo = function (req, res) {
  PersonalInfo.destroy({
    where: { id: req.params.id }
  })
    .then(function (deletedRecords) {
      res.status(200)
        .json(deletedRecords);
      console.log('error: false', 'message: deletedRecords ~ ', deletedRecords);
    })
    .catch(function (error) {
      res.status(500)
        .json(error);
      console.log('error: true ', 'message: ', error)
    });
}

module.exports = PersonalInfoServiceController;
