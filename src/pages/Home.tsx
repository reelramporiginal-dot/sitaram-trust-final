import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Heart, 
  Users, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ExternalLink,
  Shield,
  Coffee,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Booking Form States
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    room_type: 'Non-AC Room',
    date: '',
    guests: '2'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================
  // ✅ UPDATED: Booking Form Submit Handler
  // Ab Email + WhatsApp dono notification aayega
  // ============================================
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Unique Booking ID generate karo
    const bookingId = 'BKG-' + Math.floor(1000 + Math.random() * 9000);
    const currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    try {
      // =============================================
      // ✅ STEP 1: EMAIL NOTIFICATION (Web3Forms FREE)
      // Admin ke email pe booking details jayegi
      // =============================================
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',  // ⚠️ APNI KEY YAHAN DALEIN (niche setup guide hai)
          subject: `🚩 New Booking: ${bookingId} - ${formData.name}`,
          from_name: 'Shri Sitaram Seva Trust - Booking System',
          booking_id: bookingId,
          guest_name: formData.name,
          phone: formData.phone,
          room_type: formData.room_type,
          checkin_date: formData.date,
          total_guests: formData.guests,
          booking_time: currentTime,
          message: [
            '🚩 SHRI SITARAM SEVA TRUST',
            '━━━━━━━━━━━━━━━━━━━━━━━',
            'NEW BOOKING RECEIVED!',
            '',
            `📋 Booking ID: ${bookingId}`,
            `👤 Guest Name: ${formData.name}`,
            `📞 Phone: ${formData.phone}`,
            `🏨 Room Type: ${formData.room_type}`,
            `📅 Check-in Date: ${formData.date}`,
            `👥 Total Guests: ${formData.guests}`,
            `⏰ Booking Time: ${currentTime}`,
            '',
            '━━━━━━━━━━━━━━━━━━━━━━━',
            'Kripya yatri se jald sampark karein.',
          ].join('\n'),
        }),
      });

      const result = await response.json();

      if (result.success) {
        // =============================================
        // ✅ STEP 2: WHATSAPP NOTIFICATION (CallMeBot FREE)
        // Reception ke WhatsApp pe message jayega
        // =============================================
        try {
          const whatsappMsg = encodeURIComponent(
            [
              '🚩 *Shri Sitaram Seva Trust*',
              '*━━ New Booking Alert! ━━*',
              '',
              `📋 *Booking ID:* ${bookingId}`,
              `👤 *Name:* ${formData.name}`,
              `📞 *Phone:* ${formData.phone}`,
              `🏨 *Room:* ${formData.room_type}`,
              `📅 *Date:* ${formData.date}`,
              `👥 *Guests:* ${formData.guests}`,
              `⏰ *Time:* ${currentTime}`,
              '',
              '_Kripya yatri se sampark karein._',
            ].join('\n')
          );

          // Reception Number 1
          fetch(
            `https://api.callmebot.com/whatsapp.php?phone=919918310009&text=${whatsappMsg}&apikey=YOUR_CALLMEBOT_API_KEY`,
            { mode: 'no-cors' }
          ).catch(() => {});

          // Reception Number 2 (optional - agar dono numbers pe chahiye)
          fetch(
            `https://api.callmebot.com/whatsapp.php?phone=918303333309&text=${whatsappMsg}&apikey=YOUR_CALLMEBOT_API_KEY_2`,
            { mode: 'no-cors' }
          ).catch(() => {});

        } catch {
          // WhatsApp fail hua toh bhi booking confirm rahegi
        }

        // ✅ SUCCESS: User ko message dikhao
        setSubmitStatus({
          success: true,
          message: `🚩 Jai Shree Ram! Booking ID: ${bookingId} - Aapki booking request darj ho gayi hai. Hum aapse jald sampark karenge. 📞`,
        });

        // Form clear karo
        setFormData({ name: '', phone: '', room_type: 'Non-AC Room', date: '', guests: '2' });

      } else {
        throw new Error('Email bhejne mein problem aayi');
      }
    } catch (error: any) {
      // ❌ ERROR: User ko phone number dikhao
      setSubmitStatus({
        success: false,
        message: `Booking request bhejne mein error hua. Kripya seedhe call karein: 📞 9918310009 ya 8303333309`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { label: 'Lives Impacted', value: '50,000+', icon: Users },
    { label: 'Volunteers', value: '2,500+', icon: Heart },
    { label: 'Projects', value: '120+', icon: Globe },
    { label: 'States', value: '12', icon: MapPin },
  ];

  const initiatives = [
    {
      title: "Education for All",
      description: "Providing quality education and learning materials to underprivileged children in rural areas.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
      category: "Education"
    },
    {
      title: "Healthcare Access",
      description: "Mobile medical units providing free checkups and medicines to remote villages.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800",
      category: "Healthcare"
    },
    {
      title: "Women Empowerment",
      description: "Skill development programs and vocational training for women to gain independence.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
      category: "Social"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Heart className="text-white w-6 h-6" />
              </div>
              <span className={`text-xl font-bold ${scrolled ? 'text-slate-900' : 'text-white'}`}>SITARAM TRUST</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Initiatives', 'Booking', 'Impact', 'Events', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium hover:text-orange-600 transition-colors ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
                >
                  {item}
                </a>
              ))}
              <button className="bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-orange-700 transition-all transform hover:scale-105">
                Donate Now
              </button>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={scrolled ? 'text-slate-900' : 'text-white'}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Initiatives', 'Booking', 'Impact', 'Events', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-slate-600 font-medium hover:bg-orange-50 hover:text-orange-600 rounded-md"
                >
                  {item}
                </a>
              ))}
              <div className="px-3 py-2">
                <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Children smiling"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Building a Better Future <span className="text-orange-500">Together.</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Sitaram Trust is dedicated to empowering communities through education, 
              healthcare, and sustainable development. Join us in making a lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center hover:bg-orange-700 transition-all group text-center">
                Book Dharamshala Room
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 relative z-10 -mt-16 mx-4 rounded-2xl shadow-xl max-w-7xl lg:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-4">
                <stat.icon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800"
              alt="Community work"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">100% Transparent</div>
                  <div className="text-sm text-slate-500">Full audit every year</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Direct Impact</div>
                  <div className="text-sm text-slate-500">Going where it's needed</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">Our Mission</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Creating Sustainable Change in Every Community We Serve
            </h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Shri Sitaram Seva Trust, managed by <strong>Vijay Prakash Tiwari</strong>, believes that every person deserves the opportunity to thrive. Our approach 
              focuses on providing the tools and resources necessary for self-sufficiency, 
              starting with foundational needs like education, health, and divine accommodation for Ayodhya Dhaam yatris.
            </p>
            <div className="space-y-4">
              {[
                "Strategic development of rural schools",
                "Community-based healthcare programs",
                "Sustainable agricultural training",
                "Emergency response and relief"
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="mr-4 mt-1 bg-orange-100 p-1 rounded-full text-orange-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3">Key Programs</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">Our Current Initiatives</h3>
            </div>
            <button className="mt-6 md:mt-0 text-white font-semibold flex items-center hover:text-orange-500 transition-colors">
              View All Programs <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {initiatives.map((item, index) => (
              <div key={index} className="bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700 group hover:border-orange-500/30 transition-all">
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-slate-400 mb-6 line-clamp-2">{item.description}</p>
                  <button className="text-orange-500 font-bold flex items-center hover:text-orange-400 transition-colors">
                    Learn More <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚩 Room Booking Section */}
      <section id="booking" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">Dharamshala Seva</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Request Room Booking</h3>
            <p className="text-slate-600 max-w-xl mx-auto">
              Sitaram Seva Sadan mein rukne ke liye apni details niche fill karein. Aapki request seedhe trust office bhej di jayegi.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl shadow-md">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Yatri ka Naam (Full Name)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter 10-digit number" 
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Room Type</label>
                  <select 
                    value={formData.room_type}
                    onChange={(e) => setFormData({...formData, room_type: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="Non-AC Room">Non-AC Room</option>
                    <option value="AC Room">AC Room</option>
                    <option value="Family Suite">Family Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Check-in Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Total Guests</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="20"
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-xl text-center text-sm font-medium ${submitStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center disabled:bg-orange-400"
              >
                {isSubmitting ? 'Sending Request...' : '🚩 Send Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Make a Difference?</h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                Whether through a monthly donation, volunteering your time, or spreading 
                our mission, every bit of help counts towards a better future.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl shadow-black/10">
                  Donate Today
                </button>
                <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-black/10">
                  Be a Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ NEW: Policies Section (Cashfree KYC ke liye zaroori hai) */}
      <section id="policies" className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Trust Policies</h3>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border">
              <h4 className="font-bold text-slate-900 mb-3 text-lg">📋 Privacy Policy</h4>
              <div className="text-slate-600 text-sm space-y-2">
                <p>Shri Sitaram Seva Trust ("we", "us") respects your privacy. This policy explains how we collect, use, and protect your personal information.</p>
                <p><strong>Information We Collect:</strong> Name, phone number, email address, and booking details when you make a reservation through our website.</p>
                <p><strong>How We Use It:</strong> To process your room booking, send confirmation messages, and contact you regarding your stay.</p>
                <p><strong>Data Protection:</strong> Your personal data is stored securely and is never shared with third parties without your consent.</p>
                <p><strong>Contact:</strong> For any privacy-related queries, contact Vijay Prakash Tiwari at 9918310009.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border">
              <h4 className="font-bold text-slate-900 mb-3 text-lg">📜 Terms & Conditions</h4>
              <div className="text-slate-600 text-sm space-y-2">
                <p><strong>Business Name:</strong> Shri Sitaram Seva Trust</p>
                <p><strong>Proprietor:</strong> Vijay Prakash Tiwari</p>
                <p><strong>Address:</strong> Luvkushnagar, Ramghat, Ayodhya Dhaam, Uttar Pradesh, India</p>
                <p><strong>Booking:</strong> All bookings are subject to room availability. A booking request does not guarantee confirmation until verified by our team.</p>
                <p><strong>Check-in/Check-out:</strong> Standard check-in time is 12:00 PM and check-out is 11:00 AM.</p>
                <p><strong>Conduct:</strong> Guests are expected to maintain decorum befitting a dharmik sthal.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border">
              <h4 className="font-bold text-slate-900 mb-3 text-lg">💰 Refund & Cancellation Policy</h4>
              <div className="text-slate-600 text-sm space-y-2">
                <p><strong>Cancellation:</strong> Free cancellation up to 24 hours before check-in date. Cancellations within 24 hours may attract a charge.</p>
                <p><strong>Refund:</strong> Refunds for eligible cancellations will be processed within 5-7 business days to the original payment method.</p>
                <p><strong>No-Show:</strong> In case of no-show without prior cancellation, the full booking amount may be forfeited.</p>
                <p><strong>Contact for Cancellation:</strong> Call 9918310009 or 8303333309.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - ✅ UPDATED: Legal name added */}
      <footer id="contact" className="bg-white pt-20 pb-10 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-slate-900">SITARAM TRUST</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed mb-4">
                Shri Sitaram Seva Trust, managed by <strong className="text-slate-700">Vijay Prakash Tiwari</strong>, is dedicated to empowering communities and providing divine stay for Ayodhya Dhaam yatris.
              </p>
              <div className="text-slate-500 text-sm space-y-1 mb-6">
                <p>📍 Luvkushnagar, Ramghat, Ayodhya Dhaam, UP</p>
                <p>📞 9918310009, 8303333309</p>
                <p>📞 Helpline: 05278-424511</p>
              </div>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-orange-600 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Explore</h5>
              <ul className="space-y-4">
                {['Our Story', 'Impact Reports', 'News & Updates', 'Our Team'].map((link) => (
                  <li key={link}><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6">Programs</h5>
              <ul className="space-y-4">
                {['Education', 'Healthcare', 'Sustainability', 'Social Equality'].map((link) => (
                  <li key={link}><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6">Get Involved</h5>
              <ul className="space-y-4">
                {['Volunteer', 'Donate', 'Partner with Us', 'Career'].map((link) => (
                  <li key={link}><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* ✅ UPDATED: Copyright with legal name */}
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <div>
              <p>© 2025 Shri Sitaram Seva Trust. All rights reserved.</p>
              <p className="text-xs mt-1">Proprietor: <strong>Vijay Prakash Tiwari</strong> | Luvkushnagar, Ramghat, Ayodhya Dhaam</p>
            </div>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#policies" className="hover:text-orange-600">Privacy Policy</a>
              <a href="#policies" className="hover:text-orange-600">Terms of Service</a>
              <a href="#policies" className="hover:text-orange-600">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
