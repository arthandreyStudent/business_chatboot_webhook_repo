// api/webhook.js
const express = require('express');
const serverless = require('serverless-http');

const app = express();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'pscx_mvp_2025';

// Facebook sends a GET request here when you first set up the webhook
app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified!');
    return res.status(200).send(challenge);
  } else {
    console.warn('❌ Verification failed. Token mismatch.');
    return res.sendStatus(403);
  }
});

// Export for Vercel
module.exports = serverless(app);
