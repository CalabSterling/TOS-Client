let URL = '';

// eslint-disable-next-line default-case
switch (window.location.hostname) {
    // this is the local host name of your react app
    case 'localhost' || '127.0.0.1':
        // this is the local host name of your API
        URL = 'http://localhost:3000';
        break;
    // this is the deployed react application
    case 'tosccs-client.herokuapp.com':
        // this is the full url of your deployed API
        URL = 'https://tosccs.herokuapp.com'
}

export default URL;