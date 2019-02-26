/**
 * Created by hanso on 01/02/2019.
 * Biological information server controller
 */

'use strict';
const uuidv4 = require('uuid/v4');
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  Ailment = require('../models/ailment'),
  AilmentServiceController = {};

// create bioinfo controller
AilmentServiceController.createAilment = function (req, res) {
  console.log(` uuid ::: ${uuidv4()}`);
  var body = req.body;
  console.log("ailment request body >>>", body);

  db.sync().then(function () {
    var newAilment = {
    userId: req.body.userId,
    ailmentName: req.body.ailmentName,
    ailmentType: req.body.ailmentType,
    ailmentDescription: req.body.ailmentDescription,
    otherInfo: req.body.otherInfo

    };

    return Ailment.create(newAilment).then(function (ailment) {
      console.log(`[bioinfo saved] ==> ${ailment}`)
      res.status(201)
         .json({
           ailment: ailment,
           message: 'new ailment created successfully'
         });
    });
  }).catch(function (error) {
    console.log(`${error}`);
    res.status(403).json({
      error: error,
      message: 'an error occured saving ailment'
    });
  });
}

// Read all Biological Info
AilmentServiceController.getAllAilment = function (req, res) {
  Ailment.findAll()
    .then(function (ailments) {
      res.status(200)
         .json(ailments);
      console.info('find all ailments loading ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//Read Biological info
AilmentServiceController.getAilmentById= function (req, res) {
  const ailmentId = req.params.id;
  Ailment.findById(ailmentId)
    .then(function (ailment) {
      res.status(200)
        .json(ailment);
      console.log('error: false ', 'message: get ailment ~', ailment);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}


// Update Biological info
AilmentServiceController.updateAilment= function (req, res) {
  Ailment.update(req.body, {
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
AilmentServiceController.removeAilment = function (req, res) {
  Ailment.destroy({
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

module.exports = AilmentServiceController;
