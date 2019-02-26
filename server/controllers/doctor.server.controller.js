/**
 * Created by hanso on 26/02/2019.
 * Save Doctors server controller
 */

'use strict';
var config = require('../config'),
    request = require('request'),
    db = require('../models/database'),
    Doctor = require('../models/doctors'),
    DoctorServiceController = {};

// create ambulance controller
DoctorServiceController.createDoctor = function (req, res) {
    var body = req.body;
    console.log("ambulance request body >>>", body);

    db.sync().then(function () {
        var newDoctor = {
            userId: req.body.userId,
            doctorFirstName: req.body.firstName,
            doctorLastName: req.body.lastName,
            doctorFullName: req.body.fullName,
            phoneNumber: req.body.mobile,
            emailAddress: req.body.email,
            officeAddress: req.body.officeAddress,
            currentWorkPlace: req.body.currentWorkPlace,
            hospital: req.body.hospital,
            qualification: req.body.qualification
        };

        return Doctor.create(newDoctor).then(function (doctor) {
            console.log(`[save doctor] ==> ${doctor}`)
            res.status(201)
                .json({
                    doctor: doctor,
                    message: 'Doctor save successfully'
                });
        });
    }).catch(function (error) {
        console.log(`${error}`);
        res.status(403).json({
            error: error,
            message: 'an error occured saving doctor'
        });
    });
}

// Read all ambulance Info
DoctorServiceController.getAllDoctors = function (req, res) {
    Doctor.findAll()
        .then(function (doctors) {
            res.status(200)
                .json(doctors);
            console.info('find all doctors request loading ~ ');
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
}

//Read ambulance info
DoctorServiceController.getDoctorById = function (req, res) {
    const doctorId = req.params.id;
    Doctor.findById(doctorId)
        .then(function (doctor) {
            res.status(200)
                .json(doctor);
            console.log('error: false ', 'message: get doctor ~', doctor);
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
}


// Update Ambulance
DoctorServiceController.updateDoctor = function (req, res) {
    Doctor.update(req.body, {
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

//delete Ambulance request
DoctorServiceController.removeDoctor = function (req, res) {
    Doctor.destroy({
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

module.exports = DoctorServiceController;
