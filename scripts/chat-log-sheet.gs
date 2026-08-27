/**
 * Google Apps Script — receives chat-log POSTs from /api/chat and keeps ONE row
 * per conversation in a Google Sheet (matched on the conversation id, so the row
 * is rewritten with the full transcript as the chat continues).
 *
 * Setup:
 *   1. Create a Google Sheet → Extensions → Apps Script → paste this file in.
 *   2. Run `setup` once (grant permission, write the header row).
 *   3. Deploy → New deployment → "Web app":
 *        Execute as: Me   ·   Who has access: Anyone
 *      Copy the /exec URL → it's the CHAT_LOG_WEBHOOK / LOG_WEBHOOK_DEFAULT.
 *   4. AFTER EDITING THIS FILE: Deploy → Manage deployments → (edit, pencil) →
 *      Version: "New version" → Deploy. Same URL, new code. (A brand-new
 *      deployment gives a different URL.)
 *
 * Payload (one POST per turn):
 *   { at, id, ip, location, ua, messages: [{ role, content }], reply }
 */

var SHEET_NAME = 'chat-logs';
var HEADERS = [
  'Conversation ID',
  'Started',
  'Last activity',
  'IP',
  'Location',
  'User agent',
  'Turns',
  'First question',
  'Latest reply',
  'Full transcript',
];

function setup() {
  var sheet = getSheet_();
  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    var id = String(data.id || '');
    var messages = Array.isArray(data.messages) ? data.messages : [];

    var firstUser = '';
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].role === 'user') { firstUser = messages[i].content; break; }
    }

    var lines = messages.map(function (m) {
      return String(m.role).toUpperCase() + ': ' + m.content;
    });
    if (data.reply) lines.push('ASSISTANT: ' + data.reply);
    var transcript = lines.join('\n\n');

    var turns = messages.filter(function (m) { return m.role === 'user'; }).length;
    var now = data.at || new Date().toISOString();

    var existingRow = id ? findRowById_(sheet, id) : 0;

    if (existingRow) {
      // Update in place — keep original "Started", refresh everything else.
      var started = sheet.getRange(existingRow, 2).getValue() || now;
      sheet.getRange(existingRow, 1, 1, HEADERS.length).setValues([[
        id, started, now, data.ip || '', data.location || '', data.ua || '',
        turns, firstUser, data.reply || '', transcript,
      ]]);
    } else {
      sheet.appendRow([
        id, now, now, data.ip || '', data.location || '', data.ua || '',
        turns, firstUser, data.reply || '', transcript,
      ]);
    }
    return json_({ ok: true, row: existingRow || sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function findRowById_(sheet, id) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var ids = sheet.getRange(2, 1, last - 1, 1).getValues();
  for (var r = 0; r < ids.length; r++) {
    if (String(ids[r][0]) === id) return r + 2;
  }
  return 0;
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
