import { useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ImplementationDetails } from './components/ImplementationDetails';
import { CalibrationSection } from './components/CalibrationSection';
import { VerificationStatus } from './components/VerificationStatus';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { ReportModal } from './components/ReportModal';

export default function App() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0E16] text-[#E7ECF3] selection:bg-[#F0A868]/20 selection:text-[#F0A868]">
      <Nav onOpenReportModal={() => setIsReportModalOpen(true)} />
      
      <main id="main-content">
        <Hero />
        <ProblemSection />
        <ArchitectureSection />
        <ImplementationDetails />
        <CalibrationSection />
        <VerificationStatus />
        <TeamSection />
      </main>

      <Footer />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
