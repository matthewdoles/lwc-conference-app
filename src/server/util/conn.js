const { login, logout } = require('jsforce-patterns');

const loginOrg = async () =>
  login(
    {
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD
    },
    (err) => {
      if (err) {
        process.exit(-1);
      }
    }
  );

const logoutOrg = (conn) => logout(conn);

module.exports = {
  loginOrg,
  logoutOrg
};
