const mongoose = require('mongoose');

const qrSchema = new mongoose.Schema({
  qrId: { type: String, required: true },
  qrCodeUrl: { type: String, required: true },
});

module.exports = mongoose.model('QR', qrSchema);
