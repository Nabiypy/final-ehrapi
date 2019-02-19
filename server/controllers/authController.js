/**
 * Created by hanso on 03/9/2018.
 */
'use strict';

var jwt = require('jsonwebtoken'),
    config = require('../config'),
    util = require('../utils/utils'),
    otp = require('../utils/alerts_sender'),
    db = require('../models/database'),
    User = require('../models/user'),
    async = require('async'),
    AuthController = {}; // The authentication controller.

AuthController.authenticateUser = async (req, res) => {
    console.log("login request ~ ", req.body);
    if (!req.body.mobile && !req.body.email) {
        res.status(404).json({message: 'mobile or email required to login !'});
    } else {
        var email = req.body.email,
            phoneNumber = req.body.mobile,
            password = req.body.password,
            username = req.body.username,
            potentialUser = {
                where: {
                    $or: [{ phoneNumber: phoneNumber}, {email: email}]
                }
            };
        console.log(`[potential user] ==> ${JSON.stringify(potentialUser)}`);
        await User.find(potentialUser).then(function (user) {
            console.log(` user _id +++> ${user.id}`);
            console.log(` user mobile +++> ${user.phoneNumber}`);
            console.log(` user email +++> ${user.email}`);
            console.log(` username +++> ${user.username}`);
            console.log(` user password +++> ${user.password}`);
            console.log(` mobile confirmed ==> ${user.mobile_confirmed}`);

            if (user.mobile_confirmed === false) {
                res.status(404).json({message: 'Account is not registered !'});
            } else {
                console.log('final password >>> ',user.password);
                user.comparePasswords(password, function (error, isMatch) {
                    if (isMatch && !error) {
                        var token = jwt.sign({email: [user.email, user.phoneNumber]},config.keys.secret, {expiresIn: '24h'});
                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            userId: user.id,
                            profile: user.toProfileJsonFor(),
                            role: user.role,

                        });

                    } else {
                        res.status(404).json({message: 'Login failed, password incorrect !'});
                    }
                });
            }
        }).catch(function (error) {
            res.status(500).json({message: 'There was an error!'});
        });
    }

}

AuthController.accountVerify = async (req, res) => {
    console.log(`[otp request body] ==> ${JSON.stringify(req.body)}`);
    // res.status(201).json(req.body)
    await User.find({where: {secret: req.body.otp}})
        .then((user) => {
            if (user) {
                console.log(`get user ==> ${user}`);
                if (user.mobile_confirmed) {
                    return res.json({error: true, message: "Account already activated"})
                } else {
                    user.mobile_confirmed = true;
                    user.last_secret_date =new Date().toString();
                    user.save();
                    return res.json({error:false,message:"Account successfully activated", user:user.phoneNumber});
                }
            } else {
                return res.json({error:true,message:"Invalid OTP code"})
            }

        })


}
// Register a user.
// http://localhost:9000/api/signup
AuthController.signUp = function (req, res) {
    console.log("post data ~ ", req.body);
    if (!req.body.mobile || !req.body.password) {
        res.json({message: 'Please provide a phone number and a password.'});
    } else {
        db.sync().then(function () {
            var secret = util.generateSecretCode();
            console.log(`{ generate sms secret code] ==> ${secret}`);

            var newUser = {
                firstName: req.body.firstname,
                middleName: req.body.middlename,
                lastName: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                phoneNumber: req.body.mobile,
                email_confirmed: 'false',
                mobile_confirmed: 'false',
                secret: secret,
                tokenDate: new Date().toString()
            };

            return User.create(newUser).then(function (user) {
                //send registration sms and email
                console.log('new user >>> ', user.dataValues);
                const otpcode = user.dataValues.secret;
                const otpMsg = `Hi ${user.dataValues.firstName}, use OTP: ${otpcode} to activate your account.Thank you.`;
                console.log('sending sms with OTP code >>> ');
                otp.sendSmsInfobip(user.dataValues.phoneNumber, otpMsg);
                res.status(201).json({
                    success: 'Account successfully initiated. Please enter the OTP code to /api/otpactivate to complete the registration',
                    message: otpMsg,
                    otpCode: otpcode
                });
            });
        }).catch(function (error) {
            // console.log(error);
            res.status(403).json({
                message: 'Email or Username already exists!',
                original: error
            });
        });
    }
}

// Authenticate a user.
// http://localhost:9000/api/authenticate

AuthController.peoples = function (req, res) {
    console.log("all people request ~ ", req.body);
    User.findAll()
        .then(function (users) {
            res.status(200).json(users);
            console.info('all staff ~ ');
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
}

AuthController.people = function (req, res) {
    console.log("people id ~ ", req.body);
    User.findById(req.params.id)
        .then(function (user) {
            res.status(200).json(user);
            console.log('error: false ', 'get staff ~ ', user);
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
}

/**
 * Change a users password
 */
AuthController.changePassword = function (req, res, next) {
    var userId = req.userId;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function (err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function (err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

// reset a users password:

AuthController.resetPassword = function (email) {
    var chars = "abcdefghijklmnopqrstuvwxyz123456789"
    var newPass = ''

    for (var i = 0; i < 8; i++) {
        newPass += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    User.findOne({email: email}, function (err, user) {
        user.password = newPass;
        user.save(function (err) {
            if (err) {
                console.log("error saving password");
            }
        });
    });

    return newPass;
};

module.exports = AuthController;
