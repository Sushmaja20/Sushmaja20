require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/api/send-alert', async (req, res) => {
  const { contacts, location } = req.body;
  const errors = [];
  const successes = [];

  try {
    // Send SMS to each contact
    for (const contact of contacts) {
      try {
        await twilioClient.messages.create({
          body: `EMERGENCY ALERT: Your contact needs help! Location: https://www.google.com/maps?q=${location.lat},${location.lng}`,
          to: contact.phone,
          from: process.env.TWILIO_PHONE_NUMBER
        });
        successes.push(contact.phone);
      } catch (error) {
        errors.push({ phone: contact.phone, error: error.message });
      }
    }
    res.json({ success: true, successes, errors });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to send messages', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
