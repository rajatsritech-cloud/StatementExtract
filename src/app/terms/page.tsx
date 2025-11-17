"use client"


export default function TermsPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-12 space-y-10">
      <section className="space-y-3">
        <p className="text-xs font-semibold tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
          TERMS OF SERVICE
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Terms of Service
        </h1>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Last updated: November 17, 2025</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">1. Overview</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Statement Extractor ("we", "us", "our") provides an online tool that converts bank
          statements from PDF or image formats into structured CSV and Excel files (the "Service").
          By accessing or using the Service at
          {" "}
          <span className="font-mono text-[hsl(var(--foreground))]">statementextract.com</span>, you
          agree to be bound by these Terms of Service ("Terms"). If you do not agree to these
          Terms, you may not use the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">2. Eligibility and accounts</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          You may use the Service only if you can form a binding contract with us and are not barred
          from using the Service under applicable law. If you create an account, you are
          responsible for maintaining the confidentiality of your login credentials and for all
          activity that occurs under your account.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">3. Acceptable use</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          You agree to use the Service only for lawful purposes and in accordance with these Terms.
          In particular, you agree not to:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>Use the Service to violate any applicable law or regulation.</li>
          <li>
            Upload, process, or share documents that you do not have the right to use, or that
            infringe the rights of others.
          </li>
          <li>
            Attempt to access, probe, or test the vulnerability of the Service or any related
            systems or networks without authorization.
          </li>
          <li>Use the Service to distribute malware, spam, or other harmful content.</li>
          <li>
            Reverse engineer, decompile, or attempt to extract source code from the Service, except
            as permitted by law.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">4. Your documents and data</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          You retain all rights to the bank statements and other documents you upload to the
          Service, as well as to the data extracted from those documents. By uploading or otherwise
          submitting content, you grant us a limited, non-exclusive license to process and store
          that content solely for the purposes of providing the Service, troubleshooting issues, and
          improving our systems in line with our Privacy Policy.
        </p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We do not claim ownership of your data, and we do not sell your documents or extracted
          data to third parties. We handle your data as described in our Privacy Policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">5. Privacy</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Your use of the Service is also governed by our Privacy Policy, which explains how we
          collect, use, and protect your information. By using the Service, you agree that we can
          use such information in accordance with our Privacy Policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">6. Free access and future pricing</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          At this stage, Statement Extractor may be offered with a free tier or as an early access
          product. We may introduce paid plans or adjust pricing in the future. If we make material
          changes to pricing for existing users, we will provide reasonable notice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">7. Intellectual property</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          The Service, including its underlying software, interface design, branding, and other
          content (excluding your documents and data), is owned by us or our licensors and is
          protected by copyright and other intellectual property laws. You are granted a limited,
          non-exclusive, non-transferable license to access and use the Service for your internal
          business purposes in accordance with these Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">8. Service changes and availability</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We are continuously improving the Service and may add, change, or remove features over
          time. We may also suspend or discontinue the Service, or any part of it, at any time,
          including for maintenance, upgrades, or security reasons. We will try to provide advance
          notice where it is practical to do so, but cannot guarantee uninterrupted availability.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">9. Disclaimers</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          The Service is provided on an "as is" and "as available" basis. To the fullest extent
          permitted by law, we disclaim all warranties, whether express or implied, including
          implied warranties of merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We do not guarantee that the Service will be error-free or that the outputs (such as CSV
          or Excel files) will be perfectly accurate or suitable for any particular purpose. You are
          responsible for reviewing and validating results before relying on them for financial,
          reporting, or other decisions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">10. Limitation of liability</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          To the fullest extent permitted by law, in no event will we be liable for any indirect,
          incidental, special, consequential, or punitive damages, or for any loss of profits or
          revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or
          other intangible losses, resulting from your use of or inability to use the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">11. Governing law</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          These Terms are governed by and construed in accordance with the laws of India, without
          regard to its conflict of law principles. Any dispute arising out of or relating to these
          Terms or the Service will be subject to the exclusive jurisdiction of the courts located
          in India, and you consent to the personal jurisdiction of such courts.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">12. Changes to these Terms</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We may update these Terms from time to time. When we make material changes, we will revise
          the "Last updated" date at the top of this page and may provide additional notice (for
          example, by email or within the Service). By continuing to use the Service after the new
          Terms become effective, you agree to be bound by the updated Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">13. Contact us</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          If you have any questions about these Terms or the Service, you can contact us at:
        </p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          <span className="block">Email: support@statementextract.com</span>
        </p>
      </section>
    </div>
  );
}
