const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.post('/save-qr', qrController.saveQRs);
router.get('/get-all-qrs', qrController.getAllQRs);

module.exports = router;
