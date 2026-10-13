import React from 'react';
import { Bell, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function Header({ onOpenCab, pendingCount }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-dark-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ping-500 to-sky-600 flex items-center justify-center shadow-lg shadow-ping-500/25 border border-ping-400/30 relative">
            <Bell className="w-5 h-5 text-white animate-bounce" />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-md">
                {pendingCount}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                Agent<span className="text-ping-400">Ping</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-ping-500/20 text-ping-300 border border-ping-500/30">
                HITL Approval Hub
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Unified Human-in-the-Loop Inbox & Telegram Bot Gateway
            </p>
          </div>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900 border border-ping-500/30 text-xs font-mono text-ping-300">
            <Send className="w-3.5 h-3.5 text-sky-400" />
            <span>Telegram Bot: @AgentPingBot Two-Way Sync Active</span>
          </div>

          <button
            onClick={onOpenCab}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-ping-600 via-sky-600 to-cyan-600 text-white shadow-md shadow-ping-500/25 hover:shadow-ping-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all border border-ping-400/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Join Founding CAB (70% Off)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
