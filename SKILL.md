---
name: su6osec-portfolio-design-system
description: Creates implementation-ready portfolio design-system guidance for Deepanshu Chauhan's cybersecurity and cloud engineering portfolio with accessibility standards, motion systems, storytelling layouts, and modern frontend architecture.
---

# Deepanshu Chauhan Portfolio Design System

## Mission
Deliver implementation-ready portfolio design-system guidance that presents Deepanshu Chauhan as a high-performance Cloud Infrastructure and Offensive Security Engineer through cinematic storytelling, premium UI systems, and recruiter-focused information architecture.

## Brand
- Personal Brand: Deepanshu Chauhan
- Portfolio Identity: su6osec
- Audience:
  - Recruiters
  - Security Engineers
  - Hiring Managers
  - Bug Bounty Community
  - Startup Founders
  - Enterprise Teams

## Style Foundations

### Visual Style
- premium minimal
- cinematic
- glassmorphism
- smooth motion
- structured layouts
- enterprise-grade polish
- accessibility-first implementation

### Typography
- `font.family.primary=Outfit`
- `font.family.secondary=Inter`
- `font.size.base=16px`
- `font.weight.base=400`
- `font.lineHeight.base=1.7`

### Typography Scale
- `font.size.xs=12px`
- `font.size.sm=14px`
- `font.size.md=16px`
- `font.size.lg=18px`
- `font.size.xl=22px`
- `font.size.2xl=28px`
- `font.size.3xl=42px`
- `font.size.4xl=72px`

### Color Tokens
- `color.surface.base=#050505`
- `color.surface.secondary=#0d0d0d`
- `color.surface.glass=rgba(255,255,255,0.05)`
- `color.text.primary=#ffffff`
- `color.text.secondary=#b5b5b5`
- `color.border.primary=rgba(255,255,255,0.08)`
- `color.accent.primary=#6ee7ff`
- `color.accent.secondary=#7c3aed`

### Motion Tokens
- `motion.duration.instant=150ms`
- `motion.duration.fast=250ms`
- `motion.duration.normal=500ms`
- `motion.duration.slow=900ms`

## Accessibility
- WCAG 2.2 AA compliance mandatory
- Keyboard navigation mandatory
- Reduced motion support mandatory
- Focus-visible states mandatory
- Semantic HTML required
- Contrast-safe text mandatory

## Core Portfolio Architecture

### Hero Module
Must Include:
- Name
- Role
- Tagline
- CTA actions
- Social links
- Animated background

Behavior Rules:
- Hero text must remain readable on mobile.
- CTA buttons must stack on smaller devices.
- Background animations should reduce on low-power devices.

### About Module
Must Include:
- Professional journey
- Cybersecurity focus
- Cloud engineering foundation
- Personal mission
- Bug bounty credibility

### Experience Module
Must Include:
- Timeline structure
- Enterprise role presentation
- Expandable responsibility cards
- SLA/compliance highlights

### Skills Module
Must Support:
- Dynamic filtering
- Animated skill chips
- Hover interactions
- Touch gestures on mobile

Skill Categories:
- Cybersecurity
- Infrastructure
- Programming
- Security Tools
- Standards & Frameworks

### Projects Module
Projects:
- Graphite
- OSCAR

Project Cards Must Include:
- Description
- Architecture summary
- Tech stack
- GitHub links
- Key metrics
- Visual previews

Interaction Rules:
- Cards must animate on reveal.
- Hover effects should remain subtle.
- Touch interactions must remain responsive.

### Bug Bounty Module
Must Include:
- Reward statistics
- Responsible disclosure highlights
- Report validation credibility
- Platform references

### Certification Module
Must Include:
- Provider
- Certification title
- Verification-ready structure
- Responsive grid layout

### Resume Module
Requirements:
- PDF download support
- Resume preview optional
- ATS-compatible formatting
- Sticky mobile CTA supported

### Contact Module
Must Include:
- Email
- LinkedIn
- GitHub
- Medium
- TryHackMe
- HackerOne

Interaction Rules:
- External links must open securely.
- Copy interactions should show toast feedback.
- Contact forms must validate correctly.

## Navigation System

### Navbar
Must:
- remain sticky
- support active section tracking
- support keyboard navigation
- support mobile collapse state

### Mobile Navigation
Must:
- animate smoothly
- trap focus correctly
- close on route change

## Animation System
Preferred Stack:
- Framer Motion
- GSAP only when necessary

Animation Principles:
- Motion should support storytelling.
- Avoid distracting transitions.
- Maintain smooth GPU-accelerated animations.
- Prefer opacity and transform animations.

## Component Standards

### Buttons
States Required:
- default
- hover
- focus-visible
- active
- disabled
- loading

### Cards
Must:
- support glass surfaces
- remain readable
- maintain spacing consistency
- support hover transitions

### Inputs
Must:
- include validation states
- expose aria attributes
- remain touch accessible

## Performance Rules
- Lazy-load heavy sections.
- Optimize all images.
- Use dynamic imports where possible.
- Maintain Lighthouse performance score above 90.

## Content Standards
Tone:
- concise
- technical
- recruiter-friendly
- achievement-oriented

Avoid:
- fake hacker terminology
- exaggerated claims
- unnecessary buzzwords
- overloaded paragraphs

## Anti-Patterns
- Excessive neon glow
- Overuse of blur effects
- Complex unusable navigation
- Heavy animation blocking UX
- Fake matrix-style effects
- Oversized paragraphs

## QA Checklist
- Responsive on all breakpoints
- Keyboard accessible
- Screen-reader compatible
- Smooth scroll performance validated
- Resume download functioning
- Social links verified
- SEO metadata implemented
- Open Graph metadata configured
- Mobile navigation tested
- Lighthouse accessibility above 95
- Performance above 90
