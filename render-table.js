// Load the CSV file from the web-published Google Sheet
document.addEventListener('DOMContentLoaded', () => {

  const googleSheetUrl =  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEklt4ItFjpYqx20WKdfC9WIJ38vT2JJZWzvJ_83uxwo60U9DIVn2hlflM2YqPb5sP3362U95YSp6L/pub?gid=0&single=true&output=csv'

  fetch(googleSheetUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(csvData => {
      displayTable(csvData);
    })
    .catch(error => {
      console.error('Error fetching the CSV file:', error);
      document.getElementById('table-container').innerText = 'Failed to load data.';
    });
});

function displayTable(csvData) {
  // Get the rows from the Google sheet data
  const rows = csvData.trim().split('\n');
  let html = '<table><tbody>';

  // Load each row into the table
  for (let i = 1; i < rows.length; i++) {
    // Skip empty rows
    if (!rows[i].trim()) continue;
    // Split rows into columns at each comma
    const cols = rows[i].split(',');
    // Split date at whitespace character with a dynamic line break for mobile
    const date = cols[0].split(/\s+/);
    html += `<tr><td>${date[0]}<br class="dynamic-break"/>${date[1]}</td>`;
    // Format link if URL exists, else make title bold
    if (cols[5].trim() != '') {
      html += `<td><a href="${cols[5].trim()}" target="_blank">${cols[1].trim()}</a> `;
    } else {
      html += `<td><b>${cols[1].trim()}</b> `;
    }

    // Add the event cost next to the title if it isn't free
    if (cols[4].trim() != ''){
      html += `(${cols[4].trim()}) `;
    }

    // Add time on the next line or just wrap to the next line
    if (cols[3].trim() != ''){
      html += `<br class="dynamic-break"/>${cols[3].trim()}, `;
    } else {
      html += `<br class="dynamic-break"/>`
    }

    // Add the location
    if (cols[2].trim() != ''){
      html += `${cols[2].trim()}`;
    }

    html += '</td></tr>'
  }

  html += '</tbody></table>';
  document.getElementById('table-container').innerHTML = html;
}
