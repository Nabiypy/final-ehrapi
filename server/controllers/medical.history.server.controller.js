/**
 * Created by hanso on 01/02/2019.
 * Medical History server controller
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  MedicalHistory = require('../models/medical.history.model'),
  MedicalHistoryServiceController = {};

// create Bioinfo controller
MedicalHistoryServiceController.createMedicalHistory = function (req, res) {
  var body = req.body;
  console.log("post request body >>>", body);

  db.sync().then(function () {
    var newMedicalHistory = {
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

    return MedicalHistory.create(newMedicalHistory).then(function () {
      res.status(201)
         .json({message: 'new Personal info saved successfully'});
    });
  }).catch(function (error) {
    console.log(error);
    res.status(403).json({ message: 'an error occured saving Personal info' });
  });
}

// Read all Biological Info
MedicalHistoryServiceController.getAllMedicalHistory = function (req, res) {
  MedicalHistory.findAll()
    .then(function (MedicalHistorys) {
      res.status(200)
        .json(MedicalHistorys);
      console.info('find all MedicalHistory load ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//Read Biological info
MedicalHistoryServiceController.getBioInfo = function (req, res) {
  MedicalHistory.findById(req.params.id)
    .then(function (MedicalHistory) {
      res.status(200)
        .json(MedicalHistory);
      console.log('error: false ', 'message: read single post ~', MedicalHistory);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

// Update Biological info
MedicalHistoryServiceController.updateBioInfo = function (req, res) {
  MedicalHistory.update(req.body, {
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
MedicalHistoryServiceController.removeMedicalHistory = function (req, res) {
  MedicalHistory.destroy({
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

module.exports = MedicalHistoryServiceController;
