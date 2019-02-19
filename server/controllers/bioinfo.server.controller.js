/**
 * Created by hanso on 01/02/2019.
 * Biological information server controller
 */

'use strict';
const uuidv4 = require('uuid/v4');
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  Bioinfo = require('../models/bio.info'),
  BioinfoServiceController = {};

// create bioinfo controller
BioinfoServiceController.createBioInfo = function (req, res) {
  console.log(` uuid ::: ${uuidv4()}`);
  var body = req.body;
  console.log("post request body >>>", body);

  db.sync().then(function () {
    var newBioInfo = {
    userId: req.body.userId,
    ehrUUID: uuidv4(),
    fullName: req.body.fullName,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    passportPicture: req.body.passportPicture,
    gender: req.body.gender,
    bloodType: req.body.bloodType,
    bloodDonor: req.body.bloodDonor,
    allergies: req.body.allergies,
    medications: req.body.medications,
    infections: req.body.infections,
    sickleCellType: req.body.sickleCellType,
    isHandicap: req.body.isHandicap,
    location: req.body.location,
    height: req.body.height,
    weight: req.body.weight,
    bmi: req.body.bmi

    };

    return Bioinfo.create(newBioInfo).then(function (bioionfo) {
      console.log(`[bioinfo saved] ==> ${bioionfo}`)
      res.status(201)
         .json({
           bioinfo: bioionfo,
           message: 'new Biological info saved successfully'
         });
    });
  }).catch(function (error) {
    console.log(`${error}`);
    res.status(403).json({
      error: error,
      message: 'an error occured saving Biological information'
    });
  });
}

// Read all Biological Info
BioinfoServiceController.getAllBioInfo = function (req, res) {
  Bioinfo.findAll()
    .then(function (bioinfos) {
      res.status(200)
         .json(bioinfos);
      console.info('find all bioinfos. loading ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//Read Biological info
BioinfoServiceController.getBioInfoById= function (req, res) {
  const bioId = req.params.id;
  Bioinfo.findById(bioId)
    .then(function (bioinfo) {
      res.status(200)
        .json(bioinfo);
      console.log('error: false ', 'message: read single post ~', bioinfo);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//Read Bio info by postID
BioinfoServiceController.getBioInfoByPostId= function (req, res) {
  // console.log(`[postId] ==> ${postId}`);
  Bioinfo.findById(req.params.bioInfoId)
    .then(function (bioinfo) {
      res.status(200)
         .json(bioinfo);
      console.log('error: false ', 'message: read single bioinfo post ~', bioinfo);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

// Update Biological info
BioinfoServiceController.updateBioInfo = function (req, res) {
  Bioinfo.update(req.body, {
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
BioinfoServiceController.removeBioInfo = function (req, res) {
  Bioinfo.destroy({
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

module.exports = BioinfoServiceController;
