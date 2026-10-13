import React from 'react';
import { Send, CheckCircle2, XCircle, Smartphone, Bot, Sparkles, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TelegramSyncPreview({ pendingRequest, onResolveRequest }) {
  const handleTelegramAction = (decision) => {
    if (!pendingRequest) return;
    if (decision === 'APPROVED') {
      try {
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
    onResolveRequest(pendingRequest.id, decision);
  };

  return (
    <section id="telegram-sync" className="py-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-500/30">
                <Send className="w-3.5 h-3.5" />
                <span>Instant Mobile Approval Rails</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Telegram Bot Two-Way Interactive Sync
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect your Telegram handle in 10 seconds. Whenever an agent pauses on a prompt or requires billing authorization, you get a native push message with inline action buttons. Tap <strong className="text-emerald-400">Approve</strong> on your phone lock screen, and the waiting agent resumes in &lt;500ms.
              </p>

              <div className="space-y-2 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>@AgentPingBot webhook relay active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>Zero mobile app install required (works via Telegram & PWA)</span>
                </div>
              </div>
            </div>

            {/* Right: Smartphone Telegram Mockup (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-72 rounded-[2.5rem] bg-dark-950 border-4 border-slate-800 p-4 shadow-2xl shadow-sky-500/10">
                {/* Phone Speaker Notch */}
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

                {/* Telegram Chat Header */}
                <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-sky-500/30 flex items-center justify-center text-sky-300">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">AgentPing Bot</div>
                    <div className="text-[10px] text-sky-400 font-mono">bot • active</div>
                  </div>
                </div>

                {/* Chat Bubble Message */}
                {pendingRequest ? (
                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-dark-900 border border-white/10 text-xs space-y-2 text-left">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="text-ping-400 font-bold">🤖 {pendingRequest.agentName}</span>
                        <span>Now</span>
                      </div>

                      <p className="text-white font-semibold text-xs leading-snug">
                        {pendingRequest.question}
                      </p>

                      <div className="p-2 rounded bg-dark-950 font-mono text-[10px] text-slate-400">
                        Priority: {pendingRequest.priority} • Cluster: prod
                      </div>
                    </div>

                    {/* Inline Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleTelegramAction('REJECTED')}
                        className="py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-rose-200 text-xs font-bold border border-rose-500/40 transition-all flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => handleTelegramAction('APPROVED')}
                        className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/30 transition-all flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500 text-xs">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <span>No pending approval requests in Telegram queue.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
