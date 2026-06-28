import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Sambi Top Gear Motors uses cookies and similar technologies, and how you can manage your preferences.",
}

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="HOW WE USE COOKIES"
      title="COOKIE POLICY"
      intro="This page explains what cookies are, which ones we use, and how you can control them. We ask for your consent before setting any non-essential cookies."
      lastUpdated="28 JUNE 2026"
    >
      <LegalSection heading="What are cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help the site work properly
          and let us understand how visitors use it. Similar technologies such as local storage are also covered by this
          policy.
        </p>
      </LegalSection>

      <LegalSection heading="The cookies we use">
        <ul>
          <li>
            <strong>Essential</strong> — required for the site to function, such as remembering your cookie choice and
            your saved favourite cars. These are always on and do not require consent.
          </li>
          <li>
            <strong>Analytics</strong> — Google Analytics (ID G-LDX6KWVTN9) helps us understand which pages are popular
            and how the site performs.
          </li>
          <li>
            <strong>Heatmaps &amp; session recordings</strong> — Microsoft Clarity shows us heatmaps and
            recordings of how visitors navigate the site, so we can improve it. Text you type into forms is
            automatically masked.
          </li>
        </ul>
        <p>
          The analytics, heatmap, and recording cookies above run <strong>only after you accept cookies</strong>. We do
          not use advertising or cross-site tracking cookies.
        </p>
      </LegalSection>

      <LegalSection heading="Managing your preferences">
        <p>
          When you first visit, a banner lets you <strong>accept</strong> or <strong>decline</strong> non-essential
          cookies. You can change or withdraw your choice at any time using the{" "}
          <strong>&ldquo;Cookie Settings&rdquo;</strong> link in the footer, which re-opens this banner.
        </p>
        <p>
          Most browsers also let you block or delete cookies through their settings. Note that blocking essential cookies
          may affect how the site works.
        </p>
      </LegalSection>

      <LegalSection heading="More information">
        <p>
          For details on how we handle the data collected through cookies, see our{" "}
          <Link href="/privacy">Privacy Policy</Link>. Questions? Email{" "}
          <a href="mailto:sambitopgearmotors@gmail.com">sambitopgearmotors@gmail.com</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
