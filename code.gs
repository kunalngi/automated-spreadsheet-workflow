/**
 * Code.gs
 * Entry point: builds the custom menu and wires together the
 * other modules (DataCleaning, ReportGeneration, EmailNotifications, etc.)
 */

/**
 * Runs automatically when the spreadsheet is opened.
 * Adds a custom menu so users can trigger automation manually.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Automation')
    .addItem('Clean Data', 'cleanData')
    .addItem('Remove Duplicates', 'removeDuplicates')
    .addItem('Sort & Filter Data', 'sortAndFilterData')
    .addSeparator()
    .addItem('Generate Report (PDF)', 'generateReport')
    .addItem('Update Dashboard', 'updateDashboard')
    .addSeparator()
    .addItem('Send Email Notification', 'sendEmailNotification')
    .addSeparator()
    .addItem('Run Full Workflow Now', 'runFullWorkflow')
    .addItem('Set Up Daily Trigger', 'setUpDailyTrigger')
    .addItem('Remove All Triggers', 'removeAllTriggers')
    .addToUi();
}

/**
 * Runs the entire pipeline end-to-end:
 * clean -> dedupe -> sort/filter -> validate -> dashboard -> report -> email
 * This is the function scheduled by the daily time-driven trigger.
 */
function runFullWorkflow() {
  try {
    cleanData();
    removeDuplicates();
    sortAndFilterData();
    validateData();
    updateDashboard();
    const pdfFile = generateReport();
    sendEmailNotification(pdfFile);
    logRun_('SUCCESS', 'Full workflow completed successfully.');
  } catch (err) {
    logRun_('ERROR', err.message);
    notifyOnError_(err);
    throw err;
  }
}

/**
 * Writes a timestamped entry to a "Log" sheet so runs are auditable.
 * Creates the Log sheet if it doesn't exist yet.
 */
function logRun_(status, message) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let logSheet = ss.getSheetByName('Log');
  if (!logSheet) {
    logSheet = ss.insertSheet('Log');
    logSheet.appendRow(['Timestamp', 'Status', 'Message']);
  }
  logSheet.appendRow([new Date(), status, message]);
}

/**
 * Sends an email to the script owner if the workflow throws an error,
 * so failures don't go unnoticed.
 */
function notifyOnError_(err) {
  try {
    const owner = Session.getEffectiveUser().getEmail();
    MailApp.sendEmail({
      to: owner,
      subject: `${CONFIG.EMAIL_SUBJECT_PREFIX} Workflow Failed`,
      body: `The automated workflow failed with the following error:\n\n${err.message}\n\n${err.stack || ''}`,
    });
  } catch (e) {
    // Swallow secondary failures (e.g., quota errors) to avoid masking the original error.
  }
}
