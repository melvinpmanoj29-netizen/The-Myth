// Helper to safely escape user inputs for HTML templates
export function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface EmailParams {
  name: string;
  age: number;
  location: string;
  email: string;
  grievance: string;
  transmissionId: string;
  submittedAt: string;
}

/**
 * Generates the HTML and Plain Text templates for the Owner Notification Email
 */
export function createOwnerEmail(params: EmailParams): { html: string; text: string } {
  const { name, age, location, email, grievance, transmissionId, submittedAt } = params;

  const safeName = escapeHtml(name);
  const safeLocation = escapeHtml(location);
  const safeEmail = escapeHtml(email);
  const safeGrievance = escapeHtml(grievance);
  const safeTransmissionId = escapeHtml(transmissionId);
  const safeSubmittedAt = escapeHtml(submittedAt);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THE MYTH — NEW HELP REQUEST</title>
  <style>
    body {
      background-color: #0B0B0D;
      color: #F2F2F2;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 24px;
      line-height: 1.5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #151518;
      border: 1px solid #27272E;
      border-top: 4px solid #C1121F;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      padding: 24px;
      background-color: #1D1D22;
      border-bottom: 1px solid #27272E;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #00E5FF;
      background-color: rgba(0, 229, 255, 0.1);
      border: 1px solid rgba(0, 229, 255, 0.3);
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .title {
      color: #F2F2F2;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 1px;
      margin: 0;
    }
    .subtitle {
      color: #96969E;
      font-size: 13px;
      margin-top: 4px;
      margin-bottom: 0;
    }
    .content {
      padding: 24px;
    }
    .section-title {
      color: #96969E;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 0;
      margin-bottom: 14px;
      border-bottom: 1px solid #27272E;
      padding-bottom: 6px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .info-table td {
      padding: 10px;
      border: 1px solid #1D1D22;
      background-color: #0B0B0D;
    }
    .label {
      color: #96969E;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      width: 35%;
    }
    .value {
      color: #F2F2F2;
      font-size: 14px;
      font-weight: 600;
    }
    .grievance-box {
      background-color: #0B0B0D;
      border: 1px solid #1D1D22;
      border-left: 3px solid #C1121F;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 24px;
    }
    .grievance-text {
      color: #F2F2F2;
      font-size: 14px;
      line-height: 1.6;
      white-space: pre-wrap;
      margin: 0;
    }
    .footer {
      padding: 16px 24px;
      background-color: #0B0B0D;
      border-top: 1px solid #1D1D22;
      text-align: center;
      color: #62626B;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">SIGNAL TRANSMITTED</span>
      <h1 class="title">THE MYTH — NEW HELP REQUEST</h1>
      <p class="subtitle">Transmission Ref: ${safeTransmissionId}</p>
    </div>
    <div class="content">
      <div class="section-title">VISITOR INFORMATION</div>
      <table class="info-table">
        <tr>
          <td class="label">Name:</td>
          <td class="value">${safeName}</td>
        </tr>
        <tr>
          <td class="label">Age:</td>
          <td class="value">${age}</td>
        </tr>
        <tr>
          <td class="label">Location:</td>
          <td class="value">${safeLocation}</td>
        </tr>
        <tr>
          <td class="label">Email:</td>
          <td class="value" style="color: #00E5FF;">${safeEmail}</td>
        </tr>
      </table>

      <div class="section-title">REQUEST</div>
      <div class="grievance-box">
        <p class="grievance-text">${safeGrievance}</p>
      </div>

      <div class="section-title">SUBMISSION</div>
      <table class="info-table">
        <tr>
          <td class="label">Timestamp:</td>
          <td class="value">${safeSubmittedAt}</td>
        </tr>
        <tr>
          <td class="label">Reference ID:</td>
          <td class="value" style="color: #00E5FF; font-family: monospace;">${safeTransmissionId}</td>
        </tr>
      </table>
    </div>
    <div class="footer">
      THE MYTH Emergency Response Portal &bull; Confidential Transmission
    </div>
  </div>
</body>
</html>`;

  const text = `THE MYTH — NEW HELP REQUEST
Transmission Ref: ${transmissionId}

VISITOR INFORMATION
Name: ${name}
Age: ${age}
Location: ${location}
Email: ${email}

REQUEST
Grievance / Request:
${grievance}

SUBMISSION
Timestamp: ${submittedAt}
Transmission ID: ${transmissionId}

— THE MYTH Response Network`;

  return { html, text };
}

/**
 * Generates the HTML and Plain Text templates for the Visitor Confirmation Email
 */
export function createVisitorConfirmationEmail(params: {
  name: string;
  grievance: string;
  transmissionId: string;
  submittedAt: string;
}): { html: string; text: string } {
  const { name, grievance, transmissionId, submittedAt } = params;

  const safeName = escapeHtml(name);
  const safeGrievance = escapeHtml(grievance);
  const safeTransmissionId = escapeHtml(transmissionId);
  const safeSubmittedAt = escapeHtml(submittedAt);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THE MYTH — Your Request Has Been Heard</title>
  <style>
    body {
      background-color: #0B0B0D;
      color: #F2F2F2;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 24px;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #151518;
      border: 1px solid #27272E;
      border-top: 4px solid #00E5FF;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      padding: 24px;
      background-color: #1D1D22;
      border-bottom: 1px solid #27272E;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #00E5FF;
      background-color: rgba(0, 229, 255, 0.1);
      border: 1px solid rgba(0, 229, 255, 0.3);
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .title {
      color: #F2F2F2;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 1px;
      margin: 0;
    }
    .subtitle {
      color: #96969E;
      font-size: 13px;
      margin-top: 4px;
      margin-bottom: 0;
    }
    .content {
      padding: 24px;
    }
    .greeting {
      font-size: 16px;
      font-weight: 700;
      color: #F2F2F2;
      margin-bottom: 14px;
    }
    .message {
      color: #C5C5CE;
      font-size: 14px;
      margin-bottom: 18px;
    }
    .request-box {
      background-color: #0B0B0D;
      border: 1px solid #1D1D22;
      border-left: 3px solid #00E5FF;
      padding: 16px;
      border-radius: 4px;
      margin: 20px 0;
    }
    .request-label {
      color: #96969E;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .request-content {
      color: #F2F2F2;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre-wrap;
      margin: 0;
    }
    .meta-line {
      color: #96969E;
      font-size: 12px;
      margin-top: 14px;
    }
    .meta-val {
      color: #F2F2F2;
      font-family: monospace;
    }
    .signoff {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #27272E;
      color: #F2F2F2;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .footer {
      padding: 16px 24px;
      background-color: #0B0B0D;
      border-top: 1px solid #1D1D22;
      text-align: center;
      color: #62626B;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">SIGNAL RECORDED</span>
      <h1 class="title">THE MYTH</h1>
      <p class="subtitle">YOUR MESSAGE HAS BEEN HEARD</p>
    </div>
    <div class="content">
      <div class="greeting">Hi ${safeName},</div>
      <p class="message">
        Your request has reached me. Your message has been received and recorded.
      </p>

      <div class="request-box">
        <div class="request-label">REQUEST:</div>
        <p class="request-content">${safeGrievance}</p>
      </div>

      <div class="meta-line">
        <strong>SUBMITTED:</strong> <span class="meta-val">${safeSubmittedAt}</span><br>
        <strong>TRANSMISSION REF:</strong> <span class="meta-val" style="color: #00E5FF;">${safeTransmissionId}</span>
      </div>

      <p class="message" style="margin-top: 20px; font-style: italic; color: #96969E;">
        You took the first step by speaking.
      </p>

      <div class="signoff">
        — THE MYTH
      </div>
    </div>
    <div class="footer">
      THE MYTH Response Network &bull; Confidential Transmission
    </div>
  </div>
</body>
</html>`;

  const text = `THE MYTH
YOUR MESSAGE HAS BEEN HEARD.

Hi ${name},

Your request has reached me.
Your message has been received and recorded.

REQUEST:
${grievance}

SUBMITTED:
${submittedAt}

Transmission Reference: ${transmissionId}

You took the first step by speaking.

— THE MYTH`;

  return { html, text };
}
