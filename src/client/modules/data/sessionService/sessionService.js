const URL_API = 'https://conference-lwc-app.herokuapp.com/api/sessions';
const URL_SF = '/api/sessions';

let sessions = [];

const fetchData = (url) =>
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response from server');
      }
      return response.json();
    })
    .then((result) => {
      sessions.push(...result.data);
      return result.data;
    });

export const getSessions = (source) => {
  switch (source) {
    case 'api':
      return fetchData(URL_API);
    case 'salesforce':
      return fetchData(URL_SF);
    default:
      return fetchData(URL_API);
  }
};

export const getSession = (sessionId) => {
  return sessions.find((session) => {
    return session.id === sessionId;
  });
};
