const QR = require('../models/qrModel');

// Save QR
exports.saveQRs = async (req, res) => {
  const { qrCodes } = req.body;

  try {
    await QR.insertMany(qrCodes);
    res.json({ message: 'QR codes saved successfully' });
  } catch (error) {
    console.error('Error saving QR codes:', error);
    res.status(500).json({ error: 'Error saving QR codes' });
  }
};

// Get all QR codes
exports.getAllQRs = async (req, res) => {
  try {
    const qrs = await QR.find({});
    res.json(qrs);
  } catch (error) {
    console.error('Error retrieving QR codes:', error);
    res.status(500).json({ error: 'Error retrieving QR codes' });
  }
};
