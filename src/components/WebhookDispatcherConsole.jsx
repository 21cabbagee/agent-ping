import React, { useState } from 'react';
import { Terminal, Send, Copy, Check, Sparkles, Play } from 'lucide-react';

export default function WebhookDispatcherConsole({ onDispatchNewRequest }) {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);

  const [formData, setFormData] = useState({
    agentName: "CodeDeployer_v3",
    question: "Approve deployment of commit a81b92 to production Kubernetes cluster?",
    priority: "HIGH",
    timeoutMinutes: 10,
    contextJson: JSON.stringify({
      commit: "a81b92f",
      branch: "main",
      docker_image: "company/core:tag-1.9.4",
      canary_passed: true
    }, null, 2)
  });

  const curlSnippet = `curl -X POST https://api.agentping.io/v1/ask-human \\
  -H "Authorization: Bearer ping_live_key_9812" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_name": "${formData.agentName}",
    "question": "${formData.question}",
    "priority": "${formData.priority}",
    "timeout_seconds": ${formData.timeoutMinutes * 60},
    "options": ["Approve Deploy", "Abort Deploy"]
  }'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlSnippet);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    setIsDispatching(true);

    setTimeout(() => {
      let parsed = {};
      try {
        parsed = JSON.parse(formData.contextJson);
      } catch (e) {
        parsed = { raw: formData.contextJson };
      }

      const newReq = {
        id: `req-${Date.now()}`,
        agentName: formData.agentName,
        framework: "CrewAI / LangGraph",
        question: formData.question,
        contextData: parsed,
        options: ["Approve Deploy", "Abort Deploy"],
        timeoutTotalSec: formData.timeoutMinutes * 60,
        remainingSec: formData.timeoutMinutes * 60,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        priority: formData.priority
      };

      onDispatchNewRequest(newReq);
      setIsDispatching(false);
    }, 600);
  };

  return (
    <section id="webhook-dispatcher" className="py-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 text-left">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-ping-400" />
                <span>REST Webhook Approval Dispatcher (`POST /v1/ask-human`)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Your agent pauses and queries this endpoint; it waits on a single long-polling HTTP socket until you click approve
              </p>
            </div>

            <button
              onClick={handleCopyCurl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-dark-800 text-slate-200 border border-white/10 text-xs font-mono transition-all"
            >
              {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedCurl ? 'cURL Copied' : 'Copy cURL Snippet'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Dispatch Form (7 cols) */}
            <form onSubmit={handleDispatch} className="lg:col-span-7 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Calling Agent Name</label>
                  <input
                    type="text"
                    value={formData.agentName}
                    onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-xl text-white font-mono focus:border-ping-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Urgency Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-xl text-white focus:border-ping-500 focus:outline-none"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Human Decision Prompt / Question</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-xl text-white focus:border-ping-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Context Parameters (JSON)</label>
                <textarea
                  rows={4}
                  value={formData.contextJson}
                  onChange={(e) => setFormData({ ...formData, contextJson: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-950 border border-white/10 rounded-xl text-white font-mono text-[11px] focus:border-ping-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isDispatching}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-ping-600 to-sky-600 hover:from-ping-500 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-ping-500/25 transition-all hover:scale-[1.01]"
              >
                {isDispatching ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Broadcasting to Web Inbox & Telegram...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Agent Request to Human Reviewers</span>
                  </>
                )}
              </button>
            </form>

            {/* Right: Code Sample (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="p-4 rounded-2xl bg-dark-950 font-mono text-[11px] text-slate-300 border border-white/5 space-y-2 overflow-x-auto">
                <div className="text-slate-500">// 1-Line Python LangGraph Hook</div>
                <div className="text-sky-300">import requests</div>
                <div className="text-slate-400 mt-2">def ask_human_gatekeeper(action, payload):</div>
                <div className="pl-3 text-slate-200">
                  res = requests.post(<br />
                  &nbsp;&nbsp;"https://api.agentping.io/v1/ask-human",<br />
                  &nbsp;&nbsp;json=&#123;"agent": "langgraph_bot", "question": action&#125;<br />
                  )<br />
                  return res.json()["decision"] == "APPROVED"
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-ping-950/40 border border-ping-500/30 text-xs text-ping-200 mt-4">
                <strong>Socket State:</strong> Agents block gracefully without timing out on normal HTTP 504 errors.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
