// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const express = require('express');
const { loginOrg, logoutOrg } = require('./util/conn');
const { fetchSessions, formatSessionData } = require('./util/sessions');
require('dotenv').config();

const app = express();
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/sessions', async (req, res) => {
  const conn = await loginOrg();
  const sessions = await fetchSessions(conn);
  logoutOrg(conn);

  if (sessions.length > 0) {
    return res.send({ data: formatSessionData(sessions) });
  }
  return res.send({ message: 'Cannot retrieve sessions, please try again.' });
});

app.listen(PORT, () =>
  console.log(`✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`)
);
