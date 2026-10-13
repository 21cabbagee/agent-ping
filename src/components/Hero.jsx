import React from 'react';
import { Bell, Sparkles, ArrowRight, Send, ShieldCheck, Zap, Smartphone, CheckCircle2 } from 'lucide-react';

export default function Hero({ onJumpToInbox, onJumpToDispatcher }) {
  return (
    <section className="relative pt-12 pb-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ping-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-sky-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-ping-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Bell className="w-3.5 h-3.5 text-ping-400" />
          <span>Unified Human-in-the-Loop Agent Notification Hub</span>
        </div>

        {/* Target Exact SEO H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Agent Notification Hub: <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ping-400 via-sky-300 to-cyan-300">
            Unified Human-in-the-Loop Approvals For AI Agents
          </span>
        </h1>

        {/* Value Proposition Body */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Stop staring at CLI terminal logs or letting blocked agents fail silently. Whenever your autonomous agent reaches a high-risk fork—charging a credit card, running production SQL, or publishing content—it pings your Telegram and web inbox. Tap <strong className="text-white">Approve</strong> or <strong className="text-white">Reject</strong>, and your agent resumes execution immediately.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onJumpToInbox}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-ping-600 to-sky-600 hover:from-ping-500 hover:to-sky-500 text-white font-bold shadow-lg shadow-ping-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Bell className="w-4 h-4 animate-bounce" />
            <span>Open Live Approval Inbox</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onJumpToDispatcher}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-800/80 hover:bg-dark-750 text-slate-200 font-medium border border-white/10 hover:border-white/20 transition-all"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>Simulate Agent Webhook Dispatch</span>
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-ping-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Response Delay</span>
            </div>
            <div className="text-xl font-bold text-white">&lt;500ms Relay</div>
            <p className="text-[11px] text-slate-400">Instant bidirectional webhook</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-sky-400 mb-1">
              <Smartphone className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Channel</span>
            </div>
            <div className="text-xl font-bold text-sky-300">Telegram Bot</div>
            <p className="text-[11px] text-slate-400">1-tap inline mobile buttons</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Safety Guard</span>
            </div>
            <div className="text-xl font-bold text-white">Auto-Timeout</div>
            <p className="text-[11px] text-slate-400">Auto-aborts unapproved runs</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Market TAM</span>
            </div>
            <div className="text-xl font-bold text-white">$235M TAM</div>
            <p className="text-[11px] text-slate-400">400k AI automation builders</p>
          </div>
        </div>
      </div>
    </section>
  );
}
