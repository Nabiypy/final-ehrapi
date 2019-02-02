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
    PassportServerController = require('../controllers/international.passport.server.controller');


var APIRoutes = function(passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);

    router.post('/mail', NodeMailController.doPost);
    router.post('/mandmail', NodeMailController.sendMandrillMail);

    router.post('/createbioinfo', BioinfoServiceController.createBioInfo);
    router.post('/createpersonalinfo', PersonalinfoServiceController.createPersonalInfo);

    router.post('/savepassport', PassportServerController.savePassport);


    // GET Routes.
    router.get('/peoples', AuthController.peoples );
    router.get('/people/:id', AuthController.people );

    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));


    router.get('/getallbioinfo', BioinfoServiceController.getAllBioInfo);
    router.get('/getallpersonalinfo', PersonalinfoServiceController.getAllPersonalInfo);

    router.get('/getsavedpassport', PassportServerController.getAllSavedPassport);


  return router;
};

module.exports = APIRoutes;
