// Simple Express server setup to serve the build output
const compression = require('compression');
const express = require('express');
const jsforce = require('jsforce');
const path = require('path');
require('dotenv').config();

const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
  console.error(
    'Cannot start app: missing mandatory configuration. Check your .env file.'
  );
  process.exit(-1);
}
const conn = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
});

const app = express();
app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

app.get('/api/sessions', (req, res) => {
  const soql = `SELECT Id, Name, toLabel(Room__c), Description__c, format(Session_Date__c) formattedDateTime,
      (SELECT Speaker__r.Id, Speaker__r.First_Name__c, Speaker__r.Last_Name__c, Speaker__r.Bio__c, Speaker__r.Email__c, Speaker__r.Picture_Path__c FROM Session_Speakers__r)
      FROM Session__c WHERE DAY_ONLY(Session_Date__c) > 2021-07-12 ORDER BY Date_and_Time__c LIMIT 100`;
  conn.query(soql, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result.records.length === 0) {
      res.status(404).send('Session not found.');
    } else {
      const formattedData = result.records.map((sessionRecord) => {
        let speakers = [];
        if (sessionRecord.Session_Speakers__r) {
          speakers = sessionRecord.Session_Speakers__r.records.map((record) => {
            return {
              id: record.Speaker__r.Id,
              name:
                record.Speaker__r.First_Name__c +
                ' ' +
                record.Speaker__r.Last_Name__c,
              email: record.Speaker__r.Email__c,
              bio: record.Speaker__r.Bio__c,
              pictureUrl: record.Speaker__r.Picture_Path__c
            };
          });
        }
        console.log(sessionRecord);
        return {
          id: sessionRecord.Id,
          name: sessionRecord.Name,
          dateTime: sessionRecord.formattedDateTime,
          room: sessionRecord.Room__c,
          description: sessionRecord.Description__c,
          speakers
        };
      });
      res.send({ data: formattedData });
    }
  });
});

app.use('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
  console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
