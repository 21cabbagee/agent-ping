import React, { useState, useEffect } from 'react';
import { Inbox, CheckCircle2, XCircle, Clock, Bot, AlertTriangle, ShieldAlert, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HitlInbox({ requests, onResolveRequest }) {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'resolved'
  const [countdownTimers, setCountdownTimers] = useState({});
  const [expandedId, setExpandedId] = useState(requests.find(r => r.status === 'PENDING')?.id);

  // Live timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTimers((prev) => {
        const next = { ...prev };
        requests.forEach((r) => {
          if (r.status === 'PENDING') {
            const current = next[r.id] !== undefined ? next[r.id] : r.remainingSec;
            next[r.id] = Math.max(0, current - 1);
          }
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [requests]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60).toString().padStart(2, '0');
    const secs = (sec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleAction = (id, decision) => {
    if (decision === 'APPROVED') {
      try {
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
    onResolveRequest(id, decision);
  };

  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const resolvedRequests = requests.filter(r => r.status !== 'PENDING');

  return (
    <section id="hitl-inbox" className="py-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 text-left">
          {/* Header & Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Inbox className="w-5 h-5 text-ping-400" />
                <span>Human-in-the-Loop Approval Queue</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time notification stream holding autonomous agents until human confirmation is signed
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-white/5 text-xs">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'pending'
                    ? 'bg-ping-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Pending Approvals</span>
                <span className="w-5 h-5 rounded-full bg-dark-950 text-ping-300 text-[10px] flex items-center justify-center font-bold">
                  {pendingRequests.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('resolved')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'resolved'
                    ? 'bg-ping-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Resolved Audit</span>
                <span className="w-5 h-5 rounded-full bg-dark-950 text-slate-400 text-[10px] flex items-center justify-center font-bold">
                  {resolvedRequests.length}
                </span>
              </button>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {activeTab === 'pending' ? (
              pendingRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">Inbox Zero Achieved</p>
                  <p className="text-xs text-slate-500 mt-1">No agents currently blocked waiting for approval.</p>
                </div>
              ) : (
                pendingRequests.map((req) => {
                  const timeLeft = countdownTimers[req.id] !== undefined ? countdownTimers[req.id] : req.remainingSec;
                  const percentLeft = Math.round((timeLeft / req.timeoutTotalSec) * 100);
                  const isExpanded = expandedId === req.id;

                  return (
                    <div
                      key={req.id}
                      className="rounded-2xl bg-dark-900/90 border border-ping-500/30 overflow-hidden shadow-lg transition-all"
                    >
                      <div className="p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-ping-500/20 border border-ping-500/30 flex items-center justify-center text-ping-400">
                              <Bot className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm">{req.agentName}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-800 text-slate-400 border border-white/5">
                                  {req.framework}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                  {req.priority}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Countdown Timer Pill */}
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-500/30">
                              <Clock className="w-3.5 h-3.5 animate-spin" />
                              <span>Timeout in {formatTimer(timeLeft)}</span>
                            </span>
                          </div>
                        </div>

                        {/* Question */}
                        <h3 className="text-sm sm:text-base font-bold text-white mb-3">
                          "{req.question}"
                        </h3>

                        {/* Context Accordion */}
                        <div className="mb-4">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : req.id)}
                            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                          >
                            <span>Inspect Context Parameters</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-2 p-3 rounded-xl bg-dark-950 font-mono text-[11px] text-slate-300 border border-white/5">
                              <pre className="whitespace-pre-wrap">{JSON.stringify(req.contextData, null, 2)}</pre>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-white/5">
                          <button
                            onClick={() => handleAction(req.id, 'REJECTED')}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all hover:scale-105"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>{req.options[1] || 'Reject'}</span>
                          </button>

                          <button
                            onClick={() => handleAction(req.id, 'APPROVED')}
                            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/25 transition-all hover:scale-105"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{req.options[0] || 'Approve'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              resolvedRequests.map((req) => (
                <div
                  key={req.id}
                  className="rounded-2xl bg-dark-900/60 border border-white/5 p-4 flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      req.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {req.status === 'APPROVED' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-white text-xs">{req.agentName}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{req.question}</p>
                    </div>
                  </div>

                  <div className="text-right text-[11px] font-mono text-slate-400">
                    <div>{req.resolvedAt}</div>
                    <div className="text-slate-500">{req.resolvedBy}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
