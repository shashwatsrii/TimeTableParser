// URL of the Excel file
var excelUrl = "BTECH_4_sem.xlsx";

// Load the Excel file using AJAX(Asynchronous javascript and XML)
//Create a new XMLHttpRequest object 
var request = new XMLHttpRequest();
request.open('GET', excelUrl, true);
//sets the "responseType" property of the XMLHttpRequest object to "arraybuffer"."arraybuffer" indicates that the response should be returned as an ArrayBuffer object, which is a low-level binary data representation in JavaScript.
request.responseType = 'arraybuffer';

// load event is fired when the request has successfully recieved a response from the server.
request.onload = function(e) {
  if (request.status == 200) { //status property 200 denotes request was successful and the server has returned the request data

    // Parse the Excel file using SheetJS library
    // The "Uint8Array" constructor is used to create a new array of 8-bit unsigned integers, which is a standard way to represent binary data in JavaScript. 
    console.log(request.response)
    var data = new Uint8Array(request.response);
    console.log(data);
    var workbook = XLSX.read(data, {type: 'array'});
    var sheet = workbook.Sheets[workbook.SheetNames[0]];//workbook variable represents Excel workbook which has a property SheetNames containing an array of strings where each string represents the name of the sheet 
    var rows = XLSX.utils.sheet_to_json(sheet, {header: 1});
    //the "header" property of the options object is set to 1, which indicates that the first row of the sheet contains the column headers.

  

    // Render the data in a table
    var tableHtml = '<table class="my-table">';
    tableHtml += '<thead><tr>';
    //loop to input headers in the table.
    for (var i = 0; i < rows[0].length; i++) {
      tableHtml += '<th>' + rows[0][i] + '</th>';
    }
    tableHtml += '</tr></thead><tbody>';
    //ends the header and starts the body

    for (var i = 1; i < rows.length; i++) {
      tableHtml += '<tr class="trClass">';
      for (var j = 0; j < rows[i].length; j++) {
        if(rows[i][0] === undefined) {
          rows[i][0] = rows[i-1][0];
        }
        var tdValue = rows[i][j];
        if (tdValue === undefined) {
          tdValue = '';
        }
        tableHtml += '<td class="tdClass">' + tdValue + '</td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table>';

    // Insert the table into the HTML page
    document.getElementById('table-container').innerHTML = tableHtml;
  }
};
request.send();

function searchTable(inputId) {
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById(inputId);
  filter = input.value.toUpperCase();
  table = document.getElementsByTagName("table")[0];
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");

    for (j = 0; j < td.length; j++) {
      txtValue = td[j].textContent || td[j].innerText;

      if (j === 0) {
        // Always show the first column
        td[j].style.display = "";
      } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
        // Show matching cells
        td[j].style.display = "";
      } else if (j>0 && txtValue.toUpperCase().indexOf(filter) == -1) {
        td[j].textContent = "";
      } else {
        td[j].style.display = "none";
      }
    }
  }
}
