'use strict';

var router = require('express').Router();

var config = require('../config'),
    allowOnly = require('../routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController'),
    NodeMailController = require('../controllers/nodeMailer'),
    BioinfoServiceController = require('../controllers/bioinfo.server.controller'),
    PersonalinfoServiceController = require('../controllers/personalInfo.server.controller'),
    MedicalHistoryServiceController = require('../controllers/medical.history.server.controller'),
    PassportServerController = require('../controllers/international.passport.server.controller');


var APIRoutes = function(passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);
    router.post('/otpactivate', AuthController.accountVerify);

    router.post('/mail', NodeMailController.doPost);
    router.post('/mandmail', NodeMailController.sendMandrillMail);

    router.post('/createbioinfo', passport.authenticate('jwt', { session: false }), BioinfoServiceController.createBioInfo);
    router.post('/createpersonalinfo', passport.authenticate('jwt', { session: false }),PersonalinfoServiceController.createPersonalInfo);
    router.post('/createmedicalhistory', passport.authenticate('jwt', { session: false }),MedicalHistoryServiceController.createMedicalHistory);
    router.post('/savepassport', PassportServerController.savePassport);


    // GET Routes.
    router.get('/peoples', AuthController.peoples );
    router.get('/people/:id', passport.authenticate('jwt', { session: false }),AuthController.people )

    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));


    router.get('/bioinfos', BioinfoServiceController.getAllBioInfo);
    router.get('/bioinfo/:id', BioinfoServiceController.getBioInfoById);
    router.get('/bioinfo/uuid/:ehruuid', BioinfoServiceController.getBioInfoByPostId);
    router.put('/bioinfo/:id', BioinfoServiceController.updateBioInfo);
    router.delete('/bioinfo/:id', BioinfoServiceController.removeBioInfo);

    router.get('/personalinfos', PersonalinfoServiceController.getAllPersonalInfo);
    router.get('/personalinfo/:id', PersonalinfoServiceController.getAllPersonalInfo);
    router.put('/personalinfo/:id', PersonalinfoServiceController.updatePersonalInfo);
    router.delete('/personalinfo/:id', PersonalinfoServiceController.updatePersonalInfo);

    router.get('/api/medicalhistories', MedicalHistoryServiceController.getAllMedicalHistory);
    router.get('/api/medicalhistory/:id', MedicalHistoryServiceController.getMedicalHistoryById);
    router.delete('/api/medicalhostory/:id', MedicalHistoryServiceController.removeMedicalHistory);
    router.put('/api/medicalhostory/:id',MedicalHistoryServiceController.updateMedicalHistory);

    router.get('/savedpassport', PassportServerController.getAllSavedPassport);

  return router;
};

module.exports = APIRoutes;
