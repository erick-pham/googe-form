function onFormSubmit(e) {
  Logger.log("[METHOD] onFormSubmit");

  //sendEmail(e.range);
}

function doGet(e) {
  const formId = '1BcoICQgaCv25mGPCKIKvxOKRNICilOpP__Ome6HtyEs';
  Logger.log("do get");
  addTriggerOnSubmitToForm(formId);
  //  const form = FormApp.openById(formId)
  //return  HtmlService.createHtmlOutput(form.)
  return HtmlService.createHtmlOutputFromFile('test.html').setTitle(HtmlService.getUserAgent());
}

function doPost(e) {
  const formId = '1BcoICQgaCv25mGPCKIKvxOKRNICilOpP__Ome6HtyEs';
  Logger.log("do get");
  addTriggerOnSubmitToForm(formId);
  //  const form = FormApp.openById(formId)
  //return  HtmlService.createHtmlOutput(form.)
  //return HtmlService.createHtmlOutputFromFile('test.html').setTitle(HtmlService.getUserAgent());
}

const main = () => {
  const formId = '1nEV9FbsoTVdsldzeivTxl83nWG0JU0uoDDBV9GhpYA0'
  createForm("Erick 2")
  // const form =  FormApp.openById('1ZMT54-ze-UE7vK8DK0TQYeaAVD5ho5j_AjJR_TKaFSQ');


  // var rs = form.getItems();

  // Logger.log(rs[0].getId() +"-" + rs[0].getIndex() +"-"+ rs[0].getTitle())
  //MailApp.sendEmail("bossdiemmaimai@gmail.com", "test", JSON.stringify(rs));
  // Logger.log(form.get);

  //  const allRespones =  getAllRespones(formId);
  //  Logger.log(allRespones);

  //    const publicUrl =  getPublicUrl(formId);
  //   Logger.log(publicUrl);

  // setRequireLogin(formId,true);
  //  const form =  FormApp.openById(formId);
  // form.setRequireLogin(false)


  //addEditors(formId,['pqtoan220496@gmail.com'])


  //  var data = {
  //    title: "Gender",
  //    choices: ['Male', 'Female'],
  //    showOtherOption: false,
  //    required: true,
  //    helpText: "Gender" 
  //  }
  //  var rs = addCheckBoxItem(formId, data);

  //  var data = {
  //    title: "Age",
  //    required: true,
  //    helpText: "your Age",
  //    validation: {
  //      helpText: "Your age must be greater than 18",
  //      age: 18
  //    }
  //  }
  //  var rs = addInputItem(formId, data);
  //  
  //  Logger.log(rs);
}

////////////////////////////////////////////
// CREATE EVENT ON EDIT FOR FORM
////////////////////////////////////////////
const onEdit = (e) => {
  try {
    //    Logger.log("responses id: " + e.response.getId())
    //    Logger.log("form id: " + e.source.getId())
    //    Logger.log("form title: " + e.source.getTitle())
    var data = {};
    var items = e.response.getItemResponses();
    for (i in items) {
      data[items[i].getItem().getTitle()] = items[i].getResponse();
    }
    MailApp.sendEmail("bossdiemmaimai@gmail.com", e.source.getId() + " - " + e.source.getTitle(), JSON.stringify(data));
  } catch (error) {
    MailApp.sendEmail("bossdiemmaimai@gmail.com", e.source.getId() + " - " + e.source.getTitle(), JSON.stringify(error));
  }
}

////////////////////////////////////////////
// CREATE EVENT ON SUBMIT FOR FORM
////////////////////////////////////////////
function onSubmit(e) {
  try {
    var data = {};
    var items = e.response.getItemResponses();
    for (i in items) {
      data[items[i].getItem().getTitle()] = items[i].getResponse();
    }
    MailApp.sendEmail("bossdiemmaimai@gmail.com", e.source.getId() + " - " + e.source.getTitle(), JSON.stringify(data));
  } catch (error) {
    MailApp.sendEmail("bossdiemmaimai@gmail.com", e.source.getId() + " - " + e.source.getTitle(), JSON.stringify(error));
  }
}

////////////////////////////////////////////
// FUNCTION: ADD TRIGGER ONSUBMIT TO FORM
////////////////////////////////////////////

function addTriggerOnSubmitToForm(formId) {
  Logger.log("add trigger")
  Logger.log(formId);

  const form = FormApp.openById(formId);
  ScriptApp.newTrigger("onSubmit").forForm(form).onFormSubmit().create();
  Logger.log("add trigger")
  Logger.log("add trigger successfull")
  return true;
}

// get list of forms
function getGoogleForms() {
  var files = DriveApp.getFilesByType(MimeType.GOOGLE_FORMS);
  var formResults = [];
  while (files.hasNext()) {
    var file = files.next();
    var form = FormApp.openById(file.getId());
    var object = {
      id: form.getId(),
      title: form.getTitle(),
      editLink: form.getEditUrl(),
      publicLink: form.getPublishedUrl()
    };
    formResults.push(object);
  }
  return formResults;
}

function addInputItem(formId, input) {
  var form = FormApp.openById(formId);
  var textItem = form.addTextItem();

  textItem.setTitle(input.title);
  textItem.setRequired(input.required);
  textItem.setHelpText(input.helpText);


  if (input.validation) {
    var textValidation = FormApp.createTextValidation()
      .setHelpText(input.validation.helpText)
      .requireNumberGreaterThan(input.validation.age)
      .build();
    textItem.setValidation(textValidation);
  }
  var rs = {
    id: form.getId(),
    publicUrl: form.getPublishedUrl()
  };

  return rs;
}

function addCheckBoxItem(formId, input) {
  var form = FormApp.openById(formId);
  var item = form.addCheckboxItem();

  item.setTitle(input.title);
  item.setHelpText(input.helpText);
  const choiceItems = input.choices.map(function (choice) {
    return item.createChoice(choice)
  });
  item.setChoices(choiceItems);

  item.showOtherOption(input.showOtherOption);

  if (input.required) {
    item.setRequired(true)
  } else {
    item.setRequired(false)
  }

  var rs = {
    id: form.getId(),
    publicUrl: form.getPublishedUrl()
  };

  return rs;
}


function createForm(formName) {
  var newForm = FormApp.create(formName);
  var rs = {
    id: newForm.getId(),
    publicUrl: newForm.getPublishedUrl()
  };
  addTriggerOnSubmitToForm(rs.id)
  return rs;
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

  return results;
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