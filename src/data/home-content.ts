/** Shared home page copy — career numbers must match Chirag-Gandhi-Resume-v8 */

export const HERO_COPY = {
  name: "Chirag R Gandhi",
  /** Dominant hero line */
  statement: "I revel in watching a well-built solution come alive.",
  /** Smaller supporting line under the statement */
  subhero: "Enterprise products at work, experiments at home.",
  /** Role / positioning strip under the sub-hero */
  tagline: "Platform Product Manager | Agent-supported Builder",
} as const;

export const HERO_METRIC = {
  value: "€0.36Bn/yr",
  label: "Profitability supported by platform negotiations",
} as const;

export const PILLARS = [
  {
    index: "01",
    title: "Internal employees are the customer",
    body: "Product-market fit is measured in daily use, not downloads. The platform's ~850 negotiators across EU and NA decide if it lives or dies.",
  },
  {
    index: "02",
    title: "Data over opinions",
    body: "My analysis of 41K requests drove the call for deterministic workflows over an AI chatbot — against the industry trend, now a funded 2026 VP goal ($200MM sized entitlement).",
  },
  {
    index: "03",
    title: "Automation that compounds",
    body: "+175 bps successful-schedule rate from 7 fixes in 6 months, protecting >$1.05M/yr in contribution profit. Each silent failure found is one less at-risk dollar.",
  },
] as const;

export const IMPACT_METRICS = [
  {
    num: "€87M surfaced",
    label: "Solo-built profitability app, 5 wks to prod",
  },
  {
    num: "850 negotiators",
    label: "Zero to org-wide default across EU & NA",
  },
  {
    num: "$1.05M/yr protected",
    label: "+175 bps success rate, 7 fixes / 6 months",
  },
] as const;
