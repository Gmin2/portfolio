export type WorkItem = {
  company: string;
  slug: string;
  role: string;
  date: string;
  about: string;
  url: string;
  image?: string;
};

export type Project = {
  name: string;
  slug: string;
  role: string;
  about: string;
  url: string;
  image?: string;
};

export const DISCORD_SNOWFLAKE = "207204046115831809";

export type Social = {
  label: string;
  href: string;
};

export const SOCIALS: readonly Social[] = [
  { label: "GitHub", href: "https://github.com/Gmin2" },
  { label: "X", href: "https://x.com/Min2_gg" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mintu-gogoi" },
];

export const WORK_ITEMS: readonly WorkItem[] = [
  {
    company: "Intuition Network",
    slug: "intuition",
    role: "rust & fullstack engineer",
    date: "jan 2026 — present",
    about: "ERC-8004 and x402 integration with ecosystem tools, libraries, cli, and dashboard",
    url: "https://intuition.systems",
  },
  {
    company: "Ink (Polkadot)",
    slug: "ink-polkadot",
    role: "fullstack engineer",
    date: "sept 2025 — dec 2025",
    about: "interactive learning platform for smart-contract vulnerabilities, $35k Polkadot grant",
    url: "https://polkadot.network",
  },
  {
    company: "Summer of Bitcoin",
    slug: "summer-of-bitcoin",
    role: "rust & lightning engineer",
    date: "july 2025 — sept 2025",
    about: "architectural changes in AsyncAPI Generator, maintainer of @asyncapi/generator (40k weekly downloads)",
    url: "https://www.summerofbitcoin.org",
  },
  {
    company: "OpenPrinting",
    slug: "openprinting",
    role: "rust & systems engineer",
    date: "may 2025 — july 2025",
    about: "developed cups-rs, the official Rust FFI bindings for libcups v2 & v3",
    url: "https://openprinting.github.io",
  },
  {
    company: "Stellar Fellowship",
    slug: "stellar",
    role: "typescript engineer",
    date: "feb 2025 — may 2025",
    about: "AsyncAPI Generator architectural changes, build optimization, and monorepo structure",
    url: "https://stellar.org",
  },
  {
    company: "Google Summer of Code",
    slug: "gsoc",
    role: "typescript engineer",
    date: "may 2024 — oct 2024",
    about: "led deprecation of Nunjucks in favor of React as default template engine for AsyncAPI Generator",
    url: "https://summerofcode.withgoogle.com",
  },
  {
    company: "Open Source",
    slug: "open-source",
    role: "rust, go & typescript",
    date: "sept 2023 — present",
    about: "60+ merged PRs across Cargo, AsyncAPI, Ethermind, NEAR CLI, and more",
    url: "https://github.com/Gmin2",
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: "DuskPool",
    slug: "duskpool",
    role: "creator",
    about: "private exchange for trading RWA assets on Stellar using protocol 25 and custom ZK circuits",
    url: "https://duskpools.xyz",
  },
  {
    name: "RoboLend",
    slug: "robolend",
    role: "creator",
    about: "money market for tokenized equities on Robinhood Chain — deposit stocks, borrow WEth",
    url: "https://robo-lend.vercel.app",
  },
  {
    name: "UnMasked",
    slug: "unmasked",
    role: "creator",
    about: "anonymous confidential dating app on NEAR blockchain using TEE for private matching",
    url: "https://un-masked.vercel.app",
  },
  {
    name: "ObsCura",
    slug: "obscura",
    role: "creator",
    about: "dark pool decentralized exchange on Aleo utilizing privacy protocol",
    url: "https://obscuras.xyz",
  },
  {
    name: "Soroban Decoder",
    slug: "soroban-decoder",
    role: "creator",
    about: "Rust WASM debugger that extracts smart contract info from compiled Soroban WASM files",
    url: "https://github.com/Gmin2/soroban-decoder",
  },
  {
    name: "AnchorLite",
    slug: "anchorlite",
    role: "creator",
    about: "mini smart contract language for Solana, built for deep understanding of Anchor and SVM",
    url: "https://github.com/Gmin2/AnchorLite",
  },
  {
    name: "BuildParams",
    slug: "buildparams",
    role: "creator",
    about: "Rust library for parsing typed build parameters from Cargo.toml",
    url: "https://github.com/Gmin2/BuildParams",
  },
];
