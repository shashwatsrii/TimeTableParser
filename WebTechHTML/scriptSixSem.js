// URL of the Excel file
var excelUrl = "BTECH_6_sem.xlsx";

// Load the Excel file using AJAX
var xhr = new XMLHttpRequest();
xhr.open('GET', excelUrl, true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  if (xhr.status == 200) {
    // Parse the Excel file using SheetJS library
    var data = new Uint8Array(xhr.response);
    var workbook = XLSX.read(data, {type: 'array'});
    var sheet = workbook.Sheets[workbook.SheetNames[0]];
    var rows = XLSX.utils.sheet_to_json(sheet, {header: 1});

    // Render the data in a table
    var tableHtml = '<table class="my-table">';
    tableHtml += '<thead><tr>';
    for (var i = 0; i < rows[0].length; i++) {
      tableHtml += '<th>' + rows[0][i] + '</th>';
    }
    tableHtml += '</tr></thead><tbody>';

    for (var i = 1; i < rows.length; i++) {
      tableHtml += '<tr class="trClass">';
      for (var j = 0; j < rows[i].length; j++) {
        if(rows[i][0] === undefined) {
          rows[i][0] = rows[i-1][0];
        }
        var cellValue = rows[i][j];
        if (cellValue === undefined) {
          cellValue = '';
        }
        tableHtml += '<td class="tdClass">' + cellValue + '</td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table>';

    // Insert the table into the HTML page
    document.getElementById('table-container').innerHTML = tableHtml;
  }
};
xhr.send();

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
