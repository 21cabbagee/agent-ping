import React from 'react';
import { Bell, Activity, Send } from 'lucide-react';

export default function Footer({ onOpenCab }) {
  return (
    <footer className="mt-16 border-t border-white/10 bg-dark-950 py-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-ping-500 to-sky-600 flex items-center justify-center text-white">
                <Bell className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white">
                Agent<span className="text-ping-400">Ping</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Centralized command center and Telegram/PWA inbox where your autonomous agents request permission, report blockers, and receive human sign-offs instantly.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-ping-300 font-mono">
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Two-way webhook relay compatible with CrewAI • LangGraph • AutoGen • n8n</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Features</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#hitl-inbox" className="hover:text-ping-400 transition-colors">HITL Approval Queue</a></li>
              <li><a href="#webhook-dispatcher" className="hover:text-ping-400 transition-colors">POST /v1/ask-human Webhook</a></li>
              <li><a href="#telegram-sync" className="hover:text-ping-400 transition-colors">Telegram Bot Sync</a></li>
              <li><button onClick={onOpenCab} className="text-ping-300 hover:text-white font-semibold">Join CAB (70% Off)</button></li>
            </ul>
          </div>

          {/* Target SEO Index */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">SEO Index</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400 font-mono">
              <li>human in the loop agent approval inbox</li>
              <li>ai agent notification center</li>
              <li>hitl webhook approval dashboard</li>
              <li>telegram bot approval for ai agents</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 AgentPing Inc. All rights reserved. Zero Deadlock Human-in-the-Loop Infrastructure.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Security Protocol</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="text-ping-400">V1 Black Car Scope Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
