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
PersonalInfoServiceController.createPersonalInfo = async function (req, res) {
    var body = req.body,
        geodata = '',
        latitude = '',
        longitude = '';
    console.log("post request body >>>", body);
    if (!req.body.latitude || !req.body.longitude) {
        res.json({message: 'Please provide latitude and a longitude'});
    } else {
        var options = {
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            qs: {
                latlng: req.body.latitude + ',' + req.body.longitude,
                key: 'AIzaSyAsQi8vzHfqrt33xQww77MN1Bg84iLSeOM'
            },
            json: true,
        };

        request(options, async function (error, response, body) {
            console.log('options', options);
            try {
                 var formatted_address = body.results[0];
                geodata = formatted_address.formatted_address
                console.log('formatted address ==>> ', geodata);
            }catch (e) {
                console.log(`[error geodata] ==> ${e}`);
            }

        });
        db.sync().then(function () {
            var newPersonalInfo = {
                userId: req.body.userId,
                ehrUUID: req.body.ehrUUID,
                levelOfEducation: req.body.levelOfEducation,
                spokenLanguages: req.body.spokenLanguages,
                profession: req.body.profession,
                maritalStatus: req.body.maritalStatus,
                noOfKids: req.body.noOfKids,
                religion: req.body.religion,
                emergencyNumbers: req.body.emergencyNumbers,

                familyContactOneName: req.body.familyContactOneName,
                familyContactOneNumber: req.body.familyContactOneNumber,
                familyContactOneRelationship: req.body.familyContactOneRelationship,
                familyContactTwoName: req.body.familyContactTwoName,
                familyContactTwoNumber: req.body.familyContactTwoNumber,
                familyContactTwoRelationship: req.body.familyContactTwoRelationship,
                familyContactThreeName: req.body.familyContactThreeName,
                familyContactThreeNumber: req.body.familyContactThreeNumber,
                familyContactThreeRelationship: req.body.familyContactThreeRelationship,

                nonFamilyContactOneName: req.body.nonFamilyContactOneName,
                nonFamilyContactOneNumber: req.body.nonFamilyContactOneNumber,
                nonFamilyContactOneRelationship: req.body.nonFamilyContactOneRelationship,
                nonFamilyContactTwoName: req.body.nonFamilyContactTwoName,
                nonFamilyContactTwoNumber: req.body.nonFamilyContactTwoNumber,
                nonFamilyContactTwoRelationship: req.body.nonFamilyContactTwoRelationship,
                nonFamilyContactThreeName: req.body.nonFamilyContactThreeName,
                nonFamilyContactThreeNumber: req.body.nonFamilyContactThreeNumber,
                nonFamilyContactThreeRelationship: req.body.nonFamilyContactThreeRelationship,
                residentialAddress: req.body.residentialAddress,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                employmentType: req.body.employmentType,
                companyName: req.body.companyName,
                companyLocation: req.body.companyLocation,
                phoneNumber: req.body.mobile,
                geolocation: geodata,
                digitalAddress: geodata
            };

            return PersonalInfo.create(newPersonalInfo).then(function (personalinfo) {
                console.log(`[id] ++++ ${personalinfo.id}`)
                console.log(`[geodata] ++++ ${personalinfo.geolocation}`)
                res.status(201).json({
                    personalinfo: personalinfo,
                    message: 'new Personal info saved successfully'
                });
            });
        }).catch(function (error) {
            console.log(error);
            res.status(403).json({message: 'an error occured saving Personal info'});
        });
    }


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
PersonalInfoServiceController.removePersonalInfo = function (req, res) {
    PersonalInfo.destroy({
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

module.exports = PersonalInfoServiceController;
