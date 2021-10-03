const URL_API = 'https://conference-lwc-app.herokuapp.com/api/sessions';
const URL_SF = '/api/sessions';

let sessions = [];
export const getSessions = () =>
  fetch(URL_SF)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response from server');
      }
      return response.json();
    })
    .then((result) => {
      sessions = result.data;
      return sessions;
    });
export const getSession = (sessionId) => {
  return sessions.find((session) => {
    return session.id === sessionId;
  });
};
