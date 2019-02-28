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
    PassportServerController = require('../controllers/international.passport.server.controller'),
    AilmentServerController = require('../controllers/ailment.server.controller'),
    AmbulanceServerController = require('../controllers/ambulance.server.controller'),
    DoctorServerController = require('../controllers/doctor.server.controller');


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
    router.post('/ailments',passport.authenticate('jwt', { session: false }),AilmentServerController.createAilment);
    router.post('/ambulances',passport.authenticate('jwt', { session: false }), AmbulanceServerController.requestForAmbulance);
    router.post('/doctors',passport.authenticate('jwt', { session: false }), DoctorServerController.createDoctor);


    // GET Routes.
    router.get('/peoples', AuthController.getAllUsers );
    router.get('/people/:id', AuthController.getUserById );

    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));


    router.get('/bioinfos', BioinfoServiceController.getAllBioInfo);
    router.get('/bioinfo/:id', BioinfoServiceController.getBioInfoById);
    router.get('/bioinfo/userid/:userId',passport.authenticate('jwt', { session: false }),BioinfoServiceController.getBioInfoUserId);
    router.get('/bioinfo/ehruuid/:ehruuid', BioinfoServiceController.getBioInfoByEhrUUID);
    router.put('/bioinfo/:id', BioinfoServiceController.updateBioInfo);
    router.delete('/bioinfo/:id', BioinfoServiceController.removeBioInfo);

    router.get('/personalinfos', PersonalinfoServiceController.getAllPersonalInfo);
    router.get('/personalinfo/:id', PersonalinfoServiceController.getPersonalInfoById);
    router.get('/personalinfo/userid/:userId',passport.authenticate('jwt', { session: false }),BioinfoServiceController.getBioInfoUserId);
    router.get('/personalinfo/ehruuid/:ehruuid', PersonalinfoServiceController.getPersonalInfoByEhrUUID);
    router.put('/personalinfo/:id', PersonalinfoServiceController.updatePersonalInfo);
    router.delete('/personalinfo/:id', PersonalinfoServiceController.updatePersonalInfo);

    router.get('/medicalhistories', MedicalHistoryServiceController.getAllMedicalHistory);
    router.get('/medicalhistory/:id', MedicalHistoryServiceController.getMedicalHistoryById);
    router.get('/medicalhistory/userid/:userId', MedicalHistoryServiceController.getMedicalHistoryUserId);
    router.get('/medicalhistory/ehruuid/:ehruuid', MedicalHistoryServiceController.getMedicalHistoryByErhUUID);
    router.delete('/medicalhistory/:id', MedicalHistoryServiceController.removeMedicalHistory);
    router.put('/medicalhistory/:id',MedicalHistoryServiceController.updateMedicalHistory);

    router.get('/ailments',AilmentServerController.getAllAilment);
    router.get('/ailment/:id',AilmentServerController.getAilmentById);
    router.put('/ailment/:id',AilmentServerController.updateAilment);
    router.delete('/ailment/:id',AilmentServerController.removeAilment);

    router.get('/ambulances', AmbulanceServerController.getAllAmbulanceRequest);
    router.get('/ambulance/:id', AmbulanceServerController.getAmbulanceRequestById);
    router.get('/ambulance/userid/:userId', passport.authenticate('jwt', { session: false }), AmbulanceServerController.getAmbulanceRequestByUserId);
    router.put('/ambulance/:id', AmbulanceServerController.updateAmbulanceRequest);
    router.delete('/ambulance/:id', AmbulanceServerController.removeAmbulanceRequest);

    router.get('/doctors', DoctorServerController.getAllDoctors);
    router.get('/doctor/:id', DoctorServerController.getDoctorById);
    router.put('/doctor/:id', DoctorServerController.updateDoctor);
    router.delete('/doctor/:id', DoctorServerController.removeDoctor);


    router.get('/savedpassport', PassportServerController.getAllSavedPassport);

  return router;
};

module.exports = APIRoutes;
