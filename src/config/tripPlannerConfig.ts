import { TripInquiryPayload, TripInquiryData } from '../types';

/**
 * ============================================================================
 * FIRST-LOP TRIP PLANNER — GOOGLE APPS SCRIPT WEB APP ENDPOINT
 * ============================================================================
 * 
 * Every submitted trip plan is automatically sent directly to your Google Sheet.
 * Endpoint configured as a single constant for easy updating.
 */

export const GOOGLE_APPS_SCRIPT_URL: string =
  'https://script.google.com/macros/s/AKfycbzyrGmCMVjhwrxCSRy5YPtJTrMrJA7OCzc8CTvYzzDwnWoOSPQGhHd6LAo-jF853zNs/exec';

// Backward-compatible alias
export const GOOGLE_SCRIPT_URL: string = GOOGLE_APPS_SCRIPT_URL;

/**
 * Sends the trip inquiry data to the Google Apps Script Web App endpoint.
 * Payload structure:
 * {
 *   name, email, whatsapp, travelDate, travelers, interests, message, vehicle
 * }
 */
export async function submitTripInquiryToGoogleSheet(
  data: TripInquiryPayload | TripInquiryData
): Promise<{ success: boolean; message: string }> {
  // Normalize payload into the exact required Google Apps Script JSON structure.
  // Length caps are enforced here too (defense in depth — the Apps Script
  // endpoint re-validates and sanitizes everything server-side).
  const cap = (v: string, max: number) => v.slice(0, max);
  const normalizedPayload: TripInquiryPayload = {
    name: cap(String(data.name || '').trim(), 100),
    email: cap(String(data.email || '').trim(), 120),
    whatsapp: cap(String(data.whatsapp || '').trim(), 30),
    travelDate: cap(String(data.travelDate || ''), 60),
    travelers: cap(String(data.travelers ?? (data as TripInquiryData).numberOfTravelers ?? 2), 10),
    interests: cap(
      String(
        data.interests ||
          (Array.isArray((data as TripInquiryData).destinations)
            ? (data as TripInquiryData).destinations!.join(', ')
            : 'Not sure yet')
      ),
      300
    ),
    message: cap(String(data.message || (data as TripInquiryData).additionalNotes || 'None'), 2000),
    vehicle: cap(String((data as TripInquiryPayload).vehicle || 'No car needed'), 120),
    company: String((data as TripInquiryPayload).company || ''),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout
  const body = JSON.stringify(normalizedPayload);

  try {
    // text/plain keeps this a "simple" CORS request (no preflight). Apps Script
    // answers via a redirect that carries Access-Control-Allow-Origin: *, so we
    // can read the JSON reply and only report success when the row was written.
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      cache: 'no-cache',
      redirect: 'follow',
      body,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    let result: { success?: boolean; message?: string } = {};
    try {
      result = await response.json();
    } catch {
      result = {};
    }

    if (!response.ok || result.success === false) {
      throw new Error(result.message || `Server responded with ${response.status}`);
    }

    return { success: true, message: result.message || 'Inquiry recorded.' };
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error('[FIRST-LOP Google Apps Script Submission Error]:', error);

    if (error?.name === 'AbortError') {
      throw new Error('The request timed out. Please check your connection and try again, or message us on WhatsApp.');
    }

    throw new Error("We couldn't save your plan right now. Please try again, or send it to us on WhatsApp.");
  }
}

/**
 * Reference Google Apps Script Code for Google Sheets Web App:
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
/**
 * =========================================================================
 * FIRST-LOP TRIP PLANNER — GOOGLE APPS SCRIPT WEB APP
 * =========================================================================
 * 
 * Paste this into: Extensions > Apps Script in your Google Spreadsheet.
 * Deploy as Web App:
 * - Execute as: Me
 * - Who has access: Anyone
 */

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Clean one field: force string, strip control characters, cap the length,
// and neutralize spreadsheet formula injection — any value starting with
// =, +, -, @ (or tab/CR) is prefixed with an apostrophe so Sheets stores it
// as plain text instead of evaluating it as a formula.
function clean(value, maxLen) {
  var s = String(value == null ? "" : value);
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ").trim();
  if (s.length > maxLen) s = s.slice(0, maxLen);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = lock.tryLock(10000); // Wait up to 10 seconds for concurrent lock
  if (!hasLock) {
    return jsonOut({ success: false, message: "Server busy, please try again." });
  }

  try {
    var data = JSON.parse(e.postData.contents);

    // Honeypot: the "company" field is invisible on the website. If it is
    // filled in, a bot sent this — pretend success and store nothing.
    if (data.company && String(data.company).trim() !== "") {
      return jsonOut({ success: true, message: "Inquiry recorded successfully." });
    }

    var name = clean(data.name, 100);
    var email = clean(data.email, 120);
    var whatsapp = clean(data.whatsapp, 30);
    var travelDate = clean(data.travelDate, 60);
    var travelers = clean(data.travelers || "1", 10);
    var interests = clean(data.interests, 300);
    var budget = clean(data.budget || "Flexible", 60);
    var message = clean(data.message, 2000);
    var vehicle = clean(data.vehicle, 120);

    // Server-side validation (never trust the client alone)
    if (!name) {
      return jsonOut({ success: false, message: "Name is required." });
    }
    if (!email && !whatsapp) {
      return jsonOut({ success: false, message: "Email or WhatsApp is required." });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonOut({ success: false, message: "Invalid email address." });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Auto-create header row on initial submission if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Name",
        "Email",
        "WhatsApp",
        "Travel Date",
        "Travelers",
        "Interests",
        "Budget",
        "Message",
        "Car"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#123B45");
      headerRange.setFontColor("#FAF7F0");
    }

    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

    // Append the new submission row (all fields sanitized by clean())
    sheet.appendRow([
      timestamp,
      name,
      email,
      whatsapp,
      travelDate,
      travelers,
      interests,
      budget,
      message,
      vehicle
    ]);

    return jsonOut({ success: true, message: "Inquiry recorded successfully." });

  } catch (error) {
    return jsonOut({ success: false, message: "Could not record the inquiry." });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("FIRST-LOP Trip Planner Web App is active and ready.")
    .setMimeType(ContentService.MimeType.TEXT);
}
`;
