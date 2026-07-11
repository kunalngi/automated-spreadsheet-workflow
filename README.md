# Automated Spreadsheet Workflow

A Google Apps Script project that automates repetitive Google Sheets operations such as data cleaning, report generation, email notifications, scheduled tasks, and spreadsheet management.

## Overview

This project eliminates manual, repetitive spreadsheet work by scripting common data operations directly into Google Sheets. It handles data cleaning, deduplication, formatting, report generation, and notifications — all triggered automatically on a schedule or in response to spreadsheet events — reducing manual effort by up to 80% and improving data consistency across workflows.

## Features

- ✅ Automatic data cleaning
- ✅ Duplicate row removal
- ✅ Scheduled report generation
- ✅ Email notifications
- ✅ PDF generation
- ✅ Dashboard updates
- ✅ Custom spreadsheet menus
- ✅ Time-driven triggers
- ✅ Form response processing
- ✅ Data validation

## Technologies

- Google Apps Script
- JavaScript
- Google Sheets
- Gmail API
- Google Drive API
- Google Forms (optional)

## How It Works

1. **Data Cleaning & Formatting** – Scripts scan the active sheet, standardize formatting, and remove blank or malformed rows.
2. **Duplicate Removal** – Identifies and removes duplicate entries based on defined key columns.
3. **Sorting & Filtering** – Automatically sorts and filters data ranges based on configurable rules.
4. **Report Generation** – Compiles processed data into summary reports, optionally exported as PDFs via the Drive API.
5. **Email Notifications** – Uses the Gmail API to send automated alerts, summaries, or generated reports to specified recipients.
6. **Triggers** – Time-driven triggers run daily/weekly jobs; installable triggers respond to sheet edits or form submissions.
7. **Custom Menus** – Adds a custom menu to the Sheets UI so users can run automation functions manually with one click.

## Setup

1. Open your Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Copy the script files from this repository into the Apps Script editor.
4. Update configuration variables (sheet names, email recipients, folder IDs) at the top of the script.
5. Save the project.
6. Run the `onOpen` function once to authorize the script and load the custom menu.
7. (Optional) Set up time-driven triggers via **Triggers > Add Trigger** for scheduled automation.

## Usage

- Use the **custom menu** added to your Google Sheet to manually trigger cleaning, report generation, or email functions.
- Scheduled triggers will run automatically in the background once configured (e.g., daily report generation, weekly cleanup).
- Form responses, if connected, are processed and validated automatically upon submission.

## Business Impact

Reduced repetitive manual spreadsheet work by 80%, improved data consistency, and accelerated reporting through automated workflows.

## License

This project is available for personal and educational use. Feel free to fork and adapt it for your own workflows.
