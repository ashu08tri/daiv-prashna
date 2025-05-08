import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

const headers = [
  "Email", "Name", "Phone No", "Place", "Reason", "Country",
  "Date", "Appointment Date", "Time", "Gender", "Nationality", "Organization",
  "Yoga Type", "Vastu Type", "Pooja Type", "Astrology Type", "Shraddha Type",
  "Astrology Amount", "Yoga Amount", "Vastu Amount", "Pooja Amount", "Shraddha Amount",
  "Paid"
];

let sheets;
let headerEnsured = false;

async function setupSheets() {
  if (!sheets) {
    const credentialsJSON = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf8')
    );

    const auth = new google.auth.GoogleAuth({
      credentials: credentialsJSON,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: client });
  }
}

export async function appendToSheet(row) {
  try {
    await setupSheets();

    if (!headerEnsured) {
      const check = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1:1',
      });

      const firstRow = check.data.values?.[0] || [];
      const isHeaderPresent = firstRow.join(',') === headers.join(',');

      if (!isHeaderPresent) {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SHEET_ID,
          range: 'Sheet1!A1',
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [headers] },
        });
      }

      headerEnsured = true;
    }

    // Append the actual data
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}
