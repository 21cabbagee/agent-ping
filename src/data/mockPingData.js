export const INITIAL_REQUESTS = [
  {
    id: "req-stripe-charge",
    agentName: "StripeBillingBot_v2",
    framework: "CrewAI",
    question: "Approve charging customer credit card $4,500.00 for annual enterprise renewal on Invoice #INV-9102?",
    contextData: {
      customer: "Acme Cloud Corporation",
      amount: "$4,500.00",
      invoice_id: "INV-9102",
      card_last4: "4242",
      risk_score: "0.02 (Low Risk)"
    },
    options: ["Approve Charge", "Reject Charge"],
    timeoutTotalSec: 600,
    remainingSec: 435,
    status: "PENDING",
    createdAt: "2026-10-13T23:28:15Z",
    priority: "HIGH"
  },
  {
    id: "req-prod-db-migration",
    agentName: "DbMigratorBot",
    framework: "LangGraph",
    question: "Execute DDL schema migration: ALTER TABLE customer_profiles ADD COLUMN kyc_status on production cluster?",
    contextData: {
      cluster: "prod-primary-rds-cluster",
      target_table: "customer_profiles",
      row_count: "1,240,000",
      lock_duration: "<180ms"
    },
    options: ["Approve Migration", "Abort Migration"],
    timeoutTotalSec: 600,
    remainingSec: 290,
    status: "PENDING",
    createdAt: "2026-10-13T23:25:00Z",
    priority: "CRITICAL"
  },
  {
    id: "req-social-launch",
    agentName: "SocialMediaAgent",
    framework: "AutoGen",
    question: "Publish finalized Q4 product launch announcement thread to official @CompanyAI Twitter/X account?",
    contextData: {
      network: "Twitter / X",
      thread_length: "4 tweets",
      hashtags: "#AI #DevOps #AgentOps",
      scheduled_time: "Immediate"
    },
    options: ["Publish Now", "Revise Thread"],
    timeoutTotalSec: 600,
    remainingSec: 0,
    status: "APPROVED",
    createdAt: "2026-10-13T23:10:00Z",
    resolvedAt: "18 mins ago via Telegram Bot",
    resolvedBy: "Alex Mercer (@alexm_dev)",
    priority: "MEDIUM"
  },
  {
    id: "req-outbound-burst",
    agentName: "OutboundMailer_v1",
    framework: "CrewAI",
    question: "Dispatch unsolicited outbound sequence to 1,200 scraped European marketing directors?",
    contextData: {
      recipient_count: "1,200",
      target_geo: "EU / DACH Region",
      potential_gdpr_liability: "Flagged by compliance engine"
    },
    options: ["Approve Send", "Halt Campaign"],
    timeoutTotalSec: 600,
    remainingSec: 0,
    status: "REJECTED",
    createdAt: "2026-10-13T22:50:00Z",
    resolvedAt: "40 mins ago via Web Inbox",
    resolvedBy: "Alex Mercer (Reason: GDPR risk)",
    priority: "CRITICAL"
  }
];

export const INITIAL_TIMEOUT_CONFIG = {
  defaultTimeoutMinutes: 10,
  fallbackAction: "AUTO_ABORT", // 'AUTO_ABORT' | 'AUTO_REJECT' | 'ESCALATE_SMS'
  notifyChannels: {
    telegram: true,
    webPwa: true,
    discord: false,
    slack: true
  }
};
