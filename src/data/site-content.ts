export const ABOUT_BADGES: Record<string, string[]> = {
  "Cloud & Infrastructure": ["Linux", "Windows Admin", "Networking", "Azure"],
  Cybersecurity: [
    "Penetration Testing",
    "Vulnerability Assessment",
    "Web Security",
    "Ethical Hacking",
  ],
  Tools: ["Burp Suite", "Nmap", "OWASP ZAP", "Metasploit", "Wireshark", "Git"],
  Scripting: ["Python", "Bash", "PowerShell", "SQL"],
};

export const SKILLS_SECTION: { category: string; items: string[]; blurb: string }[] = [
  {
    category: "Cloud & Infrastructure",
    blurb: "Designing resilient systems across Linux, Windows, networking, and Azure-aligned operations.",
    items: ["Linux administration", "Windows Server", "TCP/IP & routing", "Azure fundamentals"],
  },
  {
    category: "Offensive Security",
    blurb: "Structured testing methodologies from reconnaissance through responsible disclosure.",
    items: ["Web application testing", "Vulnerability triage", "Secure SDLC awareness", "CTF-style problem solving"],
  },
  {
    category: "Automation & Tooling",
    blurb: "Building repeatable pipelines that connect scanners, proxies, and custom scripts.",
    items: ["Burp Suite", "Nmap", "OWASP ZAP", "Metasploit", "Wireshark", "Git workflows"],
  },
  {
    category: "Scripting",
    blurb: "Glue code for recon, parsing, and infrastructure tasks across environments.",
    items: ["Python", "Bash", "PowerShell", "SQL"],
  },
];

export const BUG_BOUNTY = [
  {
    org: "Liquid Web",
    amount: "$300",
    detail: "Responsible disclosure reward for a validated security finding.",
  },
  {
    org: "Zoho",
    amount: "$50",
    detail: "Acknowledged bounty for a reported vulnerability in scope.",
  },
] as const;

export const CERTIFICATIONS = [
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    description:
      "Foundations across security operations, networks, Linux, Python, and incident response with hands-on assessments.",
    verifyUrl: "https://www.coursera.org/professional-certificates/google-cybersecurity",
  },
  {
    title: "Google Cloud Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    description:
      "Designing, building, and productionizing ML systems on Google Cloud with reliability and governance in mind.",
    verifyUrl: "https://cloud.google.com/certification/machine-learning-engineer",
  },
  {
    title: "Offensive Penetration Testing",
    issuer: "Offensive Security / Accredited Program",
    description:
      "Practical penetration testing methodology aligned with real-world engagements and ethical constraints.",
    verifyUrl: undefined as string | undefined,
  },
] as const;
