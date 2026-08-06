import nodemailer from 'nodemailer';

export interface EmailData {
  type: 'contact' | 'quote';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  interest?: string;
  productName?: string;
  timeline?: string;
  message?: string;
}

// SMTP Transporter configuration
export function getSmtpTransporter() {
  const host = process.env.SMTP_HOST || 'smtpout.secureserver.net';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('[SMTP Warning] SMTP_USER or SMTP_PASS environment variables are missing. Email dispatch will attempt fallback or simulation.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendNotificationEmail(data: EmailData) {
  const transporter = getSmtpTransporter();
  const recipientEmail = process.env.SMTP_TO || 'ews@electrasystems24.com';
  const senderEmail = process.env.SMTP_FROM || `"EWS Web Portal" <${process.env.SMTP_USER || 'ews@electrasystems24.com'}>`;

  const isQuote = data.type === 'quote';
  const targetProduct = data.productName || data.interest;
  const title = isQuote 
    ? (data.productName ? `[Product Inquiry] ${data.productName}` : `[New Quote Request] ${data.interest || 'EWS Machine Solution'}`)
    : `[Contact Form] ${data.subject || 'General Inquiry'}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-top: 5px solid #f97316; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Email Header -->
          <div style="padding: 20px 24px; background-color: #050b14; color: #ffffff; border-bottom: 1px solid #1e293b;">
            <div style="font-size: 11px; font-weight: bold; color: #f97316; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
              Electra Weighing Systems (EWS)
            </div>
            <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff;">
              ${title}
            </h2>
          </div>

          <!-- Email Content Body -->
          <div style="padding: 24px; color: #1e293b;">
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">
                  <b style="color: #000000;">Submission Type:</b> ${data.type.toUpperCase()}
                </td>
              </tr>
              ${targetProduct ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">
                  <b style="color: #000000;">Product Name / Machine System:</b> <span style="color: #ea580c; font-weight: bold;">${targetProduct}</span>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">
                  <b style="color: #000000;">Sender Name:</b> ${data.name}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">
                  <b style="color: #000000;">Email Address:</b> <a href="mailto:${data.email}" style="color: #ea580c; font-weight: bold; text-decoration: none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">
                  <b style="color: #000000;">Phone Number:</b> <a href="tel:${data.phone}" style="color: #0f172a; font-weight: bold; text-decoration: none;">${data.phone || 'Not Provided'}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">
                  <b style="color: #000000;">Company / Organization:</b> ${data.company || 'Not Specified'}
                </td>
              </tr>
              ${isQuote ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">
                  <b style="color: #000000;">Project Timeline:</b> ${data.timeline || 'Immediate'}
                </td>
              </tr>
              ` : `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">
                  <b style="color: #000000;">Subject:</b> ${data.subject || 'General Inquiry'}
                </td>
              </tr>
              `}
            </table>

            <!-- Inquiry Message Section -->
            <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #f97316; border-radius: 4px; border: 1px solid #e2e8f0; border-left-width: 4px;">
              <p style="margin: 0 0 6px 0; font-size: 14px;"><b style="color: #000000;">Project Inquiry / Message:</b></p>
              <div style="color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message || 'No detailed message provided.'}</div>
            </div>

          </div>

          <!-- Email Footer -->
          <div style="padding: 14px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
            Submitted via <b>Electra Weighing Systems Web Portal</b> &bull; ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </div>

        </div>
      </body>
    </html>
  `;

  console.log('\n==================== [SMTP EMAIL DISPATCH INITIATED] ====================');
  console.log(` 📧 Type      : ${data.type.toUpperCase()}`);
  console.log(` 👤 Sender    : ${data.name} <${data.email}>`);
  console.log(` 🏢 Company   : ${data.company || 'N/A'}`);
  console.log(` 📞 Phone     : ${data.phone || 'N/A'}`);
  console.log(` 📨 SMTP From : ${senderEmail}`);
  console.log(` 📥 SMTP To   : ${recipientEmail}`);
  console.log(` 📌 Subject   : ${title}`);
  console.log(` 🌐 Transporter: Host=${process.env.SMTP_HOST || 'smtp.gmail.com'}, Port=${process.env.SMTP_PORT || 465}, User=${process.env.SMTP_USER || 'NONE'}`);
  console.log('========================================================================\n');

  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: recipientEmail,
      replyTo: data.email,
      subject: title,
      html: htmlContent,
    });

    console.log('✅ [SMTP SUCCESS] Email sent successfully!');
    console.log(`   Message ID : ${info.messageId}`);
    console.log(`   Accepted   : ${JSON.stringify(info.accepted)}`);
    console.log(`   Response   : ${info.response}\n`);

    // Dispatch automated confirmation email directly to customer's email address
    try {
      await sendCustomerConfirmationEmail(data);
    } catch (err) {
      console.error('[Customer Confirmation Error]:', err);
    }

    return info;
  } catch (error: any) {
    console.error('❌ [SMTP ERROR] Email dispatch failed!');
    console.error(`   Error Message : ${error.message}`);
    console.error(`   Error Code    : ${error.code || 'N/A'}`);
    console.error(`   Error Command : ${error.command || 'N/A'}`);
    if (error.response) {
      console.error(`   SMTP Response : ${error.response}`);
    }
    console.error('   Stack Trace   :', error);
    console.error('========================================================================\n');
    throw error;
  }
}

// Send automated receipt confirmation email to the customer's email address
export async function sendCustomerConfirmationEmail(data: EmailData) {
  const transporter = getSmtpTransporter();
  const recipientEmail = process.env.SMTP_TO || 'ews@electrasystems24.com';
  const senderEmail = process.env.SMTP_FROM || `"Electra Weighing Systems" <${process.env.SMTP_USER || 'ews@electrasystems24.com'}>`;
  const isQuote = data.type === 'quote';
  const targetProduct = data.productName || data.interest;

  const subject = `Thank you for contacting Electra Weighing Systems - ${targetProduct || 'Inquiry Received'}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="font-family: Arial, Helvetica, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-top: 5px solid #f97316; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="padding: 20px 24px; background-color: #050b14; color: #ffffff;">
            <div style="font-size: 11px; font-weight: bold; color: #f97316; text-transform: uppercase; letter-spacing: 1.5px;">Electra Weighing Systems (EWS)</div>
            <h2 style="margin: 6px 0 0 0; font-size: 18px; color: #ffffff;">We Have Received Your ${isQuote ? 'Quote Request' : 'Inquiry'}</h2>
          </div>

          <!-- Body -->
          <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <p style="margin-top: 0;">Dear <b>${data.name}</b>,</p>
            <p>Thank you for reaching out to <b>Electra Weighing Systems (EWS)</b>. We have successfully received your ${isQuote ? 'quotation request' : 'inquiry'}${targetProduct ? ` regarding <b>${targetProduct}</b>` : ''}.</p>
            <p>Our engineering team is reviewing your project specifications and will get in touch with you shortly.</p>
            
            <div style="margin: 20px 0; padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
              <h4 style="margin: 0 0 10px 0; color: #000000; font-size: 14px;">Summary of Submitted Request:</h4>
              <p style="margin: 4px 0;"><b style="color: #000000;">Sender Name:</b> ${data.name}</p>
              <p style="margin: 4px 0;"><b style="color: #000000;">Email:</b> ${data.email}</p>
              <p style="margin: 4px 0;"><b style="color: #000000;">Phone:</b> ${data.phone || 'N/A'}</p>
              ${targetProduct ? `<p style="margin: 4px 0;"><b style="color: #000000;">Product / Machine:</b> ${targetProduct}</p>` : ''}
              ${data.timeline ? `<p style="margin: 4px 0;"><b style="color: #000000;">Timeline:</b> ${data.timeline}</p>` : ''}
            </div>

            <p style="color: #64748b; font-size: 13px;">If you have any urgent technical requirements, feel free to reply directly to this email or call our team at <b>+91 9566962031</b> / <b>+91 9943182031</b> / <b>+91 6361763911</b>.</p>
            
            <p style="margin-top: 24px; margin-bottom: 0;">Best regards,<br/><b>Electra Weighing Systems Engineering Team</b></p>
          </div>

          <!-- Footer -->
          <div style="padding: 14px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center;">
            Electra Weighing Systems &bull; ISO 9001:2015 Certified Manufacturing Pioneer
          </div>

        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: data.email,
      replyTo: recipientEmail,
      subject: subject,
      html: htmlContent,
    });
    console.log(`✅ [CUSTOMER CONFIRMATION SENT] Delivered confirmation email to customer (${data.email})! Message ID: ${info.messageId}`);
    return info;
  } catch (err: any) {
    console.error(`⚠️ [CUSTOMER CONFIRMATION WARNING] Could not send confirmation email to customer (${data.email}):`, err.message);
  }
}
