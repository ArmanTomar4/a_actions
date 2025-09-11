function doPost(e) {
  try {
    // Get the specific spreadsheet by name
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName('Actions_form');
    
    // If the sheet doesn't exist, create it
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Actions_form');
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    // Prepare row data
    const rowData = [
      timestamp,
      data.formType || 'Access',
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.jobTitle || '',
      data.company || '',
      data.projectDescription || ''
    ];
    
    // Clear the sheet and add headers (since A1 has existing content)
    sheet.clear();
    sheet.getRange(1, 1, 1, 8).setValues([[
      'Timestamp', 'Form Type', 'Full Name', 'Email', 
      'Phone', 'Job Title', 'Company', 'Project Description'
    ]]);
    
    // Append the new row
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success', 
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error', 
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script is working!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}