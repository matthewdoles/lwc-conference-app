const { soqlQueryWithChildren } = require('jsforce-patterns');

const fetchSessions = async (conn, id) =>
  soqlQueryWithChildren(
    conn,
    process.env.NODE_ENV === 'test' ? process.env.TEST_TABLE : 'Session__c',
    id !== undefined || id !== null
      ? {
          fields:
            'Id, Name, toLabel(Room__c), Description__c, format(Session_Date__c) formattedDateTime',
          sort: 'Session_Date__c',
          conditions: { Id: id }
        }
      : {
          fields:
            'Id, Name, toLabel(Room__c), Description__c, format(Session_Date__c) formattedDateTime',
          sort: 'Session_Date__c'
        },
    'Session_Speakers__r',
    {
      fields:
        'Speaker__r.Id, Speaker__r.First_Name__c, Speaker__r.Last_Name__c, Speaker__r.Bio__c, Speaker__r.Email__c, Speaker__r.Picture_Path__c',
      sort: 'Speaker__r.Last_Name__c'
    }
  );

const formatSessionData = (sessions) =>
  sessions.map((sessionRecord) => {
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
    return {
      id: sessionRecord.Id,
      name: sessionRecord.Name,
      dateTime: sessionRecord.formattedDateTime,
      room: sessionRecord.Room__c,
      description: sessionRecord.Description__c,
      speakers
    };
  });

module.exports = {
  fetchSessions,
  formatSessionData
};
