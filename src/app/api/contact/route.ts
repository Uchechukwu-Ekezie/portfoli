// app/api/contact/route.ts
import nodemailer from "nodemailer";

interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { from_name, from_email, subject, message }: ContactFormData =
      await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Consider moving to env variables
      },
    });

    // Enhanced HTML email template with portfolio styling
    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    line-height: 1.6;
                    color: #ffffff;
                    background-color: #000000;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #000000;
                    border: 1px solid #1f1f1f;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                }
                
                .header {
                    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                    padding: 32px 24px;
                    text-align: center;
                    border-bottom: 2px solid #facc15;
                }
                
                .header h1 {
                    color: #facc15;
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    letter-spacing: -0.5px;
                }
                
                .header p {
                    color: #d1d5db;
                    font-size: 16px;
                    font-weight: 400;
                }
                
                .content {
                    padding: 32px 24px;
                    background-color: #0a0a0a;
                }
                
                .field-group {
                    margin-bottom: 24px;
                    padding: 20px;
                    background-color: #111111;
                    border-radius: 8px;
                    border-left: 4px solid #facc15;
                }
                
                .field-label {
                    color: #facc15;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                    display: block;
                }
                
                .field-value {
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 400;
                    word-wrap: break-word;
                }
                
                .field-value a {
                    color: #facc15;
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .field-value a:hover {
                    text-decoration: underline;
                }
                
                .message-field {
                    background-color: #111111;
                    border-radius: 8px;
                    border-left: 4px solid #facc15;
                    padding: 20px;
                    margin-top: 8px;
                }
                
                .message-content {
                    background-color: #1a1a1a;
                    padding: 16px;
                    border-radius: 6px;
                    color: #e5e7eb;
                    font-size: 15px;
                    line-height: 1.7;
                    white-space: pre-wrap;
                    border: 1px solid #2a2a2a;
                }
                
                .footer {
                    background-color: #000000;
                    padding: 24px;
                    text-align: center;
                    border-top: 1px solid #1f1f1f;
                }
                
                .footer p {
                    color: #9ca3af;
                    font-size: 13px;
                    margin-bottom: 8px;
                }
                
                .timestamp {
                    color: #6b7280;
                    font-size: 12px;
                    font-style: italic;
                }
                
                .divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #facc15, transparent);
                    margin: 24px 0;
                }
                
                @media only screen and (max-width: 600px) {
                    .email-container {
                        margin: 0;
                        border-radius: 0;
                    }
                    
                    .header, .content, .footer {
                        padding: 24px 16px;
                    }
                    
                    .header h1 {
                        font-size: 24px;
                    }
                    
                    .field-group {
                        padding: 16px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>📧 New Contact Submission</h1>
                    <p>Someone reached out through your portfolio</p>
                </div>
                
                <div class="content">
                    <div class="field-group">
                        <span class="field-label">Contact Name</span>
                        <div class="field-value">${from_name}</div>
                    </div>
                    
                    <div class="field-group">
                        <span class="field-label">Email Address</span>
                        <div class="field-value">
                            <a href="mailto:${from_email}">${from_email}</a>
                        </div>
                    </div>
                    
                    <div class="field-group">
                        <span class="field-label">Subject</span>
                        <div class="field-value">${subject}</div>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <div class="field-group">
                        <span class="field-label">Message</span>
                        <div class="message-field">
                            <div class="message-content">${message}</div>
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>💼 Sent from your Portfolio Contact Form</p>
                    <p class="timestamp">Received on ${new Date().toLocaleString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      }
                    )}</p>
                </div>
            </div>
        </body>
        </html>
        `;

    await transporter.sendMail({
      from: `"${from_name} (${from_email})" <Oshiomah.oyageshio@gmail.com>`,
      to: "Oshiomah.oyageshio@gmail.com",
      replyTo: from_email,
      subject: `🚀 ${from_name}: ${subject}`,
      text: `
New Contact Form Submission

Name: ${from_name}
Email: ${from_email}
Subject: ${subject}

Message:
${message}

---
Received: ${new Date().toLocaleString()}
            `,
      html: htmlTemplate,
    });

    return Response.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
