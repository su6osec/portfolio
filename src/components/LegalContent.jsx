const YEAR = new Date().getFullYear();
const TODAY = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function PrivacyPolicyContent() {
  return (
    <>
      <p>
        <strong>Effective date:</strong> {TODAY}
      </p>

      <div>
        <h3>1. Introduction</h3>
        <p>
          This privacy policy is published in compliance with the Information Technology Act 2000, the
          Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal
          Data or Information) Rules 2011, and the Digital Personal Data Protection (DPDP) Act 2023 of
          India.
        </p>
      </div>

      <div>
        <h3>2. Information we collect</h3>
        <p>
          This site does not run analytics trackers, advertising pixels, fingerprinting scripts or
          registration forms. It stores two small pieces of preference data in your own browser — your
          theme choice and a cached copy of the public repository list — neither of which is transmitted
          to us.
        </p>
        <p>
          If you choose to contact us by email, we receive the information you voluntarily include. It is
          used solely to respond to you and to explore professional opportunities.
        </p>
      </div>

      <div>
        <h3>3. Third-party services</h3>
        <ul>
          <li>
            <strong>GitHub API</strong> — used to display this site&apos;s public repository list. Subject
            to GitHub&apos;s privacy policy.
          </li>
          <li>
            <strong>Hosting provider</strong> — may process standard request metadata (IP address, user
            agent) for delivery and security.
          </li>
        </ul>
      </div>

      <div>
        <h3>4. Data security</h3>
        <p>
          In accordance with Section 43A of the IT Act, commercially reasonable security practices are
          used to protect information against unauthorised access, alteration, disclosure or destruction.
          No internet-based transmission is 100% secure.
        </p>
      </div>

      <div>
        <h3>5. Your rights</h3>
        <p>
          Under the DPDP Act 2023 you may request access to, correction of, or erasure of your personal
          data. To exercise these rights, contact{' '}
          <a href="mailto:deepanshu.infosec@gmail.com">deepanshu.infosec@gmail.com</a>.
        </p>
      </div>

      <p style={{ textAlign: 'center' }}>© {YEAR} su6osec. All rights reserved.</p>
    </>
  );
}

export function TermsOfServiceContent() {
  return (
    <>
      <p>
        <strong>Effective date:</strong> {TODAY}
      </p>

      <div>
        <h3>1. Acceptance of terms</h3>
        <p>
          By accessing this portfolio you accept and agree to be bound by these terms. They are governed
          by the Indian Contract Act 1872 and applicable laws of India.
        </p>
      </div>

      <div>
        <h3>2. Intellectual property</h3>
        <p>
          Under the Copyright Act 1957 of India, all content, code, designs and original diagrams on this
          site are the exclusive property of su6osec unless otherwise stated. Unauthorised reproduction,
          distribution or derivative use is prohibited. Open-source repositories linked from this site
          are governed by their own licence files.
        </p>
      </div>

      <div>
        <h3>3. Disclaimer of liability</h3>
        <p>
          Information, code snippets and security methodology published here are for educational and
          demonstrative purposes only. Nothing on this site constitutes authorisation to test any system.
          We are not liable for direct, indirect, incidental or consequential damages arising from use of,
          or inability to use, this site.
        </p>
      </div>

      <div>
        <h3>4. Responsible disclosure</h3>
        <p>
          Vulnerability reports referenced on this site were submitted through each vendor&apos;s
          published coordinated-disclosure policy. Always report responsibly and within scope.
        </p>
      </div>

      <div>
        <h3>5. Governing law</h3>
        <p>
          Any dispute arising out of or in connection with this site is subject to the exclusive
          jurisdiction of the competent courts located in New Delhi, India.
        </p>
      </div>

      <p style={{ textAlign: 'center' }}>© {YEAR} su6osec. All rights reserved.</p>
    </>
  );
}
