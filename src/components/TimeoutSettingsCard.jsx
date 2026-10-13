import React, { useState } from 'react';
import { Clock, ShieldAlert, Check, Settings, BellRing } from 'lucide-react';

export default function TimeoutSettingsCard({ config, onUpdateConfig }) {
  const [currentConfig, setCurrentConfig] = useState(config);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateConfig(currentConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section id="timeout-settings" className="py-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 text-left">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-ping-400" />
                <span>Timeout Policies & Deadlock Fallback Guardrails</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ensure waiting agents never deadlock forever if a human reviewer is away or asleep
              </p>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ping-600 hover:bg-ping-500 text-white font-bold text-xs shadow-md shadow-ping-500/25 transition-all"
            >
              {saved ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Settings className="w-3.5 h-3.5" />}
              <span>{saved ? 'Settings Saved' : 'Save Fallback Rules'}</span>
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Default Human Sign-Off Timeout Window</label>
              <select
                value={currentConfig.defaultTimeoutMinutes}
                onChange={(e) => setCurrentConfig({ ...currentConfig, defaultTimeoutMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-xl text-white focus:border-ping-500 focus:outline-none"
              >
                <option value={5}>5 Minutes (High Velocity Workflows)</option>
                <option value={10}>10 Minutes (Standard Default)</option>
                <option value={30}>30 Minutes (Deep Deliberation)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                If no human approval or rejection is received within this duration, the fallback action fires automatically.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Fallback Action Upon Timeout Expiration</label>
              <select
                value={currentConfig.fallbackAction}
                onChange={(e) => setCurrentConfig({ ...currentConfig, fallbackAction: e.target.value })}
                className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-xl text-white focus:border-ping-500 focus:outline-none"
              >
                <option value="AUTO_ABORT">AUTO_ABORT (Halt Agent & Log Timeout Blocker)</option>
                <option value="AUTO_REJECT">AUTO_REJECT (Send Rejection to Waiting Agent Loop)</option>
                <option value="ESCALATE_SMS">ESCALATE_SMS (Trigger Secondary PagerDuty/Twilio SMS)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Guarantees zero unauthorized execution without explicit human cryptographic signature.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
