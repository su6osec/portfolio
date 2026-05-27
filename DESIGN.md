# Deepanshu Chauhan — Cloud Infrastructure & Offensive Security Engineer

## Mission
Create an implementation-ready, storytelling-focused portfolio experience for Deepanshu Chauhan that presents enterprise cloud engineering expertise, offensive security capabilities, bug bounty achievements, open-source security tooling, and professional credibility in a modern high-performance web experience optimized for recruiters, security teams, and technical leadership.

## Brand
- Personal Brand: Deepanshu Chauhan
- Portfolio URL: https://su6osec.dev
- Audience:
  - Recruiters
  - Security teams
  - Engineering managers
  - Bug bounty community
  - Startup founders
  - Enterprise hiring teams
- Product Surface:
  - Personal portfolio
  - Resume showcase
  - Technical case studies
  - Bug bounty credibility
  - Open-source project showcase
  - Professional contact hub

## Style Foundations
- Visual Style:
  - premium minimalism
  - cinematic storytelling
  - glassmorphism
  - smooth motion-driven experience
  - developer-first aesthetics
  - enterprise professionalism
  - subtle cyberpunk influence without excessive neon

- Main Font Style:
  - `font.family.primary=Outfit`
  - `font.family.secondary=Inter`
  - `font.family.stack=Outfit, Inter, Arial, sans-serif`
  - `font.size.base=16px`
  - `font.weight.base=400`
  - `font.lineHeight.base=1.7`

- Typography Scale:
  - `font.size.xs=12px`
  - `font.size.sm=14px`
  - `font.size.md=16px`
  - `font.size.lg=18px`
  - `font.size.xl=22px`
  - `font.size.2xl=28px`
  - `font.size.3xl=42px`
  - `font.size.4xl=72px`

- Color Palette:
  - `color.surface.base=#050505`
  - `color.surface.secondary=#0d0d0d`
  - `color.surface.glass=rgba(255,255,255,0.05)`
  - `color.text.primary=#ffffff`
  - `color.text.secondary=#b5b5b5`
  - `color.text.muted=#7a7a7a`
  - `color.border.primary=rgba(255,255,255,0.08)`
  - `color.accent.primary=#6ee7ff`
  - `color.accent.secondary=#7c3aed`
  - `color.success=#22c55e`
  - `color.warning=#f59e0b`
  - `color.error=#ef4444`

- Spacing Scale:
  - `space.1=4px`
  - `space.2=8px`
  - `space.3=12px`
  - `space.4=16px`
  - `space.5=24px`
  - `space.6=32px`
  - `space.7=48px`
  - `space.8=72px`
  - `space.9=120px`

- Radius Tokens:
  - `radius.sm=12px`
  - `radius.md=20px`
  - `radius.lg=32px`
  - `radius.full=999px`

- Motion Tokens:
  - `motion.duration.instant=150ms`
  - `motion.duration.fast=250ms`
  - `motion.duration.normal=500ms`
  - `motion.duration.slow=900ms`

## Accessibility
- Target: WCAG 2.2 AA
- Portfolio must remain fully keyboard navigable.
- All animations must respect reduced motion preferences.
- Focus-visible indicators must remain visible on all interactive elements.
- Text contrast ratio must remain accessible across glassmorphism surfaces.
- Mobile touch targets must be minimum 44px.

## Writing Tone
- Confident
- Technical
- Sharp
- Professional
- Human
- Achievement-driven
- Minimal fluff

## Portfolio Sections

### 1. Hero Section
Purpose:
Introduce Deepanshu immediately as a cloud engineer and offensive security professional.

Required Content:
- Full Name
- Role Title
- Short positioning statement
- CTA buttons:
  - Download Resume
  - View Projects
  - Contact Me

Hero Copy Example:
"Cloud & Infrastructure Engineer specializing in offensive security, bug bounty hunting, and scalable enterprise systems."

Visual Rules:
- Large cinematic typography
- Animated grid/noise background
- Smooth fade and motion transitions
- Minimal floating particles allowed
- No excessive hacker-style neon visuals

Interactions:
- Resume button must trigger direct PDF download
- Social links must animate subtly on hover
- Hero must remain responsive on ultrawide and mobile screens

### 2. About Section
Purpose:
Tell the professional story behind the portfolio.

Content Requirements:
- Career progression
- Cloud + cybersecurity dual-track journey
- TryHackMe ranking
- Bug bounty achievements
- Professional mindset
- Long-term cybersecurity engineering goals

Layout Rules:
- Split grid layout desktop
- Single column mobile
- Include profile image support
- Text width must remain readable

### 3. Experience Section
Purpose:
Present enterprise credibility.

Content Source:
LTIMindtree experience.

Required Features:
- Timeline UI
- Role progression styling
- Responsibilities cards
- Hover animations
- Expandable achievements

### 4. Skills Section
Categories:
- Cybersecurity
- Cloud & Infrastructure
- Security Tooling
- Programming
- Frameworks & Standards

Interaction Rules:
- Animated skill pills
- Hover glow
- Filterable categories
- Mobile horizontal scroll support

### 5. Open Source Projects Section
Featured Projects:
- Graphite
- OSCAR

Required Components:
- Project cards
- GitHub links
- Tech stack badges
- Key highlights
- Architecture overview
- Terminal-style preview cards

Animations:
- Smooth reveal on scroll
- Subtle card tilt
- Motion blur transitions allowed

### 6. Bug Bounty & Achievements Section
Purpose:
Establish real-world validation.

Required Content:
- Liquid Web reward
- Zoho reward
- 100% report acceptance rate
- TryHackMe top 5%

Visual Direction:
- Achievement counters
- Minimal trophy card layouts
- Timeline/reputation styling

### 7. Certifications Section
Required Content:
- Google Cybersecurity Professional Certificate
- Google Cloud Professional Machine Learning Engineer
- Offensive Penetration Testing

Layout:
- Responsive certification cards
- Badge-style visuals
- Issuer logos supported

### 8. Resume Download Section
Requirements:
- Dedicated CTA block
- One-click resume download
- ATS-ready PDF support
- Sticky CTA support on mobile

### 9. Contact Section
Required Links:
- LinkedIn
- GitHub
- Medium
- Email
- TryHackMe
- HackerOne

Features:
- Copy-to-clipboard interactions
- Toast notifications
- Secure external linking
- Contact form optional

## Navigation Rules
- Sticky glass navbar
- Scroll progress indicator
- Active section highlighting
- Smooth scrolling required
- Mobile hamburger navigation mandatory

## Motion & Animation Standards
- Use Framer Motion
- Prefer transform-based animations
- Avoid layout-shift animations
- Scroll animations must remain performant
- GPU accelerated transitions preferred

## Accessibility Acceptance Criteria
- Every button must be keyboard reachable.
- Every interactive element must expose visible focus state.
- Motion must disable when prefers-reduced-motion is enabled.
- Form validation errors must be screen-reader readable.
- All icons must include aria-labels.

## Anti-Patterns
- Do not use fake terminal spam animations.
- Do not overload the UI with neon effects.
- Do not use unreadable tiny typography.
- Do not autoplay loud visuals or sounds.
- Do not create cluttered dashboard-style layouts.
- Do not hide important content behind animations.

## QA Checklist
- Resume downloads correctly
- Mobile responsive across all breakpoints
- Lighthouse accessibility score above 95
- Navigation works with keyboard only
- All animations remain smooth at 60fps
- No layout shifts during loading
- Contact links open correctly
- SEO metadata implemented
- Open Graph metadata configured
- Performance score above 90
