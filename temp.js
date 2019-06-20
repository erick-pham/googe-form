
client api M9ktyfxld7Rw7ZOjO1E6U4w7KD4HP5ygV
function doGet(e) {
  const formId = '1ZMT54-ze-UE7vK8DK0TQYeaAVD5ho5j_AjJR_TKaFSQ'
  // const form =  FormApp.openById('1ZMT54-ze-UE7vK8DK0TQYeaAVD5ho5j_AjJR_TKaFSQ')
  // Logger.log(form.get);

  const allRespones = getAllRespones(formId);
  Logger.log(allRespones);

  console.log(allRespones);
  var params = JSON.stringify(e);
  return params;
  // return HtmlService.createHtmlOutput(params);

  // return HtmlService.createHtmlOutput(JSON.stringify(allRespones));
  //    const publicUrl =  getPublicUrl(formId);
  //   Logger.log(publicUrl);

  // setRequireLogin(formId,true);
  //  const form =  FormApp.openById(formId);
  // form.setRequireLogin(false)


  //addEditors(formId,['pqtoan220496@gmail.com'])

}


function main() {
  const formId = '1ZMT54-ze-UE7vK8DK0TQYeaAVD5ho5j_AjJR_TKaFSQ'
  // const form =  FormApp.openById('1ZMT54-ze-UE7vK8DK0TQYeaAVD5ho5j_AjJR_TKaFSQ')
  // Logger.log(form.get);

  //  const allRespones =  getAllRespones(formId);
  //   Logger.log(allRespones);

  const publicUrl = getPublicUrl(formId);
  Logger.log(publicUrl);

  // setRequireLogin(formId,true);
  //  const form =  FormApp.openById(formId);
  // form.setRequireLogin(false)


  //addEditors(formId,['pqtoan220496@gmail.com'])

}

function getAllRespones(formId) {
  const form = FormApp.openById(formId);
  const formItems = form.getItems();
  var fields = [];
  var results = [];

  for (var i = 0; i < formItems.length; i++) {
    var title = formItems[i].getTitle();
    fields.push(title);
  }

  const formResponses = form.getResponses();


  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();

    var object = {};
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      object[fields[j]] = itemResponse.getResponse();
    }
    results.push(object)
  }

  return JSON.stringify(results);
}

function getPublicUrl(formId) {
  const form = FormApp.openById(formId);
  return form.getPublishedUrl();
}

function setRequireLogin(formId, require) {
  const form = FormApp.openById(formId);
  form.setRequireLogin(require);
}

function addEditors(formId, emailAddresses) {
  const form = FormApp.openById(formId);
  form.addEditors(emailAddresses)
}

// const rs = await script.scripts.run({
//   auth: auth,
//   resource: {
//     function: 'getAllRespones',
//     parameters: [
//       "1ZMT54-ze-UE7vK8DK0TQYeaAVD5ho5j_AjJR_TKaFSQ"
//     ],
//   },
//   scriptId: scriptId,
// });


// const rs = await script.scripts.run({
//   auth: auth,
//   resource: {
//     function: 'addCheckBoxItem',
//     parameters: [
//       formId,
//       {
//         "title": "Kind of movie",
//         "choices": [
//           "Action",
//           "Detective"
//         ],
//         "showOtherOption": true,
//         "required": true
//       }
//     ],
//   },
//   scriptId: scriptId,
// });


// const rs = await script.scripts.run({
//   auth: auth,
//   resource: {
//     function: 'addInputItem',
//     parameters: [
//       formId,
//       {
//         title: "Age",
//         required: true,
//         helpText: "your Age",
//         validation: {
//           helpText: "Your age must be greater than 20",
//           age: 20
//         }
//       }
//     ],
//   },
//   scriptId: scriptId,
// });

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