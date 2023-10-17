const { reports} = require('../controllers/appController')
const express = require('express')
const router = express.Router();


router.route('/').post(reports);


module.exports = router