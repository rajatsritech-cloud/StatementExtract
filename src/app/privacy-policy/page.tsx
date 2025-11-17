"use client"


export default function PrivacyPolicyPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-12 space-y-10">
      <section className="space-y-3">
        <p className="text-xs font-semibold tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
          PRIVACY POLICY
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Last updated: November 17, 2025</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">The short version</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Your data belongs to you, not us. We do not sell personal information or data extracted
          from your uploaded bank statements. We only use your data to provide the Statement
          Extractor service, to improve it in a privacy-conscious way, and to comply with the law.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>
            We collect account and contact details you choose to share (for example, when you
            submit a form or sign up).
          </li>
          <li>
            We process the documents you upload (such as bank statements) only to convert them into
            structured data (CSV/Excel) and to help you troubleshoot issues.
          </li>
          <li>
            For individual/normal users, uploaded documents and extracted data are generally deleted
            within 24 hours of processing, except for minimal logs needed to keep the service
            secure.
          </li>
          <li>
            For business customers, documents and extracted data may be stored for longer in
            encrypted form so that your team can re-download or audit past exports.
          </li>
          <li>
            We use cookies and analytics tools (such as Google Analytics) to understand how the
            website is used and to improve it. You can control cookies through your browser
            settings.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Who we are</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Statement Extractor ("we", "us", "our") is a software-as-a-service tool that converts
          bank statements from PDF into structured CSV and Excel files. This privacy policy explains
          how we handle information when you use our website and tools at
          {" "}
          <span className="font-mono text-[hsl(var(--foreground))]">statementextract.com</span>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Information we collect</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We collect the minimum amount of information needed to provide and improve the service.
          This includes:
        </p>
        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">1. Account and contact information</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>Name</li>
          <li>Work email address</li>
          <li>Company name and basic company details (if provided)</li>
          <li>Other details you choose to share in forms (for example, your role or use case)</li>
        </ul>

        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">2. Documents you upload</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          When you use Statement Extractor, you may upload documents such as bank statements in PDF
          or image formats. We temporarily store these documents and the extracted data to:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>Process and convert them into CSV/Excel files for you to download.</li>
          <li>Display the results back to you in the app.</li>
          <li>Help troubleshoot issues if something goes wrong with a specific document.</li>
        </ul>

        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">3. Usage and device information</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Like most websites and SaaS tools, we automatically collect some technical information
          when you visit our site or use the app. This may include:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>Pages viewed and actions taken on the site</li>
          <li>Approximate location (based on IP address)</li>
          <li>Browser type, device type, and operating system</li>
          <li>Referring/exit pages and timestamps</li>
        </ul>

        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">4. Support and communication</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          If you contact us by email or through in-app forms, we will collect the information you
          provide (such as your name, email address, and message) in order to respond.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">How we use your information</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>To provide and operate the Statement Extractor service.</li>
          <li>To process and convert the documents you upload into CSV/Excel or similar outputs.</li>
          <li>To maintain and improve the reliability, performance, and security of our tools.</li>
          <li>To respond to your questions, requests, and support inquiries.</li>
          <li>To send you important service-related updates (for example, changes to this policy).</li>
          <li>
            To understand how people use the website and identify areas for improvement using
            aggregated analytics.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Document retention and deletion</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Because bank statements and financial documents are sensitive, we aim to keep them only as
          long as needed to provide the service.
        </p>
        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Individual / normal users</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>
            Uploaded documents and extracted data are generally deleted within 24 hours after
            processing is complete.
          </li>
          <li>
            We may retain minimal logs (for example, error logs or aggregate usage numbers) for
            security, abuse-prevention, and analytics purposes.
          </li>
        </ul>
        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Business / team accounts</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>
            For business customers, documents and extracted data may be stored for longer so that
            your team can re-download or audit past exports.
          </li>
          <li>
            These documents are stored in encrypted form and access is limited to authorized users.
          </li>
          <li>
            If a business account is closed, we will delete or anonymize associated document data
            within a reasonable period, subject to any legal obligations to retain certain
            information.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">How we share information</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We do not sell or rent your personal information, your documents, or the data extracted
          from them. We only share information in the following situations:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>
            <span className="font-semibold text-[hsl(var(--foreground))]">Service providers:</span>
            {" "}
            we may share limited information with trusted third-party vendors who help us run the
            service (such as cloud hosting, analytics, or email delivery). These providers are
            required to protect your data and may only use it on our instructions.
          </li>
          <li>
            <span className="font-semibold text-[hsl(var(--foreground))]">Legal reasons:</span>
            {" "}
            we may disclose information if we believe it is reasonably necessary to comply with a
            law, regulation, legal process, or governmental request; to protect the safety, rights,
            or property of our users or the public; or to detect, prevent, or address fraud or
            security issues.
          </li>
          <li>
            <span className="font-semibold text-[hsl(var(--foreground))]">Business transfers:</span>
            {" "}
            if we are involved in a merger, acquisition, or sale of assets, your information may be
            transferred as part of that transaction, subject to this privacy policy or a successor
            policy that provides similar protection.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Cookies and analytics</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We use cookies and similar technologies to run the website and understand how it is used.
          Cookies are small text files stored on your device by your browser.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>
            <span className="font-semibold text-[hsl(var(--foreground))]">Essential cookies:</span>
            {" "}
            used for basic site functions such as security, session management, and remembering your
            preferences.
          </li>
          <li>
            <span className="font-semibold text-[hsl(var(--foreground))]">Analytics cookies:</span>
            {" "}
            we use tools like Google Analytics to collect aggregated information about how visitors
            use the site (for example, which pages are viewed and for how long). This helps us
            improve the product and user experience.
          </li>
        </ul>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          You can control or delete cookies through your browser settings. If you disable certain
          cookies, some features of the site may not work as intended.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Data security</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We take the security of your data seriously and use reasonable technical and
          organizational measures to protect it, including encryption in transit (HTTPS) and access
          controls on our systems. However, no method of transmission over the internet or method of
          electronic storage is completely secure, so we cannot guarantee absolute security.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Your choices and rights</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Depending on where you live, you may have certain rights over your personal information,
          such as the right to access, correct, or delete it. Even where these rights are not
          formally granted by law, we aim to honour reasonable requests.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>Request a copy of the personal information we hold about you.</li>
          <li>Ask us to correct inaccurate or incomplete information.</li>
          <li>Ask us to delete your personal information, subject to legal obligations.</li>
          <li>Opt out of non-essential marketing communications.</li>
        </ul>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          To exercise any of these rights, please contact us using the details below.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Childrens privacy</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Statement Extractor is designed for businesses and professionals. It is not directed to
          children under 16, and we do not knowingly collect personal information from children. If
          you believe that a child has provided us with personal information, please contact us so
          we can delete it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Changes to this policy</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We may update this privacy policy from time to time to reflect changes in our product,
          legal requirements, or how we handle data. When we make material changes, we will update
          the "Last updated" date at the top of this page. In some cases, we may also notify you by
          email or within the app.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Contact us</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          If you have any questions about this privacy policy or how we handle your data, you can
          contact us at:
        </p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          <span className="block">Email: privacy@statementextract.com</span>
        </p>
      </section>
    </div>
  );
}
