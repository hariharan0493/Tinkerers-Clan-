import { useState, useEffect } from 'react';
import { Activity, Cpu, Layers, BarChart3, Users, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

interface NavProps {
  onOpenReportModal: () => void;
}

export function Nav({ onOpenReportModal }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['hero', 'problem', 'architecture', 'implementation', 'calibration', 'verification', 'team'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
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
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'Challenge', href: '#problem', id: 'problem' },
    { label: 'Signal Chain', href: '#architecture', id: 'architecture' },
    { label: 'Hardware Blocks', href: '#implementation', id: 'implementation' },
    { label: 'Calibration & Noise', href: '#calibration', id: 'calibration' },
    { label: 'Verification', href: '#verification', id: 'verification' },
    { label: 'Team', href: '#team', id: 'team' },
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0A0E16]/95 backdrop-blur-md border-b border-[var(--line)] shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" id="nav-brand-logo" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-[#151B27] border border-[var(--line)] group-hover:border-[var(--signal)] flex items-center justify-center transition-colors">
            <Activity className="w-4 h-4 text-[var(--signal)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="mono text-[13px] font-semibold text-[var(--text)] tracking-wider">SIH26144</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="System Design Verified"></span>
            </div>
            <div className="text-[10px] mono text-[var(--text-faint)] hidden sm:block">Atmospheric Microbarometer</div>
          </div>
        </a>

        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              id={`nav-link-${link.id}`}
              className={`text-[12.5px] mono transition-colors py-1 relative ${
                activeSection === link.id
                  ? 'text-[var(--signal)] font-medium'
                  : 'text-[var(--text-dim)] hover:text-[var(--text)]'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--signal)]"></span>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReportModal}
            id="nav-view-report-btn"
            className="btn-secondary rounded-sm px-3.5 py-1.5 text-[12px] mono flex items-center gap-1.5"
            title="Read Complete Technical Report"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--signal)]" />
            <span className="hidden sm:inline">Executive</span> Report
          </button>

          <a
            href="#architecture"
            id="nav-view-system-btn"
            className="btn-primary rounded-sm px-3.5 py-1.5 text-[12px] mono flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5" />
            System Specs
          </a>
        </div>
      </div>
    </header>
  );
}
