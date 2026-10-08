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
 *   name, email, whatsapp, travelDate, travelers, interests, message
 * }
 */
export async function submitTripInquiryToGoogleSheet(
  data: TripInquiryPayload | TripInquiryData
): Promise<{ success: boolean; message: string }> {
  // Normalize payload into the exact required Google Apps Script JSON structure
  const normalizedPayload: TripInquiryPayload = {
    name: String(data.name || '').trim(),
    email: String(data.email || '').trim(),
    whatsapp: String(data.whatsapp || '').trim(),
    travelDate: String(data.travelDate || ''),
    travelers: String(data.travelers ?? (data as TripInquiryData).numberOfTravelers ?? 2),
    interests: String(
      data.interests ||
        (Array.isArray((data as TripInquiryData).destinations)
          ? (data as TripInquiryData).destinations!.join(', ')
          : 'Not sure yet')
    ),
    message: String(data.message || (data as TripInquiryData).additionalNotes || 'None'),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

  try {
    // Mode 'no-cors' is required for browser-to-Google-Apps-Script POST requests
    // to prevent CORS redirect failures ("Load failed").
    // The request body contains the complete serialized JSON payload.
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      body: JSON.stringify(normalizedPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Because 'no-cors' produces an opaque response, we do not call response.json()
    // and treat the request as submitted once the fetch promise resolves.
    return {
      success: true,
      message: 'Inquiry successfully submitted to Google Sheets.',
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error('[FIRST-LOP Google Apps Script Submission Error]:', error);

    if (error?.name === 'AbortError') {
      throw new Error('The request timed out. Please check your connection and try again.');
    }

    throw new Error("We couldn't send your inquiry right now. Please try again.");
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

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for concurrent lock
  
  try {
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
        "Message"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#123B45");
      headerRange.setFontColor("#FAF7F0");
    }
    
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    var name = data.name || "";
    var email = data.email || "";
    var whatsapp = data.whatsapp || "";
    var travelDate = data.travelDate || "";
    var travelers = data.travelers || "1";
    var interests = data.interests || "";
    var budget = data.budget || "Flexible";
    var message = data.message || "";
    
    // Append the new submission row
    sheet.appendRow([
      timestamp,
      name,
      email,
      whatsapp,
      travelDate,
      travelers,
      interests,
      budget,
      message
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Inquiry recorded successfully." }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
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
