// Which company boards the daily ingest reads. Edit these lists freely.
//
// How to find a company's token:
//   Greenhouse: careers page URL looks like boards.greenhouse.io/<token> or job-boards.greenhouse.io/<token>
//   Lever:      careers page URL looks like jobs.lever.co/<slug>
// If a token is wrong, the ingest reports that one board as failed and carries on with the rest.

export const GREENHOUSE_BOARDS: { token: string; name: string }[] = [
  // Examples only. Check that each URL opens before relying on it.
  { token: "stripe", name: "Stripe" },
  { token: "databricks", name: "Databricks" },
  { token: "cloudflare", name: "Cloudflare" },
  { token: "airbnb", name: "Airbnb" },
];

export const LEVER_COMPANIES: { slug: string; name: string }[] = [
  // { slug: "company-slug", name: "Company Name" },
];

// A posting is kept only if its title matches this
export const INTERN_PATTERN = /\b(intern|interns|internship|trainee|apprentice)\b/i;

// ...and its location matches this. Set to null to keep every location (useful for a first test).
export const LOCATION_PATTERN: RegExp | null =
  /india|bengaluru|bangalore|hyderabad|pune|mumbai|delhi|gurgaon|gurugram|noida|chennai|kolkata|ahmedabad/i;

// ---------- Adzuna (job aggregator with an India index) ----------
// Needs a free key from https://developer.adzuna.com (ADZUNA_APP_ID and ADZUNA_APP_KEY in your env).
// Each query uses ADZUNA_PAGES calls per run. With the defaults that is 8 calls a day,
// about 240 a month, well inside the free tier (roughly 1,000 calls a month).
export const ADZUNA_QUERIES = ["internship", "software intern", "data intern", "web developer intern"];
export const ADZUNA_PAGES = 2;
