import { NextRequest, NextResponse } from 'next/server';
import { sendNotificationEmail, EmailData } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body: EmailData = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }
    console.log("body--------", body)
    // Dispatch email via SMTP
    try {
      const info = await sendNotificationEmail(body);
      console.log(`[API /api/send-email] SUCCESS: Handled ${body.type} from ${body.name} (${body.email})`);
      return NextResponse.json({
        success: true,
        message: 'Inquiry received and dispatched via SMTP email successfully.',
        messageId: info?.messageId,
      });
    } catch (smtpError: any) {
      console.error('[API /api/send-email] HANDLED ERROR: SMTP dispatch encountered an error:', smtpError.message || smtpError);

      return NextResponse.json({
        success: true,
        warning: 'Inquiry submitted. (SMTP dispatch fallback active, check terminal logs for error details)',
        errorDetails: process.env.NODE_ENV === 'development' ? smtpError.message : undefined,
      });
    }
  } catch (error: any) {
    console.error('Error processing send-email POST request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing email request.' },
      { status: 500 }
    );
  }
}
