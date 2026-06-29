import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sambi Top Gear Motors collects, uses, and protects your personal data in accordance with the EU General Data Protection Regulation (GDPR).",
}

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="YOUR DATA, YOUR RIGHTS"
      title="PRIVACY POLICY"
      intro="This policy explains what personal information we collect, why we collect it, and the choices you have. We handle your data in line with the EU General Data Protection Regulation (GDPR)."
      lastUpdated="28 JUNE 2026"
    >
      <LegalSection heading="Who we are">
        <p>
          Sambi Top Gear Motors (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a used car dealership at
          Petrombei Mavromichali 3, Agios Athanasios 4102, Limassol, Cyprus. We are the data controller responsible for
          your personal data.
        </p>
        <p>
          For any privacy question or request, contact us at{" "}
          <a href="mailto:sambitopgearmotors@gmail.com">sambitopgearmotors@gmail.com</a> or call{" "}
          <a href="tel:+35799929323">+357 99 929 323</a>.
        </p>
        <p className="text-xs text-muted-foreground/60">
          [To complete before launch: company registration number and VAT number.]
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>We only collect what we need to respond to you and run our business:</p>
        <ul>
          <li>
            <strong>Contact &amp; enquiry data</strong> — your name, email address, phone number, and the contents of any
            message when you submit a contact form, vehicle sourcing request, valuation request, or booking.
          </li>
          <li>
            <strong>Chat data</strong> — messages you send to our AI assistant so it can help you find a vehicle.
          </li>
          <li>
            <strong>Usage &amp; device data</strong> — analytics such as pages visited, approximate region, device type,
            and how you interact with the site, collected via cookies and online identifiers. IP addresses are truncated
            and not stored by us (see our <Link href="/cookies">Cookie Policy</Link>).
          </li>
        </ul>
        <p>We do not knowingly collect data from anyone under 18.</p>
      </LegalSection>

      <LegalSection heading="How we use your data">
        <ul>
          <li>To respond to your enquiries and provide quotes, valuations, and bookings.</li>
          <li>To source and present vehicles that match your request.</li>
          <li>To improve our website and understand how visitors use it.</li>
          <li>To meet our legal and accounting obligations.</li>
        </ul>
        <p>
          Our legal bases for processing are your <strong>consent</strong> (e.g. analytics cookies), the{" "}
          <strong>performance of a contract</strong> or steps taken at your request, and our{" "}
          <strong>legitimate interests</strong> in operating and improving the business.
        </p>
      </LegalSection>

      <LegalSection heading="Our AI tools">
        <p>
          Our website includes an AI chat assistant and an AI price engine, powered by <strong>Anthropic</strong>. When
          you use them, the text you enter is processed to generate a response. We do not use these tools to make solely
          automated decisions that produce legal or similarly significant effects about you.
        </p>
        <p>Please don&rsquo;t share sensitive personal information (such as ID or financial details) in the AI chat.</p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          We never sell your personal data. We share it only with trusted service providers who help us operate, under
          appropriate safeguards:
        </p>
        <ul>
          <li><strong>Supabase</strong> — secure database hosting for enquiries and inventory.</li>
          <li><strong>Resend</strong> &amp; <strong>Twilio</strong> — to deliver enquiry notifications to our team.</li>
          <li><strong>Web3Forms</strong> — to process contact form submissions.</li>
          <li><strong>Anthropic</strong> — to power our AI chat assistant.</li>
          <li><strong>Google Analytics</strong> — for website usage statistics.</li>
          <li>
            <strong>Microsoft Clarity</strong> — for heatmaps and session recordings that show how visitors use the
            site. Form fields and text you type are automatically masked.
          </li>
          <li><strong>Vercel</strong> — website hosting and delivery.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="International data transfers">
        <p>
          Some of our service providers (including <strong>Anthropic</strong>, <strong>Resend</strong>,{" "}
          <strong>Twilio</strong>, <strong>Google</strong>, and <strong>Microsoft</strong>) are based outside the
          European Economic Area, primarily in the United States. When your
          data is transferred outside the EEA, we rely on appropriate safeguards — such as the European Commission&rsquo;s
          Standard Contractual Clauses and, where applicable, the EU&ndash;US Data Privacy Framework — so that your data
          continues to receive an equivalent level of protection.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>We keep your data only for as long as we genuinely need it:</p>
        <ul>
          <li>
            <strong>Enquiries that don&rsquo;t lead to a purchase</strong> — up to 24 months after our last contact,
            unless you ask us to delete them sooner.
          </li>
          <li>
            <strong>Customer &amp; transaction records</strong> — for as long as required by Cypriot tax and accounting
            law (typically 6 years).
          </li>
          <li>
            <strong>AI chat messages</strong> — kept only briefly to provide the conversation, then deleted.
          </li>
        </ul>
        <p>When data is no longer needed, it is securely deleted or anonymised.</p>
      </LegalSection>

      <LegalSection heading="Your rights under GDPR">
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request erasure of your data (&ldquo;right to be forgotten&rdquo;).</li>
          <li>Object to or restrict processing.</li>
          <li>Request a copy of your data in a portable format.</li>
          <li>Withdraw consent at any time.</li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:sambitopgearmotors@gmail.com">sambitopgearmotors@gmail.com</a>. You also have the right to lodge
          a complaint with the Office of the Commissioner for Personal Data Protection of Cyprus.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. The &ldquo;last updated&rdquo; date above always reflects the
          current version.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
