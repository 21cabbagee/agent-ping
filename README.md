# AgentPing (`/tools/agent-notification-hub-hitl-inbox`)

> **Unified Agent Notification Hub & Human-in-the-Loop Inbox Where Autonomous Agents Request Permission, Report Blockers, and Receive Instant Sign-Offs Via Telegram & Web PWA**

[![Deploy AgentPing to GitHub Pages](https://github.com/21cabbagee/agent-ping/actions/workflows/deploy.yml/badge.svg)](https://github.com/21cabbagee/agent-ping/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-online-sky)](https://21cabbagee.github.io/agent-ping/)

---

## 🎯 Executive Summary & Problem Thesis
- **Target Audience:** AI Automation Agency founders, workflow developers using n8n/Make, and multi-agent systems engineers across 400,000 teams.
- **Core Problem:** Autonomous agent pipelines regularly encounter high-stakes decision forks: 'Should I charge this card?', 'Is this drafted tweet approved?', 'Missing API token: provide updated key'. Currently, agents either dump raw error logs into Discord webhooks, fail silently, or require developers to stare at CLI terminal consoles.
- **AgentPing Solution:** Whenever an agent needs human confirmation, it pings your phone. Tap 'Approve' or 'Reject' in Telegram or your web dashboard, and the waiting agent resumes execution immediately in &lt;500ms.

---

## 🚀 Key Features (Black Car V1 Scope)
1. **Webhook Approval Dispatcher:** Simple REST endpoint (`POST /v1/ask-human`) accepting `agent_name`, `question`, `context_data`, and `options: ['Approve', 'Reject']`.
2. **Live Web & Mobile PWA Inbox:** Interactive notification feed showing pending agent requests with real-time countdown timer and parameter inspection.
3. **Instant Telegram Bot Two-Way Sync:** Receive an interactive Telegram message with inline buttons; clicking 'Approve' immediately returns HTTP 200 to the waiting agent.
4. **Timeout & Fallback Handler:** Configurable fallback rules (auto-abort or auto-reject if human does not reply within 10 minutes) preventing deadlock.
5. **Founding Customer Advisory Board (CAB) Modal:** Direct capture mechanism offering 10 founding engineering teams a 70% lifetime platform discount ($15/mo instead of $49/mo).

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite 8
- **Styling:** TailwindCSS 3.4 (Cyber communications electric sky/cyan dark aesthetic with glassmorphism)
- **Icons:** Lucide React
- **Animations:** Canvas Confetti + Tailwind Keyframes
- **Deployment:** GitHub Pages via GitHub Actions CI/CD

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/21cabbagee/agent-ping.git
cd agent-ping

# Install dependencies
npm install

# Start local development server
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

---

## 🌐 Live Deployment
- **URL:** [https://21cabbagee.github.io/agent-ping/](https://21cabbagee.github.io/agent-ping/)
- **Repository:** [https://github.com/21cabbagee/agent-ping](https://github.com/21cabbagee/agent-ping)
