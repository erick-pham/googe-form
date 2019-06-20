 - create project
 - add lib google sheet
 - add credentials for google sheet


function logNamesAndMajors() {
  var spreadsheetId = '1iD_QG-BktZR8VfDWi2ZlEIJC7C-s-XXjsAFJGcaThok';
  var rangeName = 'Sheet1';
  var values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
  if (!values) {
    Logger.log('No data found.');
  } else {
    Logger.log('Name, Major:');
    for (var row = 0; row < values.length; row++) {
      // Print columns A and E, which correspond to indices 0 and 4.
      Logger.log(' - %s, %s', values[row][0], values[row][4]);
    }
  }
}


//function onSpreadsheetSubmit(e) {
//     var row = e.range.getRow();
//     MailApp.sendEmail("bossdiemmaimai@gmail.com",
//                "Your subject, rows: "+ row,
//                "A new application has been submitted on row:");
//}

function onSubmit(e) {
//  console.log('onSubmit');
//  var row = e.range.getRow();
    Logger.log("onSubmit");
//      MailApp.sendEmail("bossdiemmaimai@gmail.com",
//                "Your subject, rows: ",
//                "A new application has been submitted on row:");
  
//  var items = e.response.getItemResponses();
//  for (i in items){
//     Logger.log('---');
//      Logger.log(items[i].getItem().getTitle());
//      Logger.log(items[i].getResponse());
//    //Logger.log("getItem().getTitle()=%s, getResponse()=%s", items[i].getItem().getTitle(), items[i].getResponse());
//  }

var options = {
  'method' : 'post',
    "headers": {
    "X-TENANT-ID": "1a3493b0-befc-48df-ab93-5766c0572924"
  },
  'payload' : {
    'metadata': {
      'device': 'phone'
    },
    'username': 'toan.pham@unicorn-fintech.com',
    'password': '000000'}
};
var token = UrlFetchApp.fetch('https://dev-mgis.360f.com:18040/api/v1/auth/token', options);
  Logger.log(token);
}


 
GET https://sheets.googleapis.com/v4/spreadsheets/1iD_QG-BktZR8VfDWi2ZlEIJC7C-s-XXjsAFJGcaThok/values/Sheet1?key={YOUR_API_KEY}