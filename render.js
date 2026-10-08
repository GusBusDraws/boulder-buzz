// Load the local CSV file when the page loads
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
  const rows = csvData.trim().split('\n');
  let html = '<table><tbody>';

  // Get data rows
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i].trim()) continue;
    const cols = rows[i].split(',');
    html += `<tr><td>${cols[0].trim()}</td>`;
    if (cols[4].trim() != '') {
      html += `<td><a href="${cols[4].trim()}" target="_blank">${cols[1].trim()}</a>`;
    } else {
      html += `<td><b>${cols[1].trim()}</b>`;
    }
    
    if (cols[2].trim() != ''){
      html += `, ${cols[2].trim()}`;
    }

    if (cols[3].trim() != ''){
      html += `, ${cols[3].trim()}`;
    }
    
    html += '</td></tr>'
  }

  html += '</tbody></table>';
  document.getElementById('table-container').innerHTML = html;
}