/**
 * Created by hanso on 01/02/2019.
 * International Passport server controller
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  Passport = require('../models/passport'),
  PassportServiceController = {};

// Save passport information
PassportServiceController.savePassport = function (req, res) {
  var body = req.body;
  console.log("passport request body >>>", body);

  db.sync().then(function () {
    var newPassport = {
    userId: req.body.userId,
    bioInfoId: req.body.bioInfoId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    idType: req.body.idType,
    idNumber: req.body.idNumber,
    expiredDate: req.body.expiredDate
    };

    return Passport.create(newPassport).then(function () {
      res.status(201)
         .json({message: 'new passport info saved successfully'});
    });
  }).catch(function (error) {
    console.log(error);
    res.status(403).json({ message: 'an error occured saving passport details' });
  });
}

// Read all Biological Info
PassportServiceController.getAllSavedPassport = function (req, res) {
  Passport.findAll()
    .then(function (bioinfo) {
      res.status(200)
        .json(bioinfo);
      console.info('find all passport saved ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
//Read Biological info
PassportServiceController.getPassportInfo = function (req, res) {
  Passport.findById(req.params.id)
    .then(function (passport) {
      res.status(200)
         .json(passport);
      console.log('error: false ', 'message: read single post ~', bioinfo);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
// Update Biological info
PassportServiceController.updatePassportInfo = function (req, res) {
  Passport.update(req.body, {
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
PassportServiceController.removePassportInfo = function (req, res) {
  Passport.destroy({
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

module.exports = PassportServiceController;
