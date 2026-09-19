import { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['hero', 'problem', 'principle', 'architecture', 'design', 'specifications', 'calibration', 'prototype'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Problem & Solution', href: '#problem', id: 'problem' },
    { label: 'Working Principle', href: '#principle', id: 'principle' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Technical Design', href: '#design', id: 'design' },
    { label: 'Specifications', href: '#specifications', id: 'specifications' },
    { label: 'Validation & Cal', href: '#calibration', id: 'calibration' },
    { label: 'Prototype & Team', href: '#prototype', id: 'prototype' },
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.12] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" id="nav-brand-logo" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-emerald-500/30 group-hover:border-emerald-400/60 p-1 flex items-center justify-center transition-all shadow-sm">
            <img src="/team-logo.svg" alt="Tinkerers Clan Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="mono text-[14px] font-bold text-white tracking-wider">Tinkerers Clan</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-semibold mono">SIH26144</span>
            </div>
            <div className="text-[12px] text-slate-300 font-medium hidden sm:block">Atmospheric Infrasound Microbarometer</div>
          </div>
        </a>

        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              id={`nav-link-${link.id}`}
              className={`text-[13px] font-medium transition-colors py-1 relative ${
                activeSection === link.id
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#specifications"
            id="nav-view-system-btn"
            className="btn-primary rounded-xl px-3.5 py-1.5 text-[12.5px] mono flex items-center gap-1.5 font-bold"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Target vs Actual</span>
          </a>
        </div>
      </div>
    </header>
  );
}
