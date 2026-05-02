import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Map as MapIcon, 
  ShieldAlert, 
  MessageSquare, 
  Crown, 
  User as UserIcon, 
  ArrowRight,
  Globe,
  Star,
  MapPin,
  Calendar,
  Phone,
  LayoutDashboard,
  Search,
  Zap,
} from 'lucide-react';
import { chatWithAether } from './services/geminiService';

// --- Types ---
type Section = 'hero' | 'agent' | 'secrets' | 'planner' | 'emergency';

// --- Components ---

const Sidebar = ({ activeSection, onSectionChange }: { activeSection: Section, onSectionChange: (s: Section) => void }) => {
  const navItems = [
    { id: 'hero', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'agent', label: 'Concierge AI', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'secrets', label: 'Local Secrets', icon: <Search className="w-4 h-4" /> },
    { id: 'planner', label: 'Journey Planner', icon: <Calendar className="w-4 h-4" /> },
    { id: 'emergency', label: 'Tactical Support', icon: <ShieldAlert className="w-4 h-4" /> },
  ] as const;

  return (
    <aside className="w-72 glass flex flex-col p-8 fixed left-6 top-6 bottom-6 z-50">
      <div className="mb-12 flex items-center gap-2 cursor-pointer" onClick={() => onSectionChange('hero')}>
        <h1 className="text-2xl font-bold tracking-tighter text-white uppercase">
          Aether<span className="text-gold">.</span>
        </h1>
      </div>
      
      <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mb-6 font-bold">Elite Concierge</p>
      
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
              activeSection === item.id 
                ? 'bg-white/10 text-gold border-l-2 border-gold font-medium' 
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-sm tracking-wide">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-amber-200 flex items-center justify-center text-black font-bold">
            KD
          </div>
          <div>
            <p className="text-sm font-semibold group-hover:text-gold transition-colors">Karl M.</p>
            <p className="text-[10px] text-gold font-bold uppercase tracking-wider">Elite Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (s: Section) => void }) => {
  return (
    <div className="flex flex-col gap-6">
      <section className="h-[400px] glass elite-border p-10 relative overflow-hidden flex flex-col justify-center">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-16">
            <div className="bg-gold/10 text-gold px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gold/20 flex items-center gap-2">
              <Zap className="w-3 h-3 fill-current" /> Active Itinerary
            </div>
            <div className="text-right">
              <p className="text-4xl font-serif leading-none tracking-tight">Kyoto, Japan</p>
              <p className="text-sm text-white/40 mt-2 font-light">Oct 14 — Oct 21, 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-12 max-w-4xl">
            <div className="border-l border-white/10 pl-6 group cursor-pointer hover:border-gold transition-colors">
              <p className="text-[10px] text-white/40 uppercase mb-2 tracking-widest font-bold">Next Event</p>
              <p className="text-xl font-medium mb-1">Private Tea Ceremony</p>
              <p className="text-xs text-gold flex items-center gap-1 font-medium">Gion District <span className="text-white/20">•</span> 14:00</p>
            </div>
            <div className="border-l border-white/10 pl-6 group cursor-pointer hover:border-gold transition-colors">
              <p className="text-[10px] text-white/40 uppercase mb-2 tracking-widest font-bold">Transport</p>
              <p className="text-xl font-medium mb-1">Private Shinkansen</p>
              <p className="text-xs text-white/50">Car 1, Seat 4A <span className="text-white/20">•</span> Reserved</p>
            </div>
            <div className="border-l border-white/10 pl-6 group cursor-pointer hover:border-gold transition-colors">
              <p className="text-[10px] text-white/40 uppercase mb-2 tracking-widest font-bold">Elite Perk</p>
              <p className="text-xl font-medium mb-1">Katsura Imperial Villa</p>
              <p className="text-xs text-gold italic font-medium flex items-center gap-1">
                <Crown className="w-3 h-3" /> Backstage Access Unlocked
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-20">
          <h1 className="text-[340px] font-bold leading-none select-none tracking-tighter">KYT</h1>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-6 h-[280px]">
        <section className="glass p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">The Oracle • Audio Intel</h2>
            <div className="flex gap-1 items-end h-5">
              {[0.4, 0.8, 0.5, 0.9, 0.6, 0.7].map((h, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-gold rounded-full"
                />
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex-1 flex items-center">
            <p className="text-sm italic leading-relaxed text-white/70 italic font-light">
              "To your left, notice the dragon carvings on the Sanmon gate. These were sculpted in 1628 and are said to wake at night to drink from the sacred pond..."
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-onyx shadow-lg shadow-gold/20 hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </button>
            <div className="flex-1 mx-6 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
            </div>
            <span className="text-[10px] text-white/30 font-mono tracking-tighter">04:22 / 12:45</span>
          </div>
        </section>

        <section className="glass p-8 flex flex-col justify-between">
           <div className="flex items-center justify-between mb-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Upcoming Secrets</h2>
            <button onClick={() => onNavigate('secrets')} className="text-[10px] text-gold uppercase tracking-widest font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
             <div className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">The Gilded Vault</p>
                  <p className="text-[10px] text-white/40">London • Tonight 21:00</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors" />
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Midnight Temple</p>
                  <p className="text-[10px] text-white/40">Kyoto • Sat 00:30</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors" />
            </div>
          </div>
          <button 
            onClick={() => onNavigate('agent')}
            className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
          >
            Inquire with Aether
          </button>
        </section>
      </div>
    </div>
  );
};

const AgentChat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "Welcome back, Karl. I've prepared your dossiers for the upcoming Kyoto summit. How may I refine your arrangements today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithAether(userMsg, messages);
      setMessages(prev => [...prev, { role: 'model', content: response || "Response unavailable." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: "Synchronization failure. Checking local cache..." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass elite-border flex flex-col h-[700px] overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
          <h3 className="text-sm font-bold uppercase tracking-widest">Aether Concierge</h3>
        </div>
        <div className="text-[10px] text-white/30 tracking-widest">ENCRYPTED LIAISON</div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${m.role === 'user' ? 'bg-gold text-onyx font-medium' : 'bg-white/5 border border-white/10 text-white/80'} p-5 rounded-2xl text-sm leading-relaxed`}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex gap-2">
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/10 bg-white/5">
        <div className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your instruction..."
            className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-4 pr-16 focus:outline-none focus:border-gold/50 transition-all text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-onyx hover:scale-105 transition-transform disabled:opacity-50"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const LocalSecrets = () => {
  const secrets = [
    { title: "The Gilded Vault", location: "London", description: "A private dining room beneath a converted medieval bank.", icon: <Crown /> },
    { title: "Midnight Temple Session", location: "Kyoto", description: "Zazen meditation in a 400-year-old temple after public hours.", icon: <Globe /> },
    { title: "The Canvas Penthouse", location: "Paris", description: "An artist's studio overlooking the Seine, strictly lunar cycle access.", icon: <MapPin /> },
    { title: "Subterranean Cinema", location: "New York", description: "Hidden screening room behind a boutique in SoHo.", icon: <Star /> }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="glass p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-4xl font-serif mb-4">Curated Secrets</h2>
          <p className="text-white/40 leading-relaxed font-light italic">
            "Discovery consists not in seeking new landscapes, but in having new eyes."
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-widest hover:bg-white/10">Near Me</button>
          <button className="px-6 py-2 bg-gold/10 border border-gold/20 text-gold rounded-full text-xs uppercase tracking-widest hover:bg-gold/20">Elite Only</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {secrets.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 group hover:elite-border transition-all cursor-pointer flex flex-col"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
            <h3 className="text-xl font-serif mb-2">{s.title}</h3>
            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin className="w-3 h-3 text-gold" /> {s.location}
            </div>
            <p className="text-sm text-white/50 font-light leading-relaxed mb-8 flex-1">
              {s.description}
            </p>
            <button className="flex items-center gap-2 text-[10px] uppercase font-bold text-gold tracking-widest hover:gap-4 transition-all">
              Request Access <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const EmergencyHub = () => {
  const protocols = [
    { title: "Consular Assistance", status: "READY", color: "bg-green-500", active: true },
    { title: "Medical Response: Global", status: "STANDBY", color: "bg-white/20", active: false },
    { title: "Flight Recovery System", status: "READY", color: "bg-green-500", active: true },
    { title: "Diplomatic Liaison", status: "EN ROUTE", color: "bg-gold animate-pulse", active: true }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
      <section className="lg:col-span-2 glass p-10 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-8">
            <ShieldAlert className="w-3 h-3" /> Tactical Protocols Active
          </div>
          <h2 className="text-5xl font-serif mb-6 tracking-tighter">Global Resolution</h2>
          <p className="text-white/40 max-w-xl text-lg font-light leading-relaxed">
            In the event of a variance from the primary itinerary, Aether deploys pre-cleared assets to ensure your safe extraction or relocation.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-12">
           <div className="glass bg-white/5 p-8 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center group cursor-pointer hover:border-gold transition-colors">
            <Phone className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-semibold uppercase tracking-widest">Summon Crisis Team</p>
            <p className="text-[10px] text-white/30 mt-2">Guaranteed 30-sec response</p>
          </div>
           <div className="glass bg-white/5 p-8 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center group cursor-pointer hover:border-gold transition-colors">
            <Globe className="w-8 h-8 text-white/30 mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-semibold uppercase tracking-widest">Find Safest Ascent</p>
            <p className="text-[10px] text-white/30 mt-2">Real-time threat monitoring</p>
          </div>
        </div>
      </section>

      <section className="glass p-8 flex flex-col">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-8">Active Sub-Systems</h3>
        <div className="space-y-4 flex-1">
          {protocols.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${p.color}`} />
                <p className="text-sm font-medium">{p.title}</p>
              </div>
              {p.active ? (
                <button className="text-[10px] font-bold bg-white text-onyx px-3 py-1 rounded-sm uppercase tracking-widest group-hover:bg-gold transition-colors">Deploy</button>
              ) : (
                <ArrowRight className="w-4 h-4 text-white/10" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 glass bg-gold/10 border border-gold/20 flex items-center justify-between group cursor-pointer hover:bg-gold/20 transition-all">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gold">Elite Hub Liaison</span>
          <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-2 transition-transform" />
        </div>
      </section>
    </div>
  );
};

const Planner = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass p-10 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-serif">Journey Planner</h2>
          <p className="text-white/40 text-sm font-light mt-2">Designing seamless transitions across global locales.</p>
        </div>
        <button className="px-8 py-3 bg-gold text-onyx rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-2">
          Architect New Route <Calendar className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[550px]">
        <div className="lg:col-span-2 glass overflow-hidden relative group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <h3 className="text-6xl font-serif tracking-tighter mb-4">Tokyo Interlude</h3>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest mb-1">Duration</span>
                <span className="text-lg">7 Cycles</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest mb-1">Status</span>
                <span className="text-lg">Clearance Level 9</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 flex flex-col">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-8">Pending Itineraries</h4>
          <div className="space-y-4">
            {[
              { name: "Amalfi Coast", date: "June 2026", access: "High" },
              { name: "Norway Fiords", date: "Sept 2026", access: "Elite" },
              { name: "Sahara Private", date: "Oct 2026", access: "Full" }
            ].map((trip, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="text-lg font-serif">{trip.name}</h5>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors" />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest">
                  <span>{trip.date}</span>
                  <span className="text-gold font-bold">{trip.access} Access</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [section, setSection] = useState<Section>('hero');
  const [showEliteModal, setShowEliteModal] = useState(false);

  const renderSection = () => {
    switch (section) {
      case 'hero': return <Hero onNavigate={setSection} />;
      case 'agent': return <AgentChat />;
      case 'secrets': return <LocalSecrets />;
      case 'planner': return <Planner />;
      case 'emergency': return <EmergencyHub />;
      default: return <Hero onNavigate={setSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-blue text-white selection:bg-gold/30 selection:text-gold font-sans">
      <div className="mesh-bg" />
      
      <div className="flex h-screen p-6 gap-6 relative z-10">
        <Sidebar activeSection={section} onSectionChange={setSection} />

        <main className="flex-1 ml-72 flex flex-col gap-6 overflow-y-auto pr-6 custom-scrollbar">
          {/* Header Bar */}
          <header className="flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">System v4.2.0-Elite</span>
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setShowEliteModal(true)} className="text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors cursor-pointer border-b border-gold/20 pb-0.5">Priority Signal On</button>
              <div className="text-[10px] font-mono text-white/30 uppercase">LAT: 35.6821 N • LON: 139.7527 E</div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>

          <footer className="py-6 border-t border-white/5 flex justify-between items-center mt-auto">
            <p className="text-white/10 text-[9px] uppercase tracking-[0.5em]">Aether Travel Architecture — Reserved for Discerning Travelers</p>
            <div className="flex gap-4 items-center">
               <div className="w-12 h-[1px] bg-white/10" />
               <span className="text-[9px] font-mono text-white/20">EST. 2026</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Elite Modal */}
      <AnimatePresence>
        {showEliteModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setShowEliteModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass p-12 max-w-lg w-full text-center relative border-gold/30 elite-border"
              onClick={e => e.stopPropagation()}
            >
              <Crown className="w-16 h-16 text-gold mx-auto mb-8" />
              <h3 className="text-4xl font-serif mb-6 italic tracking-tight">Elite Resolution</h3>
              <p className="text-white/60 mb-10 leading-relaxed font-light text-sm">
                As an Elite member, you gain access to our "Ghost Concierges" who handle on-the-ground logistics in 140 countries. This includes private airfield clearance, diplomatic immunity liaison, and immediate tactical rerouting.
              </p>
              <div className="space-y-3 mb-10">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gold/60 border-b border-white/5 pb-3">
                  <span>Landmark Access</span>
                  <span className="text-gold">Unlocked (Level 9)</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gold/60 border-b border-white/5 pb-3">
                  <span>Local Secrets</span>
                  <span className="text-gold">Curated / Global</span>
                </div>
              </div>
              <button 
                onClick={() => setShowEliteModal(false)}
                className="w-full py-4 bg-gold text-onyx rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-gold/20"
              >
                Return to Aether
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
