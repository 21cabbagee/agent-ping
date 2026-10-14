import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HitlInbox from './components/HitlInbox';
import WebhookDispatcherConsole from './components/WebhookDispatcherConsole';
import TelegramSyncPreview from './components/TelegramSyncPreview';
import TimeoutSettingsCard from './components/TimeoutSettingsCard';
import OutcomeChart from './components/OutcomeChart';
import CabModal from './components/CabModal';
import Footer from './components/Footer';
import { INITIAL_REQUESTS, INITIAL_TIMEOUT_CONFIG } from './data/mockPingData';

export default function App() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [timeoutConfig, setTimeoutConfig] = useState(INITIAL_TIMEOUT_CONFIG);
  const [isCabOpen, setIsCabOpen] = useState(false);

  const handleResolveRequest = (id, decision) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status: decision,
            resolvedAt: "Just now",
            resolvedBy: "Human Reviewer (Signed via Web/Telegram)"
          };
        }
        return r;
      })
    );
  };

  const handleDispatchNewRequest = (newRequest) => {
    setRequests(prev => [newRequest, ...prev]);
    document.getElementById('hitl-inbox')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInbox = () => {
    document.getElementById('hitl-inbox')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDispatcher = () => {
    document.getElementById('webhook-dispatcher')?.scrollIntoView({ behavior: 'smooth' });
  };

  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const firstPending = pendingRequests[0] || null;

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-ping-500/30 selection:text-white">
      {/* Navigation Header */}
      <Header
        onOpenCab={() => setIsCabOpen(true)}
        pendingCount={pendingRequests.length}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onJumpToInbox={scrollToInbox}
          onJumpToDispatcher={scrollToDispatcher}
        />

        {/* Julien Bek $1:$6 Economic Engine / Larry Ellison SLA Proof */}
        <OutcomeChart onCtaClick={() => setIsCabOpen(true)} />

        {/* Live HITL Approval Queue */}
        <HitlInbox
          requests={requests}
          onResolveRequest={handleResolveRequest}
        />

        {/* REST Webhook Dispatcher Simulator */}
        <WebhookDispatcherConsole
          onDispatchNewRequest={handleDispatchNewRequest}
        />

        {/* Telegram 2-Way Mobile Sync Live Preview */}
        <TelegramSyncPreview
          pendingRequest={firstPending}
          onResolveRequest={handleResolveRequest}
        />

        {/* Timeout Fallback Policies */}
        <TimeoutSettingsCard
          config={timeoutConfig}
          onUpdateConfig={setTimeoutConfig}
        />
      </main>

      {/* Footer */}
      <Footer onOpenCab={() => setIsCabOpen(true)} />

      {/* Founding CAB Modal */}
      <CabModal
        isOpen={isCabOpen}
        onClose={() => setIsCabOpen(false)}
      />
    </div>
  );
}
