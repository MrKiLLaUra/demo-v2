import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions governing your use of the Sambi Top Gear Motors website and services.",
}

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="THE FINE PRINT"
      title="TERMS OF SERVICE"
      intro="These terms govern your use of the Sambi Top Gear Motors website. By using the site, you agree to them. Please read them carefully."
      lastUpdated="28 JUNE 2026"
    >
      <LegalSection heading="About these terms">
        <p>
          This website is operated by Sambi Top Gear Motors, a used car dealership in Limassol, Cyprus. By accessing or
          using the site, you agree to be bound by these terms and our <Link href="/privacy">Privacy Policy</Link>. If you
          do not agree, please do not use the site.
        </p>
      </LegalSection>

      <LegalSection heading="Vehicle listings & pricing">
        <p>
          We aim to keep vehicle details, availability, and pricing accurate and up to date, but listings are provided for
          information only and do not constitute a binding offer. Specifications, mileage, condition, and price should be
          confirmed with us directly before any purchase.
        </p>
        <p>
          A vehicle is only reserved or sold once confirmed in writing by us. Listings may be removed or amended at any
          time without notice. Photographs are illustrative.
        </p>
      </LegalSection>

      <LegalSection heading="Valuations & the AI price engine">
        <p>
          Any valuation, price estimate, or output from our AI tools is an automated, non-binding guide based on available
          market data. It is not a formal offer to buy or sell and may differ from a final agreed price.
        </p>
      </LegalSection>

      <LegalSection heading="Enquiries & bookings">
        <p>
          Submitting an enquiry, sourcing request, or booking does not create a binding contract. We will contact you to
          confirm details. You agree to provide accurate information and not to misuse our forms or chat assistant.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <ul>
          <li>Do not use the site for any unlawful or fraudulent purpose.</li>
          <li>Do not attempt to disrupt, attack, or gain unauthorised access to the site or its systems.</li>
          <li>Do not copy, scrape, or reproduce site content without our permission.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          All content on this site — including text, logos, images, and design — is owned by Sambi Top Gear Motors or its
          licensors and is protected by law. You may not reuse it without prior written consent.
        </p>
      </LegalSection>

      <LegalSection heading="Your consumer rights">
        <p>
          Nothing in these terms affects your statutory rights as a consumer under Cypriot and EU law, including the legal
          guarantee of conformity that applies to goods sold to consumers. These rights cannot be waived or limited.
        </p>
        <p>
          Where you purchase a vehicle from us, the specific terms of sale and any warranty or guarantee will be provided
          to you separately in writing at the point of sale. This website does not itself constitute a sales contract.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          The website is provided &ldquo;as is&rdquo;. To the fullest extent permitted by law, we are not liable for any
          loss arising from your use of, or inability to use, the site, or from reliance on any information it contains.
          Nothing in these terms limits liability that cannot be excluded under applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the Republic of Cyprus, and any disputes are subject to the
          jurisdiction of the Cypriot courts. If you are a consumer resident in another EU member state, this does not
          deprive you of any protection, or of the right to bring proceedings in your country of residence, where
          mandatory consumer law so provides.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:sambitopgearmotors@gmail.com">sambitopgearmotors@gmail.com</a> or call{" "}
          <a href="tel:+35799929323">+357 99 929 323</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
