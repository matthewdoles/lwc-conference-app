const URL_API = 'https://conference-lwc-app.herokuapp.com/api/sessions';
const URL_SF = '/api/sessions';

let sessionsAPI = [];
let sessionsSF = [];
let sessions = [];

export const getSessionsAPI = () =>
  fetch(URL_API)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response from server');
      }
      return response.json();
    })
    .then((result) => {
      sessionsAPI = result.data;
      sessions.push(...result.data);
      return sessionsAPI;
    });

export const getSessionsSF = () =>
  fetch(URL_SF)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response from server');
      }
      return response.json();
    })
    .then((result) => {
      sessionsSF = result.data;
      sessions.push(...result.data);
      return sessionsSF;
    });

export const getSession = (sessionId) => {
  return sessions.find((session) => {
    return session.id === sessionId;
  });
};
