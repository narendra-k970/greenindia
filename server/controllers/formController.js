const Form = require('../models/formModel');

// Handle form submission
exports.submitForm = async (req, res) => {
  try {
    const formData = req.body;

    const existingForm = await Form.findOne({ qrId: formData.qrId });
    if (existingForm) {
      return res.status(400).json({ error: 'Form with this QR ID already exists' });
    }

    const newForm = new Form(formData);
    await newForm.save();

    res.status(201).json({ message: 'Form submitted successfully', data: newForm });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting form', details: error.message });
  }
};

// Fetch details when QR code is scanned
exports.getFormDetails = async (req, res) => {
  try {
    const { qrId } = req.params;

    const form = await Form.findOne({ qrId });
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const response = {
      user_id: form.qrId,
      name: form.nameOfHouseOwner,
      house_no: form.houseUidNo,
      mobile: form.mobileNo,
      state: form.state,
      municipality: form.municipality
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching form details', details: error.message });
  }
};
