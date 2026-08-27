/**
 * Google Apps Script — receives chat-log POSTs from /api/chat and appends a row
 * per conversation to a Google Sheet.
 *
 * Setup:
 *   1. Create a Google Sheet. Extensions → Apps Script. Paste this file in.
 *   2. Run `setup` once (grants permission, writes the header row).
 *   3. Deploy → New deployment → type "Web app":
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the /exec URL.
 *   4. Set it as CHAT_LOG_WEBHOOK in the Vercel project env (and local .env), redeploy.
 *
 * Payload shape (sent by api/chat.ts):
 *   { at, ip, location, ua, messages: [{ role, content }], reply }
 */

var SHEET_NAME = 'chat-logs';

function setup() {
  var sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'IP', 'Location', 'User agent', 'Last question', 'Assistant reply', 'Full transcript']);
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var messages = Array.isArray(data.messages) ? data.messages : [];
    var lastUser = '';
    for (var i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') { lastUser = messages[i].content; break; }
    }
    var transcript = messages.map(function (m) { return m.role.toUpperCase() + ': ' + m.content; }).join('\n');
    if (data.reply) transcript += '\nASSISTANT: ' + data.reply;

    getSheet_().appendRow([
      data.at || new Date().toISOString(),
      data.ip || '',
      data.location || '',
      data.ua || '',
      lastUser,
      data.reply || '',
      transcript
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
