// api/send-email.js
// Booking notification: Email (Resend) + optional WhatsApp (CallMeBot)
//
// Vercel Environment Variables:
//   RESEND_API_KEY        (required)  -> https://resend.com/api-keys
//   BOOKING_NOTIFY_EMAIL  (optional)  -> default: shrisitaram6151@gmail.com
//   MAIL_FROM             (optional)  -> default: onboarding@resend.dev
//                           NOTE: onboarding@resend.dev sirf Resend account wale email par hi
//                           mail bhej sakta hai. Dusre email par bhejne ke liye domain verify karein.
//   CALLMEBOT_KEY_1 / CALLMEBOT_KEY_2 (optional) -> WhatsApp alerts (9918310009 / 8303333309)

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const { bookingId, name, phone, room_type, date, guests, time } = body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'name aur phone zaroori hain' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY missing in Vercel environment variables');
      return res.status(500).json({ success: false, error: 'RESEND_API_KEY set nahi hai' });
    }

    const to = process.env.BOOKING_NOTIFY_EMAIL || 'shrisitaram6151@gmail.com';
    const from = process.env.MAIL_FROM || 'onboarding@resend.dev';

    const row = (label, value) =>
      `<tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;background:#fdf5f5;">${label}</td><td style="padding:10px;border:1px solid #ddd;">${esc(value) || 'N/A'}</td></tr>`;

    const emailResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: `Shri Sitaram Seva Trust <${from}>`,
        to: [to],
        subject: `🚩 Nayi Booking ${bookingId || ''}: ${name}`,
        html: `
          <div style="font-family:sans-serif;padding:20px;color:#333;background:#fff9f9;border-radius:8px;">
            <h2 style="color:#800020;text-align:center;">🚩 Jai Shree Ram! 🚩</h2>
            <h3 style="text-align:center;">Nayi Booking Request Aayi Hai</h3>
            <table style="width:100%;border-collapse:collapse;margin-top:15px;background:#fff;">
              ${row('Booking ID:', bookingId)}
              ${row('Guest Name:', name)}
              ${row('Phone Number:', phone)}
              ${row('Room Type:', room_type)}
              ${row('Check-in Date:', date)}
              ${row('Total Guests:', guests || '2')}
              ${row('Time:', time)}
            </table>
            <p style="text-align:center;font-weight:bold;color:#800020;">Kripya yatri se jald sampark karein.</p>
          </div>`,
      }),
    });

    const emailData = await emailResp.json().catch(() => ({}));
    if (!emailResp.ok) {
      console.error('Resend error:', emailResp.status, emailData);
      return res.status(502).json({ success: false, error: emailData?.message || 'Email send failed', details: emailData });
    }

    // Optional WhatsApp alerts (failure booking ko fail nahi karega)
    const text = encodeURIComponent(
      [
        '🚩 *Shri Sitaram Seva Trust*',
        '*New Booking Alert!*',
        `*ID:* ${bookingId || '-'}`,
        `*Name:* ${name}`,
        `*Phone:* ${phone}`,
        `*Room:* ${room_type || '-'}`,
        `*Date:* ${date || '-'}`,
        `*Guests:* ${guests || '2'}`,
      ].join('\n')
    );
    const wa = [
      { phone: '919918310009', key: process.env.CALLMEBOT_KEY_1 },
      { phone: '918303333309', key: process.env.CALLMEBOT_KEY_2 },
    ].filter((w) => w.key);

    await Promise.allSettled(
      wa.map((w) => fetch(`https://api.callmebot.com/whatsapp.php?phone=${w.phone}&text=${text}&apikey=${w.key}`))
    );

    return res.status(200).json({ success: true, id: emailData?.id, whatsappAttempted: wa.length });
  } catch (error) {
    console.error('send-email crashed:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
