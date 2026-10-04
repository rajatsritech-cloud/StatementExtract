const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'diagrams');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function makeSvg(title, subtitle, badge, nodes, connectors) {
  const nodeWidth = 205;
  const nodeHeight = 85;
  const svgWidth = 920;
  const svgHeight = 440;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="100%" style="background: #09090b; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#111113" stop-opacity="0.98"/>
    </linearGradient>
  </defs>

  <!-- Background grid pattern -->
  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" rx="16" />

  <!-- Header Section -->
  <g transform="translate(40, 36)">
    <rect x="0" y="0" width="140" height="24" rx="12" fill="rgba(22, 163, 74, 0.15)" stroke="rgba(22, 163, 74, 0.3)" stroke-width="1"/>
    <circle cx="12" cy="12" r="4" fill="#16a34a" />
    <text x="24" y="16" fill="#4ade80" font-size="11" font-weight="600" letter-spacing="0.5">${badge}</text>
    
    <text x="0" y="54" fill="#f4f4f5" font-size="20" font-weight="700">${title}</text>
    <text x="0" y="74" fill="#a1a1aa" font-size="13">${subtitle}</text>
  </g>

  <!-- Connectors -->
  ${connectors.map(c => `
    <path d="${c.d}" fill="none" stroke="${c.color || 'rgba(34, 197, 94, 0.4)'}" stroke-width="2" stroke-dasharray="${c.dash || 'none'}" />
    <circle cx="${c.x2}" cy="${c.y2}" r="3.5" fill="${c.color || '#22c55e'}" />
  `).join('')}

  <!-- Nodes -->
  ${nodes.map(n => `
    <g transform="translate(${n.x}, ${n.y})">
      <rect width="${n.w || nodeWidth}" height="${n.h || nodeHeight}" rx="12" fill="url(#cardGrad)" stroke="${n.border || 'rgba(255,255,255,0.12)'}" stroke-width="1.5" />
      <rect x="0" y="0" width="4" height="${n.h || nodeHeight}" rx="2" fill="${n.accent || '#16a34a'}" />
      <text x="16" y="24" fill="#71717a" font-size="10" font-weight="600" letter-spacing="0.8" text-transform="uppercase">${n.tag}</text>
      <text x="16" y="44" fill="#f4f4f5" font-size="13" font-weight="600">${n.label}</text>
      <text x="16" y="64" fill="#a1a1aa" font-size="11">${n.desc}</text>
    </g>
  `).join('')}

  <!-- Watermark -->
  <text x="880" y="415" fill="#52525b" font-size="11" text-anchor="end" font-weight="500">Statement Extract • Technical Architecture</text>
</svg>`;
}

// 1. Chase Bank
fs.writeFileSync(path.join(dir, 'chase-statement-workflow.svg'), makeSvg(
  'JPMorgan Chase PDF Extraction Architecture',
  'Vector decomposition and multi-column check register normalization to QBO/Excel',
  'CHASE COMMERCIAL',
  [
    { x: 40, y: 140, tag: 'Phase 1: Input', label: 'Vector PDF Stream', desc: 'Cartesian text coordinate map', accent: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    { x: 265, y: 140, tag: 'Phase 2: Parsing', label: 'Multi-Column Matrix', desc: '3-column check register unifier', accent: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
    { x: 490, y: 140, tag: 'Phase 3: Audit', label: 'Mathematical Proof', desc: 'Opening + Credits - Debits == End', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 715, y: 140, tag: 'Phase 4: Export', label: 'Structured QBO / CSV', desc: 'Native QuickBooks Web Connect', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 265, y: 260, tag: 'Security Filter', label: 'Account Masking', desc: 'Redact SSN / Account routing', accent: '#06b6d4', border: 'rgba(6,182,212,0.3)' },
    { x: 490, y: 260, tag: 'Ledger Map', label: 'GL Categorization', desc: 'Auto-match Chart of Accounts', accent: '#ec4899', border: 'rgba(236,72,153,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#3b82f6' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#8b5cf6' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#10b981' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#06b6d4', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#ec4899', dash: '4,4' }
  ]
));

// 2. Bank of America
fs.writeFileSync(path.join(dir, 'bofa-quickbooks-workflow.svg'), makeSvg(
  'Bank of America Statement to QuickBooks Pipeline',
  'Unified chronological sequencing across disparate deposit, fee, and check tables',
  'BOFA ADVANTAGE',
  [
    { x: 40, y: 140, tag: 'Document Ingestion', label: 'BofA Hybrid PDF', desc: 'Vector text + check scan images', accent: '#ef4444', border: 'rgba(239,68,68,0.3)' },
    { x: 265, y: 140, tag: 'Sequence Engine', label: 'Interleaved Sorting', desc: 'Chronological timeline alignment', accent: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    { x: 490, y: 140, tag: 'OFX Serialization', label: 'QBO / SGML Encoder', desc: 'Intuit FI ID: 3000 validation', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 715, y: 140, tag: 'Reconciliation', label: 'Direct Bank Feed', desc: 'Zero duplicate sync guarantee', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 265, y: 260, tag: 'Subtotal Filter', label: 'Ghost Total Eliminator', desc: 'Isolates genuine debit lines', accent: '#a855f7', border: 'rgba(168,85,247,0.3)' },
    { x: 490, y: 260, tag: 'Zelle Parser', label: 'P2P Transfer Extraction', desc: 'Preserves sender/memo metadata', accent: '#14b8a6', border: 'rgba(20,184,166,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#ef4444' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#3b82f6' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#10b981' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#a855f7', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#14b8a6', dash: '4,4' }
  ]
));

// 3. Wells Fargo
fs.writeFileSync(path.join(dir, 'wells-fargo-csv-pipeline.svg'), makeSvg(
  'Wells Fargo Statement to CSV Normalizer',
  'Automated multi-account partitioning and thumbnail check filtering for accountants',
  'WELLS FARGO TREASURY',
  [
    { x: 40, y: 140, tag: 'Input Scan/PDF', label: 'Commercial PDF', desc: 'Checking, savings, or sweep lines', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 265, y: 140, tag: 'Account Splitter', label: 'Sub-Account Isolator', desc: 'Detects account transition markers', accent: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
    { x: 490, y: 140, tag: 'Date Normalizer', label: 'ISO 8601 Parser', desc: 'Derives 4-digit accounting years', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 715, y: 140, tag: 'Final Export', label: 'RFC 4180 CSV / Excel', desc: 'Clean columns: Date, Payee, Net', accent: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    { x: 265, y: 260, tag: 'Image Filter', label: 'Thumbnail Excluder', desc: 'Strips rear statement check scans', accent: '#ec4899', border: 'rgba(236,72,153,0.3)' },
    { x: 490, y: 260, tag: 'Audit Check', label: 'Zero-Sum Checksum', desc: 'Calculates net daily balance shifts', accent: '#06b6d4', border: 'rgba(6,182,212,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#f59e0b' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#8b5cf6' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#10b981' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#ec4899', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#06b6d4', dash: '4,4' }
  ]
));

// 4. Citibank
fs.writeFileSync(path.join(dir, 'citibank-wire-format.svg'), makeSvg(
  'Citibank Multi-Currency Commercial Parser',
  'Global cash management parsing with IMAD/OMAD transaction isolation',
  'CITIDIRECT GLOBAL',
  [
    { x: 40, y: 140, tag: 'Global Statement', label: 'CitiDirect PDF', desc: 'Multi-jurisdiction USD/EUR accounts', accent: '#0284c7', border: 'rgba(2,132,199,0.3)' },
    { x: 265, y: 140, tag: 'Wire Isolator', label: 'IMAD / OMAD Extraction', desc: 'Federal Reserve wire reference IDs', accent: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
    { x: 490, y: 140, tag: 'FX Converter', label: 'Dual-Currency Splitter', desc: 'Separates booked vs converted sums', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 715, y: 140, tag: 'ERP Sync', label: 'SAP / NetSuite Feed', desc: 'Direct enterprise ledger import', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 265, y: 260, tag: 'Tax Parser', label: 'Withholding Tax ID', desc: 'Cross-border transaction tags', accent: '#14b8a6', border: 'rgba(20,184,166,0.3)' },
    { x: 490, y: 260, tag: 'Variance Check', label: 'FX Slippage Auditor', desc: 'Compares spot rates vs ledger sums', accent: '#e11d48', border: 'rgba(225,29,72,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#0284c7' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#8b5cf6' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#10b981' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#14b8a6', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#e11d48', dash: '4,4' }
  ]
));

// 5. MT940
fs.writeFileSync(path.join(dir, 'mt940-tag-architecture.svg'), makeSvg(
  'SWIFT MT940 Statement Protocol Specification',
  'ISO 15022 Customer Statement Message Tag Structure & Data Mapping',
  'ISO 15022 BANKING',
  [
    { x: 40, y: 140, tag: 'Header :20: & :25:', label: 'TRN & Account ID', desc: 'Mandatory reference & IBAN string', accent: '#16a34a', border: 'rgba(22,163,74,0.3)' },
    { x: 265, y: 140, tag: 'Balance :60F:', label: 'Opening Balance', desc: 'Indicator (C/D), YYMMDD, Currency', accent: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    { x: 490, y: 140, tag: 'Lines :61: & :86:', label: 'Statement & Info Tag', desc: 'Atomic transaction & subfields', accent: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
    { x: 715, y: 140, tag: 'Trailer :62F:', label: 'Closing Book Balance', desc: 'Cryptographic ledger closing proof', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 265, y: 260, tag: 'Subfield Parsing', label: 'Field 86 Tokenizer', desc: 'Extracts /EREF/ and /REMI/ markers', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 490, y: 260, tag: 'Reconciliation', label: 'Mathematical Proof', desc: 'Opening + Σ(Lines) == Closing', accent: '#06b6d4', border: 'rgba(6,182,212,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#16a34a' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#3b82f6' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#8b5cf6' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#f59e0b', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#06b6d4', dash: '4,4' }
  ]
));

// 6. BAI2
fs.writeFileSync(path.join(dir, 'bai2-record-hierarchy.svg'), makeSvg(
  'BAI2 Cash Management File Hierarchy',
  'Commercial banking cash management standard record structure (01 to 99)',
  'BAI2 CASH MANAGEMENT',
  [
    { x: 40, y: 140, tag: 'Record 01', label: 'File Header', desc: 'Sender/Receiver ID, Date & Time', accent: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
    { x: 265, y: 140, tag: 'Record 02 / 03', label: 'Group & Account ID', desc: 'Bank routing & account summary', accent: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    { x: 490, y: 140, tag: 'Record 16 / 88', label: 'Transaction & Memo', desc: 'Type code, amount, text continuation', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 715, y: 140, tag: 'Record 49 / 98 / 99', label: 'Trailers & Control Sums', desc: 'Control amounts & hash totals', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 265, y: 260, tag: 'Type Code Index', label: 'BAI Code Decoder', desc: 'Resolves 495, 174, 399 type codes', accent: '#ec4899', border: 'rgba(236,72,153,0.3)' },
    { x: 490, y: 260, tag: 'Treasury TMS', label: 'Kyriba / GTreasury Sync', desc: 'Real-time corporate cash positioning', accent: '#14b8a6', border: 'rgba(20,184,166,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#8b5cf6' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#3b82f6' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#10b981' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#ec4899', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#14b8a6', dash: '4,4' }
  ]
));

// 7. OFX vs QBO vs QFX
fs.writeFileSync(path.join(dir, 'ofx-qbo-qfx-data-model.svg'), makeSvg(
  'OFX vs QBO vs QFX Financial Data Architecture',
  'Comparison of open financial exchange protocols and proprietary vendor extensions',
  'OPEN FINANCIAL EXCHANGE',
  [
    { x: 40, y: 140, tag: 'Base Protocol', label: 'OFX 2.x Core Standard', desc: 'Open Financial Exchange SGML/XML', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 265, y: 140, tag: 'Intuit Fork', label: 'QuickBooks QBO', desc: 'Proprietary Intuit Web Connect tags', accent: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    { x: 490, y: 140, tag: 'Quicken Fork', label: 'Quicken QFX', desc: 'Quicken personal finance tags', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 715, y: 140, tag: 'Destination', label: 'Accounting General Ledger', desc: 'QuickBooks, Xero, Sage, FreeAgent', accent: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
    { x: 265, y: 260, tag: 'INTU.BID Auth', label: 'Bank ID Validation', desc: 'Requires approved Intuit BID code', accent: '#06b6d4', border: 'rgba(6,182,212,0.3)' },
    { x: 490, y: 260, tag: 'Transaction Token', label: 'FITID Uniqueness', desc: 'Prevents duplicate transaction sync', accent: '#e11d48', border: 'rgba(225,29,72,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#10b981' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#3b82f6' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#f59e0b' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#06b6d4', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#e11d48', dash: '4,4' }
  ]
));

// 8. QBO Troubleshooting
fs.writeFileSync(path.join(dir, 'qbo-troubleshooting-flowchart.svg'), makeSvg(
  'QuickBooks Web Connect Diagnostic Flowchart',
  'Root-cause resolution workflows for Ol-221, Ol-222, and Ol-293 import failures',
  'QUICKBOOKS TROUBLESHOOTING',
  [
    { x: 40, y: 140, tag: 'Import Trigger', label: 'Upload .QBO File', desc: 'Client attempts bank feed import', accent: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    { x: 265, y: 140, tag: 'Validation Failure', label: 'Error Ol-221 / Ol-222', desc: 'Corrupted tags or invalid BID', accent: '#ef4444', border: 'rgba(239,68,68,0.3)' },
    { x: 490, y: 140, tag: 'Automated Repair', label: 'SGML Header Fixer', desc: 'Replaces character sets & FID', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 715, y: 140, tag: 'Clean Import', label: 'Successful Bank Feed', desc: 'All transactions matched & balanced', accent: '#16a34a', border: 'rgba(22,163,74,0.3)' },
    { x: 265, y: 260, tag: 'Tag Scanner', label: 'Close Tag Checker', desc: 'Ensures SGML tags are not XML closed', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 490, y: 260, tag: 'Duplicate Guard', label: 'FITID Regenerator', desc: 'Prevents collision with active records', accent: '#a855f7', border: 'rgba(168,85,247,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#3b82f6' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#ef4444' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#10b981' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#f59e0b', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#a855f7', dash: '4,4' }
  ]
));

// 9. Fraud Detection
fs.writeFileSync(path.join(dir, 'audit-trail-reconciliation-math.svg'), makeSvg(
  'Forensic Audit Trail & Balance Verification Engine',
  'Mathematical integrity checks, font rendering analysis, and altered check detection',
  'FORENSIC RECONCILIATION',
  [
    { x: 40, y: 140, tag: 'Forensic Ingestion', label: 'Unverified PDF', desc: 'Client statement submitted for loan', accent: '#ef4444', border: 'rgba(239,68,68,0.3)' },
    { x: 265, y: 140, tag: 'Formula Verification', label: 'Running Balance Proof', desc: 'Opening + Credits - Debits == Closing', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 490, y: 140, tag: 'Font Inspection', label: 'Vector Font Analysis', desc: 'Flags mismatched typography & kerning', accent: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
    { x: 715, y: 140, tag: 'Compliance Report', label: 'Verified Audit Seal', desc: 'Certified clean data for underwriters', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 265, y: 260, tag: 'Discrepancy Pin', label: 'Variance Pinpointer', desc: 'Flags exact transaction breaking audit', accent: '#e11d48', border: 'rgba(225,29,72,0.3)' },
    { x: 490, y: 260, tag: 'Metadata Scan', label: 'PDF Creator Inspector', desc: 'Detects Adobe Acrobat / Photoshop edits', accent: '#06b6d4', border: 'rgba(6,182,212,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#ef4444' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#f59e0b' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#8b5cf6' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#e11d48', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#06b6d4', dash: '4,4' }
  ]
));

// 10. PNC Bank
fs.writeFileSync(path.join(dir, 'pnc-pdf-conversion-pipeline.svg'), makeSvg(
  'PNC Bank Statement Extraction Pipeline',
  'Multi-tier parsing for Virtual Wallet and Treasury Enterprise accounts',
  'PNC FINANCIAL',
  [
    { x: 40, y: 140, tag: 'PNC Statement', label: 'Virtual Wallet PDF', desc: 'Spend, Reserve, and Growth pots', accent: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    { x: 265, y: 140, tag: 'Pot Separator', label: 'Wallet Partitioning', desc: 'Isolates Spend vs Reserve balances', accent: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    { x: 490, y: 140, tag: 'Subtotal Eliminator', label: 'Category Filter', desc: 'Removes nested deposit headers', accent: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
    { x: 715, y: 140, tag: 'Direct Export', label: 'Excel & QBO Feeds', desc: 'Dual-format accounting ready files', accent: '#10b981', border: 'rgba(16,185,129,0.3)' },
    { x: 265, y: 260, tag: 'Merchant Parser', label: 'Clean Payee Engine', desc: 'Strips store numbers & location tags', accent: '#14b8a6', border: 'rgba(20,184,166,0.3)' },
    { x: 490, y: 260, tag: 'Reconciliation', label: 'Combined Proof', desc: 'Net balance cross-check across pots', accent: '#ec4899', border: 'rgba(236,72,153,0.3)' }
  ],
  [
    { d: 'M 245 182 L 265 182', x2: 265, y2: 182, color: '#f59e0b' },
    { d: 'M 470 182 L 490 182', x2: 490, y2: 182, color: '#3b82f6' },
    { d: 'M 695 182 L 715 182', x2: 715, y2: 182, color: '#8b5cf6' },
    { d: 'M 367 225 L 367 260', x2: 367, y2: 260, color: '#14b8a6', dash: '4,4' },
    { d: 'M 592 225 L 592 260', x2: 592, y2: 260, color: '#ec4899', dash: '4,4' }
  ]
));

console.log('Generated 10 technical SVG diagrams in public/assets/diagrams/');
