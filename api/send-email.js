export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, phone, room_type, date, guests } = req.body;
    const apiKey = process.env.RESEND_API_KEY; 

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Shri Sitaram Seva Trust <onboarding@resend.dev>',
        to: ['shrisitaram6151@gmail.com'], 
        subject: `🚨 Nayi Booking Request: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #fff9f9; border-radius: 8px;">
            <h2 style="color: #800020; text-align: center;">🚩 Jai Shree Ram! 🚩</h2>
            <h3 style="color: #333; text-align: center;">Nayi Booking Request Aayi Hai</h3>
            <hr style="border: 1px solid #ffcccc;"/>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; background: #fff;">
              <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #fdf5f5;">Guest Name:</td><td style="padding: 10px; border: 1px solid #ddd;">${name || 'N/A'}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #fdf5f5;">Phone Number:</td><td style="padding: 10px; border: 1px solid #ddd;">${phone || 'N/A'}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #fdf5f5;">Room Type:</td><td style="padding: 10px; border: 1px solid #ddd;">${room_type || 'N/A'}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #fdf5f5;">Check-in Date:</td><td style="padding: 10px; border: 1px solid #ddd;">${date || 'N/A'}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #fdf5f5;">Total Guests:</td><td style="padding: 10px; border: 1px solid #ddd;">${guests || '2'}</td></tr>
            </table>
            <br/>
            <p style="text-align: center; font-weight: bold; color: #800020;">Kripya Admin Dashboard kholkar details check karein.</p>
          </div>
        `,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
