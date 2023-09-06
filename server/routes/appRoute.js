const {insights, reports} = require('../controllers/appController')
const express = require('express')
const router = express.Router();


router.route('/').post(insights);
router.route('/reports').post(reports);

module.exports = router