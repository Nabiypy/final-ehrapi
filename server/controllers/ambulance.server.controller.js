/**
 * Created by hanso on 01/02/2019.
 * Biological information server controller
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  Ambulance = require('../models/ambulance'),
  AmbulanceServiceController = {};

// create ambulance controller
AmbulanceServiceController.requestForAmbulance = function (req, res) {
  var body = req.body;
  console.log("ambulance request body >>>", body);

  db.sync().then(function () {
    var newAmbulance = {
    userId: req.body.userId,
    requestType: req.body.requestType,
    ailment: req.body.ailment,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    geolocation: req.body.geolocation,
    otherInfo: req.body.otherInfo

    };

    return Ambulance.create(newAmbulance).then(function (ambulance) {
      console.log(`[call ambulance] ==> ${ambulance}`)
      res.status(201)
         .json({
           ambulance: ambulance,
           message: 'Ambulance request created successfully'
         });
    });
  }).catch(function (error) {
    console.log(`${error}`);
    res.status(403).json({
      error: error,
      message: 'an error occured requesting ambulance'
    });
  });
}

// Read all ambulance Info
AmbulanceServiceController.getAllAmbulanceRequest = function (req, res) {
  Ambulance.findAll()
    .then(function (ambulances) {
      res.status(200)
         .json(ambulances);
      console.info('find all ambulance request loading ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//Read ambulance info
AmbulanceServiceController.getAmbulanceRequestById= function (req, res) {
  const ambulanceId = req.params.id;
  Ambulance.findById(ambulanceId)
    .then(function (ambulance) {
      res.status(200)
        .json(ambulance);
      console.log('error: false ', 'message: get ambulance ~', ambulance);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//Get Ambulance request by userId
AmbulanceServiceController.getAmbulanceRequestByUserId= function (req, res) {
  console.log(`[userid] ==> ${req.params.userId}`);
  const userId = req.params.userId;
  Ambulance.find({userId})
    .then(function (ambulance) {
      res.status(200)
         .json(ambulance);
      console.log('error: false ', 'message: get ambulance request by userId ~', ambulance);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}


// Update Ambulance
AmbulanceServiceController.updateAmbulanceRequest= function (req, res) {
  Ambulance.update(req.body, {
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

//delete Ambulance request
AmbulanceServiceController.removeAmbulanceRequest = function (req, res) {
  Ambulance.destroy({
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

module.exports = AmbulanceServiceController;
