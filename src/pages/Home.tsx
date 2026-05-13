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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              {['Home', 'About', 'Initiatives', 'Impact', 'Events', 'Contact'].map((item) => (
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
              {['Home', 'About', 'Initiatives', 'Impact', 'Events', 'Contact'].map((item) => (
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
              <button className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center hover:bg-orange-700 transition-all group">
                Support Our Mission
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
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
              We believe that every person deserves the opportunity to thrive. Our approach 
              focuses on providing the tools and resources necessary for self-sufficiency, 
              starting with foundational needs like education and health.
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

      {/* CTA Section */}
      <section className="py-24">
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

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-slate-900">SITARAM TRUST</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed mb-8">
                Empowering communities and building bridges to a brighter, more sustainable future for all.
              </p>
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
          
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>© 2024 Sitaram Trust. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-orange-600">Privacy Policy</a>
              <a href="#" className="hover:text-orange-600">Terms of Service</a>
              <a href="#" className="hover:text-orange-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
