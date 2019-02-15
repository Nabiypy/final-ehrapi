var nodemailer = require('nodemailer');
var async = require('async');
var request = require("request");
var utils = require('../utils/utils');
var smtpTransport = require('nodemailer-smtp-transport');
var logger = require('../controllers/logger'),
    config = require('../config');


exports.sendSmsInfobip = function (mobile, message) {
    var url = config.infoBib.baseUrl + config.infoBib.sendSmsUrl,
        auth = "Basic " + new Buffer(config.infoBib.userName + ":" + config.infoBib.password).toString("base64");

    if (mobile.indexOf("0") === 0) {
        mobile = "233" + mobile.substring(1, 10);
    } else {
        mobile = mobile;
    }

    var payload = {
        "from": "CloudAfrica",
        "to": mobile,
        "text": message
    };

    var options = {
        url: url,
        json: true,
        body: payload,
        method: "POST",
        headers: {
            "Authorization": auth
        }
    };
    console.log("options >>>", options);
    logger.log("postSMS options == " + options);
    request(options, function (error, response, body) {
        if (error) {
            console.log("error", "error sms >>> ", error);
            logger.error("error sms >>> ", error);
            res.json(error);
        } else {
            logger.log("infobip", "successful response >>");
            console.log(`sms result body >>>> ${JSON.stringify(body)}`);
            logger.log(`sms result body >>>> ${JSON.stringify(body)}`);

            return body;
        }
    });

}



