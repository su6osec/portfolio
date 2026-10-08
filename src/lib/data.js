/**
 * Site content that is NOT derived from the GitHub API.
 * Everything project-related lives in useRepos() and is fetched live,
 * so new repositories appear without a redeploy.
 */

export const SITE = {
  name: 'Deepanshu Chauhan',
  handle: 'su6osec',
  role: 'Cloud & Offensive Security Engineer',
  url: 'https://su6osec.vercel.app',
  altUrl: 'https://su6osec.dev',
  email: 'deepanshu.infosec@gmail.com',
  location: 'India',
  description:
    'Cloud & Infrastructure Engineer building a dual-track foundation in enterprise cloud operations and offensive security.',
  tagline: 'Engineering secure infrastructure through an offensive lens.',
};

export const SOCIALS = [
  { id: 'email', label: 'Email', value: 'deepanshu.infosec@gmail.com', href: 'mailto:deepanshu.infosec@gmail.com', kind: 'mail', action: 'copy' },
  { id: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/su6osec', href: 'https://linkedin.com/in/su6osec', kind: 'linkedin' },
  { id: 'github', label: 'GitHub', value: 'github.com/su6osec', href: 'https://github.com/su6osec', kind: 'github' },
  { id: 'tryhackme', label: 'TryHackMe', value: 'tryhackme.com/p/su6osec', href: 'https://tryhackme.com/p/su6osec', kind: 'shield' },
  { id: 'medium', label: 'Medium', value: 'medium.com/@su6osec', href: 'https://medium.com/@su6osec', kind: 'pen' },
];

export const NAV_LINKS = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'experience', label: 'Experience', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'projects', label: 'Projects', index: '04' },
  { id: 'bounty', label: 'Bug Bounty', index: '05' },
  { id: 'certifications', label: 'Certs', index: '06' },
  { id: 'contact', label: 'Contact', index: '07' },
];

export const HERO_STATS = [
  { value: '100%', label: 'Report acceptance' },
  { value: 'Top 5%', label: 'TryHackMe global' },
  { value: '39+', label: 'OSINT sources shipped' },
  { value: 'Nov 2025', label: 'Joined LTM' },
];

export const FOCUS_AREAS = [
  {
    title: 'Offensive Security',
    body: 'Penetration testing, bug bounty hunting and threat-driven reconnaissance. I maintain a 100% report acceptance rate across public and private programs and rank in the global top 5% on TryHackMe.',
    icon: 'crosshair',
  },
  {
    title: 'Cloud Operations',
    body: 'Building secure, scalable enterprise cloud infrastructure. Experienced across Azure, Linux and Windows Server environments with a focus on availability and security-posture compliance.',
    icon: 'cloud',
  },
];

export const EXPERIENCE = [
  {
    date: 'Nov 2025 — Present',
    company: 'LTM',
    role: 'Engineer, Cloud & Infrastructure',
    summary:
      'Administering and monitoring cloud and on-premises infrastructure within the CIS domain, upholding availability, security posture and operational compliance across hybrid enterprise environments.',
    points: [
      { title: 'Cloud & on-prem monitoring', body: 'CIS domain availability and security posture across hybrid estates.' },
      { title: 'ITIL v4 service delivery', body: 'Access provisioning, patching and P1/P2 incident resolution.' },
      { title: 'Technical governance', body: 'Runbooks, incident reports and audit-readiness documentation.' },
      { title: '100% SLA upheld', body: 'Consistent compliance against agreed service-level targets.' },
    ],
  },
];

export const SKILL_GROUPS = [
  {
    id: 'offensive',
    label: 'Offensive Security',
    tone: 'signal',
    skills: ['Penetration Testing', 'Web App & API Security', 'Bug Bounty Hunting', 'OSINT', 'Vulnerability Assessment', 'Threat Detection', 'Incident Response'],
  },
  {
    id: 'tooling',
    label: 'Security Tooling',
    tone: 'violet',
    skills: ['Burp Suite Pro', 'Nmap', 'Metasploit', 'Nuclei', 'Subfinder', 'Httpx', 'Wireshark'],
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    tone: 'cyan',
    skills: ['Microsoft Azure', 'Linux (Ubuntu/RHEL)', 'Windows Server', 'Active Directory', 'VMware / Hyper-V', 'TCP/IP', 'DNS', 'DHCP'],
  },
  {
    id: 'code',
    label: 'Programming & Standards',
    tone: 'gold',
    skills: ['Go (Golang)', 'Python', 'Bash / Shell', 'PowerShell', 'JavaScript', 'OWASP Top 10', 'MITRE ATT&CK', 'Zero Trust Architecture'],
  },
];

export const BOUNTIES = [
  {
    amount: '$300',
    org: 'Liquid Web',
    body: 'Identified and responsibly disclosed a medium-severity vulnerability; issue confirmed, triaged and fully remediated by the vendor security team.',
  },
  {
    amount: '$50',
    org: 'Zoho',
    body: 'Uncovered a hardcoded API key exposing internal service credentials; coordinated disclosure patched within the vendor-defined reporting SLA.',
  },
];

export const BOUNTY_STATS = [
  { value: 100, suffix: '%', label: 'Report acceptance rate' },
  { value: 5, prefix: 'Top ', suffix: '%', label: 'TryHackMe global rank' },
  { value: 2, prefix: '', suffix: '', label: 'Vendors remediated' },
];

/**
 * Certifications are grouped by difficulty tier rather than a flat list, so
 * the section reads as a progression instead of a wall of badges.
 * `dots` drives the little difficulty meter in the tier header.
 */
export const CERT_TIERS = [
  {
    key: 'advanced',
    label: 'Advanced',
    dots: 3,
    tone: 'signal',
    blurb: 'Proctored, identity-verified professional exams.',
  },
  {
    key: 'intermediate',
    label: 'Intermediate',
    dots: 2,
    tone: 'violet',
    blurb: 'Multi-course programs and role-based operational training.',
  },
  {
    key: 'foundational',
    label: 'Foundational',
    dots: 1,
    tone: 'cyan',
    blurb: 'Focused coursework covering core security fundamentals.',
  },
];

/**
 * Skill lists are taken from the issuing platform's own published skill
 * catalogues (Coursera skill tags, Google Cloud Credly credential data,
 * Anthropic's certification announcement) — not invented summaries.
 * `source` names how the credential was assessed; `verify` links to a public
 * verifier where one exists (Coursera verification codes, program pages).
 */
export const CERTIFICATIONS = [
  {
    title: 'Claude Certified Architect: Professional',
    issuer: 'Anthropic',
    tier: 'advanced',
    logo: '/logos/claude.svg',
    date: 'Jul 2026 — Jul 2027',
    source: 'Pearson-proctored · Credly badge',
    credentialId: null,
    verify: {
      href: 'https://claude.com/resources/articles/four-role-based-claude-certifications',
      label: 'Program page',
    },
    skills: [
      'AI Solution Architecture',
      'Integration Architecture',
      'Agent Systems',
      'AI Governance',
      'Model Evaluation',
    ],
  },
  {
    title: 'Professional Machine Learning Engineer',
    issuer: 'Google Cloud',
    tier: 'advanced',
    logo: '/logos/google-cloud.svg',
    date: 'Jul 2024 — Jul 2026',
    expired: true,
    source: 'Proctored · 50–60 question exam',
    credentialId: '1d8810de140f430cbe0acc329d23ccd2',
    verify: {
      href: 'https://cloud.google.com/certification/machine-learning-engineer',
      label: 'Program page',
    },
    skills: [
      'Vertex AI',
      'ML Ops',
      'BigQuery ML',
      'AutoML',
      'ML APIs',
      'Google Cloud Platform (GCP)',
      'Machine Learning',
      'Responsible AI',
      'Scalability',
      'Cloud Storage',
      'Data Processing',
    ],
  },
  {
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google / Coursera',
    tier: 'intermediate',
    logo: '/logos/google.svg',
    date: 'Jul 2025',
    source: '9-course program · 170 hrs',
    credentialId: null,
    verify: {
      href: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
      label: 'Program page',
    },
    skills: [
      'Incident Response',
      'Threat Detection',
      'Vulnerability Management',
      'SIEM',
      'Network Security',
      'Threat Modeling',
      'Python',
      'Linux',
      'SQL',
    ],
  },
  {
    title: 'Cybersecurity in the Cloud Specialization',
    issuer: 'University of Minnesota',
    tier: 'intermediate',
    logo: '/logos/minnesota.svg',
    date: 'May 2026',
    source: '4-course specialization',
    credentialId: 'XFJQSBOOEBRU',
    verify: {
      href: 'https://www.coursera.org/verify/XFJQSBOOEBRU',
      label: 'Verify credential',
    },
    skills: [
      'Cloud Security',
      'Cryptography',
      'Key Management',
      'Application Security',
      'DevSecOps',
      'Secure Coding',
      'Data Security',
      'GDPR',
    ],
  },
  {
    title: 'SOC L1 / L2 Monitoring',
    issuer: 'LTM',
    tier: 'intermediate',
    logo: '/logos/ltm.svg',
    date: 'Feb 2026',
    source: 'Internal role training',
    credentialId: null,
    verify: null,
    skills: ['SIEM', 'Log Analysis', 'Alert Triage', 'Threat Detection', 'Incident Escalation'],
  },
  {
    title: 'Introduction to Cyber Attacks',
    issuer: 'New York University',
    tier: 'foundational',
    logo: '/logos/nyu.svg',
    date: 'Mar 2026',
    source: 'University course · Coursera',
    credentialId: 'DTXMTKPY4XMP',
    verify: {
      href: 'https://www.coursera.org/verify/DTXMTKPY4XMP',
      label: 'Verify credential',
    },
    skills: [
      'Threat Modeling',
      'Exploitation Techniques',
      'DDoS Attacks',
      'Network Security',
      'Cryptography',
      'Data Integrity',
      'Threat Management',
    ],
  },
  {
    title: 'Bash Shell Scripting',
    issuer: 'LTM',
    tier: 'foundational',
    logo: '/logos/ltm.svg',
    date: 'Feb 2026',
    source: 'Internal training',
    credentialId: null,
    verify: null,
    skills: ['Bash', 'Shell Scripting', 'Linux CLI', 'Text Processing', 'Task Automation', 'Cron Scheduling'],
  },
  {
    title: 'Network Security',
    issuer: 'LTM',
    tier: 'foundational',
    logo: '/logos/ltm.svg',
    date: 'Feb 2026',
    source: 'Internal training',
    credentialId: null,
    verify: null,
    skills: ['TCP/IP', 'Firewalls', 'IDS/IPS', 'VPN & TLS', 'Network Segmentation', 'Traffic Analysis'],
  },
];

export const TERMINAL_SEQUENCE = [
  { text: '$ whoami\n', delay: 420, instant: false },
  { text: 'su6osec (deepanshu_chauhan)\n\n', delay: 380, instant: true },
  { text: '$ cat focus.txt\n', delay: 420, instant: false },
  { text: '[*] Offensive Security\n', delay: 70, instant: true },
  { text: '[*] Penetration Testing\n', delay: 70, instant: true },
  { text: '[*] Cloud Infrastructure\n\n', delay: 420, instant: true },
  { text: '$ ./init_mission.sh\n', delay: 500, instant: false },
  { text: '[+] Securing infrastructure through an offensive lens... [OK]\n', delay: 70, instant: true },
  { text: '$ ', delay: 320, instant: false },
];
