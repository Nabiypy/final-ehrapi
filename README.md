# EHR API
Electronic Health Record Restful Api for client web and mobile application.

## Setup

* Clone this repo: `git clone https://github.com/Nabiypy/final-ehrapi.git`
* Access the folder: `cd final-ehr`
* Install dependencies: `npm install`
* Boot the server: `npm start`
* Demo server: `npm run dev`
* Running tests: `npm test`
* Accessing API: `https://localhost:9000/api/` (Yes, HTTPS!)


## About

IsPepertual Media - git clone https://github.com/Nabiypy/final-ehrapi.git

### API Specification

* Register account: `/api/signup` ,          params = `first, lastname, username, password, email, mobile`
* Activate account: `/api/activateaccount`    params = `otp`
* Login user:       `/api/authenticate`       params = `mobile, email, password`

