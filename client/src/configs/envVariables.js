// Which backend should the app talk to?
// Reads from client/.env (REACT_APP_APP_ENV). Defaults to 'local' so the
// app always talks to YOUR OWN server + database, not anyone else's.
const APP_ENV = process.env.REACT_APP_APP_ENV || 'local';

let APP_HOST = '';

switch (APP_ENV) {
    case 'local':
        APP_HOST = 'http://localhost:5000';
        break;
    case 'prod':
        // Put your own deployed backend URL here once you host it yourself.
        APP_HOST = process.env.REACT_APP_PROD_HOST || 'http://localhost:5000';
        break;
    default:
        APP_HOST = 'http://localhost:5000';
        break;
}

console.log(`[ChatApp] environment: ${APP_ENV} -> ${APP_HOST}`);

export default APP_HOST;
