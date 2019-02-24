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
            ehrUUID: req.body.ehrUUID,
            lastHospitalVisited: req.body.lastHospitalVisited,
            dateOfVisitation: req.body.dateOfVisitation,
            diagnosis: req.body.diagnosis,
            statusOfTreatment: req.body.statusOfTreatment,
            medications: req.body.medications,
            dateOfCompletion: req.body.dateOfCompletion,
            seenByDoctor: req.body.seenByDoctor

        };

        return MedicalHistory.create(newMedicalHistory).then(function (medi) {
            res.status(201).json({
                medicalHistory: medi,
                message: 'new medical history saved successfully'
            });
        });
    }).catch(function (error) {
        console.log(error);
        res.status(403).json({message: 'an error occured saving medical history'});
    });
}

// Read all Biological Info
MedicalHistoryServiceController.getAllMedicalHistory = function (req, res) {
    MedicalHistory.findAll()
        .then(function (medi) {
            res.status(200)
                .json(medi);
            console.info('find all MedicalHistory load ~ ');
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
}

//Read Biological info
MedicalHistoryServiceController.getMedicalHistoryById = function (req, res) {
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

MedicalHistoryServiceController.getMedicalHistoryByErhUUID= function (req, res) {
  console.log(`[ehrUUID] ==> ${req.params.ehrUUID}`);
  const erhuuid = req.params.ehrUUID
  MedicalHistory.find({erhuuid})
    .then(function (bioinfo) {
      res.status(200)
         .json(bioinfo);
      console.log('error: false ', 'message: find medicalhistory by ehruuid ~', bioinfo);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//Get Personal by user id
MedicalHistoryServiceController.getMedicalHistoryUserId= function (req, res) {
  console.log(`[userid] ==> ${req.params.userId}`);
  const userId = req.params.userId;
  MedicalHistory.find({userId})
    .then(function (bioinfo) {
      res.status(200)
         .json(bioinfo);
      console.log('error: false ', 'message: find medicalhistory by userId ~', bioinfo);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

// Update Biological info
MedicalHistoryServiceController.updateMedicalHistory = function (req, res) {
    MedicalHistory.update(req.body, {
        where: {id: req.params.id}
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
        where: {id: req.params.id}
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
