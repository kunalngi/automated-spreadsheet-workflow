/**
 * Config.gs
 * Central configuration for the Automated Spreadsheet Workflow project.
 * Update these values to match your spreadsheet and workflow needs.
 */

const CONFIG = {
  // Name of the sheet that holds the raw/working data
  DATA_SHEET_NAME: 'Data',

  // Name of the sheet used for the summary dashboard
  DASHBOARD_SHEET_NAME: 'Dashboard',

  // Name of the sheet that logs form responses (if using Google Forms)
  FORM_RESPONSES_SHEET_NAME: 'Form Responses 1',

  // Column (1-indexed) used to detect duplicate rows. Set to null to compare full rows.
  DUPLICATE_KEY_COLUMN: 1,

  // Row number where the header lives
  HEADER_ROW: 1,

  // Column indices (1-indexed) that must not be empty for a row to be considered valid
  REQUIRED_COLUMNS: [1, 2],

  // Email settings
  REPORT_RECIPIENTS: ['team@example.com'],
  EMAIL_SUBJECT_PREFIX: '[Automated Report]',

  // Google Drive folder ID where generated PDF reports are stored.
  // Leave as '' to store in the root of My Drive.
  REPORT_FOLDER_ID: '',

  // Timezone used for formatting dates in reports/emails
  TIMEZONE: Session.getScriptTimeZone(),
};
