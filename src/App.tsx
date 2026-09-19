import { useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { WorkingPrincipleSection } from './components/WorkingPrincipleSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { TechnicalDesignSection } from './components/TechnicalDesignSection';
import { SpecificationsSection } from './components/SpecificationsSection';
import { CalibrationSection } from './components/CalibrationSection';
import { PrototypeSection } from './components/PrototypeSection';
import { Footer } from './components/Footer';
import { StartupLogoReveal } from './components/StartupLogoReveal';

export default function App() {
  const [logoRevealFinished, setLogoRevealFinished] = useState(false);

  return (
    <div className="relative min-h-screen text-[#F1F5F9] selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Startup Clean Logo Reveal */}
      {!logoRevealFinished && (
        <StartupLogoReveal onComplete={() => setLogoRevealFinished(true)} />
      )}
      {/* Dynamic Multi-Color Background: Deep Blue, Indigo, Cyan, and Violet Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Continuous multi-stage vertical gradient base */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#070D26_0%,#0A1438_12%,#0B1B3D_25%,#08172F_40%,#0E1442_55%,#091A32_70%,#110E34_85%,#050816_100%)]" />

        {/* Multi-layered radial gradients for rich atmospheric depth */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle 900px at 15% 4%, rgba(37, 99, 235, 0.32), transparent 70%),
              radial-gradient(circle 850px at 85% 12%, rgba(99, 102, 241, 0.28), transparent 65%),
              radial-gradient(circle 900px at 10% 28%, rgba(6, 182, 212, 0.25), transparent 65%),
              radial-gradient(circle 950px at 90% 42%, rgba(139, 92, 246, 0.28), transparent 65%),
              radial-gradient(circle 900px at 15% 58%, rgba(37, 99, 235, 0.30), transparent 70%),
              radial-gradient(circle 950px at 85% 72%, rgba(99, 102, 241, 0.28), transparent 65%),
              radial-gradient(circle 900px at 20% 88%, rgba(6, 182, 212, 0.24), transparent 65%),
              radial-gradient(circle 850px at 80% 96%, rgba(124, 58, 237, 0.26), transparent 70%)
            `
          }}
        />

        {/* Distributed Large Soft Blurred Gradient Blobs across page sections */}
        {/* Section 1: Hero Glows */}
        <div className="absolute -top-24 -left-20 w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] rounded-full bg-gradient-to-br from-blue-600/40 via-indigo-600/35 to-cyan-500/25 blur-[110px] sm:blur-[150px]" />
        <div className="absolute top-[300px] -right-24 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-bl from-indigo-500/35 via-violet-600/30 to-blue-600/25 blur-[110px] sm:blur-[150px]" />

        {/* Section 2: Problem & Solution Glow */}
        <div className="absolute top-[1250px] -left-28 w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] rounded-full bg-gradient-to-tr from-cyan-600/32 via-blue-600/35 to-indigo-700/30 blur-[120px] sm:blur-[160px]" />

        {/* Section 3: Working Principle Glow */}
        <div className="absolute top-[2100px] -right-28 w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] rounded-full bg-gradient-to-tl from-violet-600/35 via-indigo-600/35 to-blue-500/25 blur-[120px] sm:blur-[160px]" />

        {/* Section 4: System Architecture Glow */}
        <div className="absolute top-[2950px] -left-24 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-gradient-to-br from-blue-600/38 via-cyan-600/28 to-indigo-600/32 blur-[130px] sm:blur-[160px]" />

        {/* Section 5: Technical Design Decisions Glow */}
        <div className="absolute top-[3850px] -right-24 w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] rounded-full bg-gradient-to-bl from-indigo-600/35 via-purple-600/30 to-blue-700/28 blur-[120px] sm:blur-[150px]" />

        {/* Section 6: Specifications & Compliance Glow */}
        <div className="absolute top-[4700px] -left-20 w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] rounded-full bg-gradient-to-tr from-cyan-600/30 via-blue-600/35 to-indigo-600/30 blur-[120px] sm:blur-[150px]" />

        {/* Section 7: Calibration & Verification Glow */}
        <div className="absolute top-[5550px] -right-28 w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] rounded-full bg-gradient-to-tl from-violet-600/32 via-indigo-600/35 to-blue-600/28 blur-[120px] sm:blur-[160px]" />

        {/* Section 8: Prototype & Footer Glow */}
        <div className="absolute top-[6450px] left-1/4 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/35 via-indigo-600/35 to-cyan-600/30 blur-[130px] sm:blur-[160px]" />

        {/* Fine engineering coordinate grid overlay with soft radial fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_25%,black_45%,transparent_95%)]" />
      </div>

      {/* Main interactive content above background */}
      <div className="relative z-10">
        <Nav />
        
        <main id="main-content">
          {/* Hero: Overview, Live Oscilloscope, Headline specs */}
          <Hero />

          {/* 1. Problem & Proposed Solution */}
          <ProblemSection />

          {/* 2. Working Principle */}
          <WorkingPrincipleSection />

          {/* 3. System Architecture */}
          <ArchitectureSection />

          {/* 4. Key Technical Design */}
          <TechnicalDesignSection />

          {/* 5. Specifications */}
          <SpecificationsSection />

          {/* 6. Validation / Simulation & Calibration */}
          <CalibrationSection />

          {/* 7. Final Prototype */}
          <PrototypeSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
