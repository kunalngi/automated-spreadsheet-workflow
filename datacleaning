/**
 * DataCleaning.gs
 * Handles cleaning, trimming, standardizing, sorting/filtering,
 * and validating data in the working data sheet.
 */

/**
 * Cleans the data sheet:
 * - Trims whitespace from every cell
 * - Removes fully blank rows
 * - Standardizes text case for header row
 */
function cleanData() {
  const sheet = getDataSheet_();
  const range = sheet.getDataRange();
  const values = range.getValues();

  if (values.length <= CONFIG.HEADER_ROW) return; // nothing but header (or empty)

  const cleaned = [];
  for (let i = 0; i < values.length; i++) {
    const row = values[i];

    // Always keep the header row as-is (aside from trimming).
    const trimmedRow = row.map(cell =>
      typeof cell === 'string' ? cell.trim() : cell
    );

    const isHeader = i < CONFIG.HEADER_ROW;
    const isBlankRow = trimmedRow.every(cell => cell === '' || cell === null);

    if (isHeader || !isBlankRow) {
      cleaned.push(trimmedRow);
    }
  }

  sheet.clearContents();
  sheet.getRange(1, 1, cleaned.length, cleaned[0].length).setValues(cleaned);

  SpreadsheetApp.getActiveSpreadsheet().toast('Data cleaned successfully.', 'Automation');
}

/**
 * Removes duplicate rows based on CONFIG.DUPLICATE_KEY_COLUMN.
 * If DUPLICATE_KEY_COLUMN is null, compares the full row instead.
 */
function removeDuplicates() {
  const sheet = getDataSheet_();
  const range = sheet.getDataRange();
  const values = range.getValues();

  if (values.length <= CONFIG.HEADER_ROW) return;

  const header = values.slice(0, CONFIG.HEADER_ROW);
  const dataRows = values.slice(CONFIG.HEADER_ROW);

  const seen = new Set();
  const deduped = [];

  dataRows.forEach(row => {
    const key = CONFIG.DUPLICATE_KEY_COLUMN
      ? row[CONFIG.DUPLICATE_KEY_COLUMN - 1]
      : JSON.stringify(row);

    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(row);
    }
  });

  const removedCount = dataRows.length - deduped.length;

  sheet.clearContents();
  const finalValues = header.concat(deduped);
  sheet.getRange(1, 1, finalValues.length, finalValues[0].length).setValues(finalValues);

  SpreadsheetApp.getActiveSpreadsheet().toast(
    `Removed ${removedCount} duplicate row(s).`,
    'Automation'
  );
}

/**
 * Sorts data by the first column (ascending) and applies a basic filter
 * so users can quickly slice the data in the UI.
 * Adjust the sort column/order to fit your dataset.
 */
function sortAndFilterData() {
  const sheet = getDataSheet_();
  const range = sheet.getDataRange();
  if (range.getNumRows() <= CONFIG.HEADER_ROW) return;

  const sortRange = sheet.getRange(
    CONFIG.HEADER_ROW + 1,
    1,
    range.getNumRows() - CONFIG.HEADER_ROW,
    range.getNumColumns()
  );
  sortRange.sort({ column: 1, ascending: true });

  // Recreate the filter so it always reflects the current data range.
  const existingFilter = sheet.getFilter();
  if (existingFilter) existingFilter.remove();
  range.createFilter();

  SpreadsheetApp.getActiveSpreadsheet().toast('Data sorted and filter applied.', 'Automation');
}

/**
 * Validates that required columns are populated for every row.
 * Highlights invalid rows in red so users can spot issues quickly.
 */
function validateData() {
  const sheet = getDataSheet_();
  const range = sheet.getDataRange();
  const values = range.getValues();

  if (values.length <= CONFIG.HEADER_ROW) return;

  let invalidCount = 0;

  for (let i = CONFIG.HEADER_ROW; i < values.length; i++) {
    const row = values[i];
    const isInvalid = CONFIG.REQUIRED_COLUMNS.some(colIndex => {
      const cell = row[colIndex - 1];
      return cell === '' || cell === null || cell === undefined;
    });

    const rowRange = sheet.getRange(i + 1, 1, 1, row.length);
    if (isInvalid) {
      rowRange.setBackground('#f8d7da'); // light red
      invalidCount++;
    } else {
      rowRange.setBackground(null);
    }
  }

  SpreadsheetApp.getActiveSpreadsheet().toast(
    `Validation complete. ${invalidCount} row(s) flagged.`,
    'Automation'
  );
}

/**
 * Helper: returns the configured data sheet, creating it if missing.
 */
function getDataSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.DATA_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.DATA_SHEET_NAME);
  }
  return sheet;
}
