import { TEAM_MEMBERS_DATA } from '../data/reportData';
import { Users, Mail, Award, CheckCircle2 } from 'lucide-react';

export function TeamSection() {
  return (
    <section id="team" className="py-20 sm:py-28 border-t border-[var(--line)] bg-[#0A0E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] mb-2 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[var(--signal)]" />
              Smart India Hackathon Team · SIH26144
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight text-[var(--text)]">
              The engineering team
            </h2>
          </div>
          <p className="text-[14.5px] text-[var(--text-dim)] max-w-xl leading-relaxed">
            A multi-disciplinary collective across analog hardware, embedded firmware, acoustic fluid dynamics, digital signal processing, and systems integration.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS_DATA.map((member) => (
            <div
              key={member.name}
              className="team-card card p-6 rounded-sm flex flex-col justify-between group hover:border-[var(--signal-border)] transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="team-avatar w-13 h-13 rounded-sm flex items-center justify-center mono text-[16px] font-semibold text-[var(--text)] border border-[var(--line)] bg-[#151B27] group-hover:border-[var(--signal)] transition-colors">
                    {member.avatarInitials}
                  </div>
                  <span className="mono text-[10px] text-[var(--signal)] bg-[var(--signal-soft)] px-2 py-0.5 rounded-sm">
                    {member.subsystem}
                  </span>
                </div>

                <h3 className="text-[17px] font-semibold text-[var(--text)] group-hover:text-[var(--signal)] transition-colors">
                  {member.name}
                </h3>
                <div className="mono text-[11.5px] text-[var(--text-dim)] mt-0.5">
                  {member.role}
                </div>

                <p className="text-[13px] text-[var(--text-faint)] mt-3 leading-relaxed">
                  {member.focus}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11px] mono text-[var(--text-faint)]">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Subsystem Owner
                </span>
                <span>SIH 2024 / 2026</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
