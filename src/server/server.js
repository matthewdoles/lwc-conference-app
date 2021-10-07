const compression = require('compression');
const express = require('express');
const path = require('path');
const { loginOrg, logoutOrg } = require('./util/conn');
const { fetchSessions, formatSessionData } = require('./util/sessions');
require('dotenv').config();

const app = express();
app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

app.get('/api/sessions', async (req, res) => {
  const conn = await loginOrg();
  const sessions = await fetchSessions(conn);
  logoutOrg(conn);

  if (sessions.length > 0) {
    return res.send({ data: formatSessionData(sessions) });
  }
  return res.send({ message: 'Cannot retrieve sessions, please try again.' });
});

app.use('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
  console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
