import React, { useState } from 'react';
import { TrendingUp, Bell, Zap, DollarSign, Clock, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * OutcomeChart for AgentPing (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $12,500/mo human DevOps on-call rotations & terminal babysitting ($6 layer)
 * with Autonomous Push-to-Approve Telegram & Webhook HITL Notification Hub ($1 software layer).
 */
export default function OutcomeChart({
  serviceName = "Autonomous Agent HITL Approval & Telegram Notification Hub",
  defaultApprovals = 600,
  onCtaClick
}) {
  const [approvals, setApprovals] = useState(defaultApprovals);

  // Legacy human on-call/manual supervision: $18 per approval checkpoint in engineer context switching & delayed approvals
  const legacyServicesCost = approvals * 18;
  // AgentPing software fee: $29/mo flat + $0.15/approval
  const autoSoftwareCost = 29 + Math.round(approvals * 0.15);
  const netValueReclaimed = legacyServicesCost - autoSoftwareCost;
  const savingsPercent = Math.round(((legacyServicesCost - autoSoftwareCost) / legacyServicesCost) * 100);

  const maxCost = Math.max(legacyServicesCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((autoSoftwareCost / maxCost) * 100), 5);

  return (
    <div className="relative rounded-2xl border border-sky-500/30 bg-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-900 border-sky-500/40 text-sky-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs $12,500/mo Human SRE On-Call Rotations ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Human-in-the-Loop Economics: <span className="text-sky-400">{savingsPercent}% DevOps Overhead Cut</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Julien Bek Thesis: Displacing expensive manual CLI terminal babysitting and pager rotations with 1-tap mobile approval primitives.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-sky-500/30 rounded-xl p-3">
          <Smartphone className="w-5 h-5 text-sky-400" />
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Net Monthly Savings</div>
            <div className="text-lg font-black text-sky-400 font-mono">
              +${netValueReclaimed.toLocaleString()}/mo
            </div>
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="my-6 bg-slate-900/60 rounded-xl p-4 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-400" />
            <span>Monthly High-Stakes Agent Approvals (SQL, Wire Transfers, Cold Outreach):</span>
          </label>
          <span className="text-base font-bold text-sky-400 font-mono bg-sky-500/10 px-3 py-0.5 rounded-lg border border-sky-500/20">
            {approvals} Approvals/mo
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="2500"
          step="50"
          value={approvals}
          onChange={(e) => setApprovals(parseInt(e.target.value))}
          className="w-full accent-sky-400 bg-slate-800 rounded-lg cursor-pointer h-2"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>50 Seed Forks</span>
          <span>1,000 Production Operations</span>
          <span>2,500+ High-Frequency Fleet</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Legacy Manual Services ($6) */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                <Clock className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Legacy Human SRE On-Call</h4>
                <p className="text-xs text-rose-300/70">CLI Log Watchers & PagerDuty Fatigue</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">
              The $6 Service Layer
            </span>
          </div>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">• Engineer Attention Cost ($18/alert):</span>
              <span className="font-mono text-rose-400 font-bold">${legacyServicesCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Mean Time To Resume (MTTR):</span>
              <span className="font-mono text-rose-400 font-bold">28 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Silent Timeout Workflow Failures:</span>
              <span className="font-mono text-rose-400 font-bold">14% failure rate</span>
            </div>
            <div className="border-t border-rose-500/20 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Total Human Cost:</span>
              <span className="font-mono text-rose-400">${legacyServicesCost.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Bar visualization */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-rose-500/30">
            <div
              className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${legacyBarHeight}%` }}
            />
          </div>
        </div>

        {/* AgentPing Software Layer ($1) */}
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/15 p-5 relative overflow-hidden shadow-lg shadow-sky-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">AgentPing HITL Dispatcher</h4>
                <p className="text-xs text-sky-300/80">1-Tap Telegram & Webhook Resume</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-sky-400 bg-sky-500/10 px-2 py-1 rounded">
              The $1 Software Layer
            </span>
          </div>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">• Telegram Push Latency:</span>
              <span className="font-mono text-sky-400 font-bold">&lt; 450 ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Mean Time To Resume:</span>
              <span className="font-mono text-sky-400 font-bold">&lt; 12 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Base Platform + HITL Quota:</span>
              <span className="font-mono text-sky-400 font-bold">${autoSoftwareCost.toLocaleString()}/mo</span>
            </div>
            <div className="border-t border-sky-500/20 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Software Price:</span>
              <span className="font-mono text-sky-400">${autoSoftwareCost.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Bar visualization */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-sky-500/30">
            <div
              className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${autoBarHeight}%` }}
            />
          </div>
        </div>
      </div>

      {/* Larry Ellison Economic Guarantee Box */}
      <div className="rounded-xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-cyan-950/40 border border-sky-500/30 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>The Ellison SLA: Sub-Second Telegram Delivery Guarantee</span>
              <span className="text-xs bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-mono">&lt;1000ms Delivery</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              If an approval ping is delayed beyond 1 second to your Telegram bot or web dashboard, your next 10,000 approval calls are completely free.
            </p>
          </div>
        </div>

        <button
          onClick={onCtaClick}
          className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
        >
          Connect Telegram Bot
        </button>
      </div>
    </div>
  );
}
