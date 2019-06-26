const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const _ = require('lodash');
const { formatResult, formatError } = require('./utils.js');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/script.projects',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.scripts',
  'https://www.googleapis.com/auth/script.external_request',
  'https://www.googleapis.com/auth/forms',
  'https://www.googleapis.com/auth/script.send_mail',
  'https://www.googleapis.com/auth/script.scriptapp'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('./google-api-credentials.json', (err, content) => {
  if (err) { return console.log('Error loading client secret file:', err); }
  // Authorize a client with credentials, then call the Google Apps Script API.
  authorize(JSON.parse(content), callAppsScript);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = async () => {
  try {
    let fileContent = await fs.readFileSync('./google-api-credentials.json');
    const credentials = JSON.parse(fileContent);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.

    fileContent = await fs.readFileSync(TOKEN_PATH);

    if (fileContent.length) {
      oAuth2Client.setCredentials(JSON.parse(fileContent));
      return oAuth2Client;
    } else {
      return getAccessToken(oAuth2Client);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  const code = `4/bgGOed7k42uZmGuhzVN6uBKg-cUFVa9QEzVHFhGx2hliagKvKHOy2TA`;
  oAuth2Client.getToken(code, (err, token) => {
    if (err) { return console.error('Error retrieving access token', err); }
    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) { return console.error(err); }
      console.log('Token stored to', TOKEN_PATH);
    });
  });
  return oAuth2Client;
}

const scriptId = '1alo9ACPN6dBQNK30CGlflhqenkIADph1hHOOWr2F8-PF1cn_3hs3f3j5';
async function callAppsScript() {
  try {
    const formId = '1k5TNMTd5yLydOBPHxNyMf9bbeXGrY0DilYhlHnKA_Js';
    const auth = await authorize();
    const script = google.script({ version: 'v1', auth: auth });
    await script.scripts.run({
      auth: auth,
      resource: {
        function: 'doPost',
        parameters: [
        ],
      },
      scriptId: scriptId,
    })
    //const rs = await script.projects.versions.list({ scriptId: scriptId }); // ok
    // const rs = await script.projects.getContent({
    //   scriptId: scriptId
    // });


    // list google formids
    // const drive = google.drive({ version: "v3", auth: auth });
    // const rs = await drive.files.list({
    //   q: `trashed=false and mimeType='application/vnd.google-apps.form'`
    // })

  } catch (error) {
    console.log(error);
  }
}

//callAppsScript();
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var cors = require('cors');
app.use(cors());
// parse application/json
app.use(bodyParser.json())

app.listen(5000, async () => {
  const auth = await authorize();
  app.set('auth', auth)
  console.log(`Server start at ${5000}`)
})

app.post('/form/', jsonParser, async function (req, res) {
  const rs = await createForm(app.get('auth'), req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(rs);
})

app.post('/form/:id/add-trigger-on-submit', jsonParser, async function (req, res) {
  const rs = await addTriggerOnSubmitToForm(app.get('auth'), req.params.id);
  res.setHeader('Content-Type', 'application/json');
  res.send(rs);
})

app.get('/form/:id/responses', jsonParser, async function (req, res) {
  const rs = await getFormResponse(app.get('auth'), req.params.id);
  res.setHeader('Content-Type', 'application/json');
  res.send(rs);
})

app.post('/form/add-input-item', jsonParser, async function (req, res) {
  const rs = await addInputItem(app.get('auth'), req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(rs);
})


app.get('/form-list', async function (req, res) {
  const rs = await getFormList(app.get('auth'));
  res.setHeader('Content-Type', 'application/json');
  res.send(rs);
})



const createForm = async (auth, data) => {
  const script = google.script({ version: 'v1', auth: auth });
  return new Promise((resolve, reject) => {
    script.scripts.run({
      auth: auth,
      resource: {
        function: 'createForm',
        parameters: [
          data.formName
        ],
      },
      scriptId: scriptId,
    }).then((rs) => {
      // const data = rs.data.response.result;
      // return data ? JSON.parse(data) : [];
      resolve(rs.data)
    }).catch((error) => {
      reject(new Error(error))
    })
  })
}


const addTriggerOnSubmitToForm = async (auth, formId) => {
  const script = google.script({ version: 'v1', auth: auth });
  return new Promise((resolve, reject) => {
    script.scripts.run({
      auth: auth,
      resource: {
        function: 'addTriggerOnSubmitToForm',
        parameters: [
          formId
        ],
      },
      scriptId: scriptId,
    }).then((rs) => {
      // const data = rs.data.response.result;
      // return data ? JSON.parse(data) : [];
      resolve(rs.data)
    }).catch((error) => {
      reject(new Error(error))
    })
  })
}

const getFormResponse = async (auth, formId) => {
  const script = google.script({ version: 'v1', auth: auth });
  const rs = await script.scripts.run({
    auth: auth,
    resource: {
      function: 'getAllRespones',
      parameters: [
        formId
      ],
    },
    scriptId: scriptId,
  });

  const data = rs.data.response.result;
  return data ? JSON.parse(data) : [];
}

const getFormList = async (auth) => {
  const script = google.script({ version: 'v1', auth: auth });
  const drive = google.drive({ version: "v3", auth: auth });
  let formApps = await script.scripts.run({
    auth: auth,
    resource: {
      function: 'getGoogleForms',
      parameters: []
    },
    scriptId: scriptId,
  });

  formApps = JSON.parse(formatResult(formApps).response.result);
  await Promise.all(formApps.map(async (form) => {
    const fileFields = await drive.files.get({ fileId: form.id, fields: "name,thumbnailLink" });
    form.thumbnailLink = fileFields.data.thumbnailLink;
    form.name = fileFields.data.name
  }));
  return formApps;
}

const addInputItem = async (auth, input) => {
  const script = google.script({ version: 'v1', auth: auth });
  const rs = await script.scripts.run({
    auth: auth,
    resource: {
      function: 'addInputItem',
      parameters: [
        input.formId,
        input.parameters
      ],
    },
    scriptId: scriptId,
  });
  return rs;
}